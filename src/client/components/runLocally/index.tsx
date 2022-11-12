import React, { useEffect, useRef } from "react";
import { FcPackage, FcSettings } from "react-icons/fc";
import { useGlobalState } from "../../context/globalState";

const Status = ({
  title,
  value,
  Icon,
}: {
  title: string;
  value: string;
  Icon?: React.FC;
}) => {
  return (
    <div className="grid grid-cols-[80px_1fr]">
      <span className="text-gray-500">{title}</span>
      <div>
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
      containerStatus,
      runContainer,
      logs,
    },
  } = useGlobalState();

  async function init() {
    await buildImage();
    await runContainer();
  }

  useEffect(() => {
    logsRef.current.scrollTo(0, logsRef.current.scrollHeight);
    return () => {
      return;
    };
  }, [logs]);

  useEffect(() => {
    init();

    return () => {
      return;
    };
  }, []);

  return (
    <div className="mt-24 flex flex-col items-center space-y-8">
      <div className="grid grid-cols-[150px_1fr]">
        <FcPackage className="animate-bounce text-[120px]" />
        <div>
          <div>Building docker image</div>
          <Status
            title="Status"
            value={buildStatus}
            Icon={() =>
              buildStatus === "Done" ? (
                <span className="text-[#3EFD2D]">✓</span>
              ) : (
                <span className="text-xs text-[#fdf62d]">●</span>
              )
            }
          />
          <div
            className="h-16 w-56 overflow-y-scroll bg-gray-600 text-gray-100"
            ref={logsRef}
          >
            {logs.map((log) => (
              <div>{log}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[150px_224px]">
        <FcSettings className="animate-spin text-[120px]" />
        <div>
          <div>Running docker image</div>
          <Status
            title="Status"
            value={containerStatus?.State?.Status ?? ""}
            Icon={() => <span className="text-xs text-[#3EFD2D]">●</span>}
          />
          <Status title="Port" value="3000" />
          <Status
            title="CPU"
            value={containerStatus?.HostConfig?.CpuPercent.toString() ?? ""}
          />
          <Status
            title="RAM"
            value={containerStatus?.HostConfig?.Memory.toString() ?? ""}
          />
        </div>
      </div>
    </div>
  );
};
