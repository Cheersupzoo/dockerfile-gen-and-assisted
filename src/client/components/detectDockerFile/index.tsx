import React from "react";
import { RiFolderOpenLine, RiSearch2Line } from "react-icons/ri";
import { useGlobalState } from "../../context/globalState";

export const DetectDockerFile = () => {
  const { detectFile, detectState } = useGlobalState();
  return (
    <div>
      <div className="mt-6 flex justify-center ">
        <div className="relative">
          <RiFolderOpenLine className="text-[120px] text-gray-500" />
          <RiSearch2Line className="absolute bottom-0 left-0 -scale-x-100 text-[80px] text-gray-800 opacity-80" />
        </div>
      </div>
      <div className="text-center text-sm text-gray-500">
        {detectState.folderPath}
      </div>
      <div className="text-center leading-4">Automatically detect</div>
      <div className="mt-4 text-center text-sm text-gray-500">Framework</div>
      <div className="text-center leading-3">{detectState.framework}</div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => detectFile.createDockerFile()}
          className="h-12 w-64 rounded-3xl bg-[#41F17D] text-gray-50 transition-colors hover:bg-[#31c763] "
        >
          Start build Dockerfile
        </button>
      </div>
      <div className="mt-4 text-center  text-sm">or</div>
      <div className="mt-4 flex justify-center">
        <button className="h-12 w-64 rounded-3xl bg-[#F1CA41] text-gray-50 transition-colors hover:bg-[#31c763] ">
          Manually Identify
        </button>
      </div>
    </div>
  );
};
