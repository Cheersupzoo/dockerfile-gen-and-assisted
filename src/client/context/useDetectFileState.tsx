import React from "react";
import { DetectDockerFileState, SetAppState } from "./globalState";

export const useDetectFileState = (
  setAppState: SetAppState,
  detectState: DetectDockerFileState
) => {
  const createDockerFile = async () => {
    try {
      await window.electronAPI.generateDockerfile(detectState.folderPath);
      setAppState("createDockerFile");
    } catch (error) {
      return;
    }
  };
  return { createDockerFile };
};
