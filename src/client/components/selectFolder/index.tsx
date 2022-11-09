import React from "react";
import { RiFolderOpenLine } from "react-icons/ri";
import { useGlobalState } from "../../context/globalState";

export const SelectFolder = () => {
  const { selectFolder } = useGlobalState();
  return (
    <div>
      <div className="mx-auto mt-2 w-52 text-center text-2xl">
        Simplify Building Your dockerfile
      </div>
      <div className="">
        <RiFolderOpenLine className="mx-auto text-[120px] text-gray-600" />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => selectFolder.openFolder()}
          className="h-12 w-64 rounded-3xl bg-[#41F17D] text-gray-50 transition-colors hover:bg-[#31c763] "
        >
          Select Project
        </button>
      </div>
      <div className="mx-auto mt-2 w-80 text-center text-xs text-gray-600">
        Select the folder where it is root folder of your project. It ususally
        located a file that is metadata about the project. Ex. package.json for
        Node.JS, requirement.txt for python.
      </div>
    </div>
  );
};
