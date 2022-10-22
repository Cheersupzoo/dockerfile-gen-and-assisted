import React, { useState } from "react";
import { FileMeta } from "../lib/DirScanner/type/fileMeta";

export const File = () => {
  const [name, setName] = useState("");
  const [fileMetas, setFileMetas] = useState<FileMeta[]>([]);

  async function openFile() {
    const { canceled, path } = await window.electronAPI.selectDirectory();

    if (!canceled) {
      setName(path);
      const files = await window.electronAPI.scanDirectory(path);
      console.log(files);
      setFileMetas(files);
    }
  }

  return (
    <div>
      <button type="button" id="btn" onClick={openFile}>
        Open a File
      </button>
      File path: <strong id="filePath">{name}</strong>
      <div>
        {fileMetas.map(({ name, isDirectory }) => (
          <p style={{ color: isDirectory ? "green" : "black" }}>{name}</p>
        ))}
      </div>
    </div>
  );
};
