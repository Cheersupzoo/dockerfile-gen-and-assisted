import React from "react";
import {
  CreatedDockerFile,
  DetectDockerFile,
  RunLocally,
  SelectFolder,
} from "./components";
import { Header } from "./components/header";
import { useGlobalState } from "./context/globalState";
import { SlReload } from "react-icons/sl";

export const Layout = () => {
  const { appState, restart } = useGlobalState();
  return (
    <>
      <Header />
      {appState === "selectFolder" && <SelectFolder />}
      {appState === "detectDockerFile" && <DetectDockerFile />}
      {appState === "createDockerFile" && <CreatedDockerFile />}
      {appState === "runLocally" && <RunLocally />}
      {/* <File /> */}

      {appState !== "selectFolder" && (
        <div
          className="group absolute bottom-6 right-6 flex cursor-pointer"
          onClick={restart}
        >
          <SlReload className="rotate-90 text-3xl transition-transform group-hover:-rotate-3" />
          <div className="ml-2">Restart</div>
        </div>
      )}
    </>
  );
};
