import React, { createContext, useContext, useState } from "react";
import { useDetectFileState } from "./useDetectFileState";
import { useRunLocally } from "./useRunLocally";
import { useSelectFolder } from "./useSelectFolder";

type AppState =
  | "selectFolder"
  | "detectDockerFile"
  | "createDockerFile"
  | "runLocally";

const GlobalContext = createContext<{
  appState?: AppState;
  setAppState?: React.Dispatch<React.SetStateAction<AppState>>;
  selectFolder?: ReturnType<typeof useSelectFolder>;
  detectState?: DetectDockerFileState;
  detectFile?: ReturnType<typeof useDetectFileState>;
  openPath?: () => void;
  runLocally?: ReturnType<typeof useRunLocally>;
}>({});

export type SetAppState = React.Dispatch<React.SetStateAction<AppState>>;

export type DetectDockerFileState = {
  folderPath: string;
  language?: string;
  framework?: string;
};

export const GlobalStateProvider = ({ children }: any) => {
  const [appState, setAppState] = useState<AppState>("selectFolder");
  const [detectState, setDetectState] = useState<DetectDockerFileState>({
    folderPath: "",
  });
  const selectFolder = useSelectFolder(setDetectState, setAppState);
  const detectFile = useDetectFileState(
    setAppState,
    detectState,
    setDetectState
  );
  const runLocally = useRunLocally(setAppState, detectState);
  const openPath = () => window.electronAPI.openPath(detectState.folderPath);

  const globalState = {
    appState,
    setAppState,
    selectFolder,
    detectState,
    detectFile,
    openPath,
    runLocally,
  };
  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
