import React, { useEffect, useRef } from "react";
import { FcPackage, FcSettings } from "react-icons/fc";
import { IoPlaySharp, IoStop } from "react-icons/io5";
import { useGlobalState } from "../../context/globalState";
import { MaximizeLog } from "./maximizeLog";

const Status = ({
  title,
  value,
  Icon,
  isCap,
}: {
  title: string;
  value: string;
  Icon?: React.FC;
  isCap?: boolean;
}) => {
  return (
    <div className="grid grid-cols-[80px_1fr]">
      <span className="text-gray-500">{title}</span>
      <div className={`${isCap && "capitalize"}`}>
        {value} {Icon && <Icon />}
      </div>
    </div>
  );
};

export const RunLocally = () => {
  const logsRef = useRef<HTMLDivElement>();
  const {
    runLocally: {
      buildImage,
      buildStatus,
      logs,
      init: initState,
      checkImageExist,
    },
  } = useGlobalState();

  async function init() {
    initState();
    await checkImageExist();
  }

  useEffect(() => {
    logsRef.current.scrollTo(0, logsRef.current.scrollHeight);
    return () => {
      return;
    };
  }, [logs]);

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="mt-24 flex flex-col items-center space-y-8">
      <div className="grid grid-cols-[150px_1fr]">
        <FcPackage
          className={`${
            buildStatus === "Building" && "animate-bounce"
          } text-[120px]`}
        />
        <div>
          <div>Building docker image</div>
          <Status
            title="Status"
            value={buildStatus}
            Icon={() => {
              if (buildStatus === "Done") {
                return <span className="text-[#3EFD2D]">✓</span>;
              }
              if (buildStatus === "Stand By") {
                return (
                  <button
                    onClick={buildImage}
                    className="rounded-md bg-blue-200 p-1 text-xs text-blue-900 hover:bg-blue-300"
                  >
                    Start build
                  </button>
                );
              }
              if (buildStatus === "Already Exists") {
                return (
                  <>
                    <button
                      onClick={buildImage}
                      className="rounded-md bg-yellow-200 p-1  text-xs text-yellow-900 hover:bg-yellow-300"
                    >
                      Rebuild
                    </button>
                  </>
                );
              }

              return <span className="text-xs text-[#fdf62d]">●</span>;
            }}
          />
          <div className="relative">
            <div
              className="mt-1 h-16 w-56 overflow-y-scroll bg-gray-600 text-gray-100"
              ref={logsRef}
            >
              {logs.map((log) => (
                <div key={log}>{log}</div>
              ))}
            </div>
            <MaximizeLog />
          </div>
        </div>
      </div>

      <RunningDockerImage />
    </div>
  );
};

function RunningDockerImage() {
  const {
    runLocally: {
      containerStatus,
      buildStatus,
      isContainerRunning,
      runContainer,
      stopContainer,
      containerStats,
    },
  } = useGlobalState();

  return (
    <div
      className={`grid grid-cols-[150px_224px] ${
        !(buildStatus === "Already Exists" || buildStatus === "Done") &&
        "cursor-not-allowed grayscale"
      } `}
    >
      <FcSettings
        className={`${isContainerRunning && "animate-spin"} text-[120px]`}
      />
      <div>
        <div>Running docker image</div>
        <div className="flex">
          <div className="my-1 flex space-x-2 rounded-md border border-gray-400 px-2 py-1 text-2xl">
            <IoPlaySharp
              onClick={runContainer}
              className={`text-sky-600 ${
                !(buildStatus === "Already Exists" || buildStatus === "Done")
                  ? "cursor-not-allowed "
                  : "cursor-pointer "
              } `}
            />
            <IoStop
              onClick={stopContainer}
              className={`text-sky-600 ${
                !(buildStatus === "Already Exists" || buildStatus === "Done")
                  ? "cursor-not-allowed "
                  : "cursor-pointer "
              } `}
            />
          </div>
        </div>
        <div className="h-24 overflow-y-scroll">
          <Status
            title="Status"
            value={containerStatus?.State?.Status ?? ""}
            isCap
            Icon={() => {
              if (containerStatus?.State?.Status === "running")
                return <span className="text-xs text-[#3EFD2D]">●</span>;
            }}
          />
          {containerStatus?.HostConfig?.PortBindings &&
            (
              Object.values(containerStatus?.HostConfig?.PortBindings) as Array<
                { HostIp: string; HostPort: string }[]
              >
            )
              .reduce((pre, cur) => [...pre, ...cur], [])
              .reduce((pre, cur) => [...pre, cur.HostPort], [])
              .map((port) => <Status key={port} title="Port" value={port} />)}
          <Status
            title="Args"
            value={
              containerStatus?.Config?.Cmd.length
                ? `[${containerStatus?.Config?.Cmd.map(
                    (cmd) => `'${cmd}'`
                  ).join(", ")}]`
                : ""
            }
          />
          {containerStatus?.Config?.Env?.map((env) => {
            const [title, value] = env.split("=");
            return <Status key={title} title={title} value={value} />;
          })}
        </div>
      </div>
    </div>
  );
}
