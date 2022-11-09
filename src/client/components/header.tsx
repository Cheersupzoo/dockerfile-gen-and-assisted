import React from "react";
import { RiQuestionFill, RiSettings4Fill } from "react-icons/ri";

export const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "30px",
        // @ts-ignore
        "-webkit-app-region": "drag",
      }}
    >
      <div className="flex justify-end space-x-2 p-2 text-3xl ">
        <RiSettings4Fill className="text-gray-600 transition-colors hover:text-gray-800" />
        <RiQuestionFill className="text-gray-600 transition-colors hover:text-gray-800" />
      </div>
    </div>
  );
};
