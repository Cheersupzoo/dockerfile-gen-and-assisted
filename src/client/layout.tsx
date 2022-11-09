import React from "react";
import {
  CreatedDockerFile,
  DetectDockerFile,
  RunLocally,
  SelectFolder,
} from "./components";
import { Header } from "./components/header";
import { useGlobalState } from "./context/globalState";

export const Layout = () => {
  const { appState } = useGlobalState();
  return (
    <>
      <Header />
      {appState === "selectFolder" && <SelectFolder />}
      {appState === "detectDockerFile" && <DetectDockerFile />}
      {appState === "createDockerFile" && <CreatedDockerFile />}
      {appState === "runLocally" && <RunLocally />}
      {/* <File /> */}
    </>
  );
};
