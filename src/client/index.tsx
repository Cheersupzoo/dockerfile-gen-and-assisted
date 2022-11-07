import React from "react";
import { File } from "./file";

export const Index = () => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "30px",
          // @ts-ignore
          "-webkit-app-region": "drag",
        }}
      ></div>
      <div>Hello World</div>
      <File />
    </div>
  );
};
