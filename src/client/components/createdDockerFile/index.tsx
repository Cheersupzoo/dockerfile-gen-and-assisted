import React from "react";
import { FaDocker } from "react-icons/fa";
import { RiFile3Line, RiHammerFill } from "react-icons/ri";
import { useGlobalState } from "../../context/globalState";
export const CreatedDockerFile = () => {
  const { openPath, setAppState } = useGlobalState();
  return (
    <div>
      <div className="mt-6 flex justify-center">
        <div className="relative ">
          <RiFile3Line className="text-[150px] text-gray-500 " />
          <FaDocker className="absolute inset-0 m-auto text-[60px] text-[#2497ED]" />
          <RiHammerFill className="absolute bottom-0 left-0 rotate-45 text-[60px] text-gray-800 opacity-70" />
        </div>
      </div>
      <div className="mt-4 text-center">Finish!</div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={openPath}
          className="h-12 w-64 rounded-3xl bg-[#41F17D] text-gray-50 transition-colors hover:bg-[#31c763] "
        >
          Open build folder
        </button>
      </div>
      <div className="mt-4 text-center text-sm">or</div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setAppState("createDockerFile")}
          className="h-12 w-64 rounded-3xl bg-[#367AF6] text-gray-50 transition-colors hover:bg-[#31c763] "
        >
          Run locally
        </button>
      </div>
    </div>
  );
};
