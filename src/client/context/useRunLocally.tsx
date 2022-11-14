// import { ContainerInspectInfo } from "dockerode";
import type { ContainerInspectInfo, ContainerStats } from "dockerode";
import React, { useRef, useState } from "react";
import { DetectDockerFileState, SetAppState } from "./globalState";

export const useRunLocally = (
  setAppState: SetAppState,
  detectState: DetectDockerFileState
) => {
  const [buildStatus, setBuildStatus] = useState<
    "Stand By" | "Building" | "Done" | "Already Exists" | "Fail"
  >("Stand By");
  const [isContainerRunning, setIsContainerRunning] = useState(false);
  const isRunning = useRef(false);
  const [containerStatus, setContainerStatus] =
    useState<ContainerInspectInfo | null>();
  const [containerStats, setContainerStats] = useState<any | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const init = () => {
    setBuildStatus("Stand By");
    setContainerStatus(null);
    setLogs([]);
  };

  const checkImageExist = async () => {
    const isImageExist = await window.electronAPI.isImageExist(
      detectState.folderPath
    );
    if (isImageExist) {
      setBuildStatus("Already Exists");
    } else {
      setBuildStatus("Stand By");
    }
  };

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

  const getStats = async () => {
    console.log("getStats");
    console.log(isRunning.current);

    if (!isRunning.current) return;

    const stats = await window.electronAPI.getContainerStats(
      detectState.folderPath
    );
    console.log(stats);

    setContainerStats(stats);
    setTimeout(() => getStats(), 1000);
  };

  const runContainer = async () => {
    if (!(buildStatus === "Already Exists" || buildStatus === "Done")) return;
    await window.electronAPI.stopContainer(detectState.folderPath);
    await window.electronAPI.onStatusChanges(detectState.folderPath);
    await window.electronAPI.onStatusChangesStream(async (_, __) => {
      const status = await window.electronAPI.inspectContainer(
        detectState.folderPath
      );
      setContainerStatus(status);
    });
    await window.electronAPI.runContainer(detectState.folderPath);
    setIsContainerRunning(true);
    isRunning.current = true;
    // setTimeout(() => getStats(), 1000);
  };

  const stopContainer = async () => {
    if (!(buildStatus === "Already Exists" || buildStatus === "Done")) return;
    await window.electronAPI.stopContainer(detectState.folderPath);
    setIsContainerRunning(false);
    isRunning.current = false;
  };

  return {
    init,
    buildImage,
    buildStatus,
    containerStatus,
    runContainer,
    logs,
    checkImageExist,
    stopContainer,
    isContainerRunning,
    containerStats,
  };
};
