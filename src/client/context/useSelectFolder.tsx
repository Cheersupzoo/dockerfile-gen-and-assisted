import React, { useState } from "react";
import { DetectDockerFileState, SetAppState } from "./globalState";

export const useSelectFolder = (
  setDetectState: React.Dispatch<React.SetStateAction<DetectDockerFileState>>,
  setAppState: SetAppState
) => {
  const [isExistModalOpen, setIsExistModalOpen] = useState(false);
  const openFolder = async () => {
    const { path, canceled } = await window.electronAPI.selectDirectory();
    if (canceled) {
      return;
    }

    const files = await window.electronAPI.scanDirectory(path);
    const { language, framework } =
      await window.electronAPI.getLanguageAndFramework(path, files);
    setDetectState({ folderPath: path, language, framework });

    const isDockerfileExist = await window.electronAPI.isDockerfileExist(path);
    if (isDockerfileExist) {
      setIsExistModalOpen(true);
      return;
    }

    setAppState("detectDockerFile");
  };

  const recreateDockerfile = () => {
    setAppState("detectDockerFile");
    setIsExistModalOpen(false);
  };

  const testDockerfile = () => {
    setAppState("runLocally");
    setIsExistModalOpen(false);
  };
  return {
    openFolder,
    isExistModalOpen,
    setIsExistModalOpen,
    recreateDockerfile,
    testDockerfile,
  };
};
