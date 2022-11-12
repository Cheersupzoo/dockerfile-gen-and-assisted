// import { ContainerInspectInfo } from "dockerode";
import React, { useState } from "react";
import { DetectDockerFileState, SetAppState } from "./globalState";

export const useRunLocally = (
  setAppState: SetAppState,
  detectState: DetectDockerFileState
) => {
  const [buildStatus, setBuildStatus] = useState<"Building" | "Done" | "Fail">(
    "Building"
  );
  const [containerStatus, setContainerStatus] = useState<any | null>();
  const [logs, setLogs] = useState<string[]>([]);
  const buildImage = async () => {
    setBuildStatus("Building");
    window.electronAPI.onBuildDockerContainer((_, stream) => {
      console.log(stream);
      setLogs(stream);
      
    });
    await window.electronAPI.buildDockerImage(detectState.folderPath);
    window.electronAPI.removeonBuildDockerContainer();
    setBuildStatus("Done");
  };

  const runContainer = async () => {
    await window.electronAPI.onStatusChanges(detectState.folderPath);
    await window.electronAPI.onStatusChangesStream(async (_, __) => {
      const status = await window.electronAPI.inspectContainer(
        detectState.folderPath
      );
      setContainerStatus(status);
    });
    await window.electronAPI.runContainer(detectState.folderPath);
  };
  return { buildImage, buildStatus, containerStatus, runContainer,logs };
};
