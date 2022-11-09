import React from "react";
import { DetectDockerFileState, SetAppState } from "./globalState";

export const useSelectFolder = (
  setDetectState: React.Dispatch<React.SetStateAction<DetectDockerFileState>>,
  setAppState: SetAppState
) => {
  const openFolder = async () => {
    const { path, canceled } = await window.electronAPI.selectDirectory();
    if (canceled) {
      return;
    }
    const files = await window.electronAPI.scanDirectory(path);
    const { language, framework } =
      await window.electronAPI.getLanguageAndFramework(path, files);
    setDetectState({ folderPath: path, language, framework });
    setAppState("detectDockerFile");
  };
  return { openFolder };
};
