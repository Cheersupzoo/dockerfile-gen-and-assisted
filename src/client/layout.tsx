import React from "react";
import {
  CreatedDockerFile,
  DetectDockerFile,
  SelectFolder,
} from "./components";
import { Header } from "./components/header";
import { useGlobalState } from "./context/globalState";

export const Layout = () => {
  const { appState } = useGlobalState();
  return (
    <div>
      <Header />
      {appState === "selectFolder" && <SelectFolder />}
      {appState === "detectDockerFile" && <DetectDockerFile />}
      {appState === "createDockerFile" && <CreatedDockerFile />}
      {/* <File /> */}
    </div>
  );
};
