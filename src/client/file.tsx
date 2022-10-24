import React, { useState } from "react";
import { FileMeta } from "../lib/DirScanner/type/fileMeta";

export const File = () => {
  const [name, setName] = useState("");
  const [fileMetas, setFileMetas] = useState<FileMeta[]>([]);
  const [language, setLanguage] = useState("");
  const [framework, setFramework] = useState("");
  const [generate, setGenerate] = useState("");
  const [buildStatus, setBuildStatus] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  async function openFile() {
    const { canceled, path } = await window.electronAPI.selectDirectory();

    if (!canceled) {
      setName(path);
      const files = await window.electronAPI.scanDirectory(path);
      setFileMetas(files);
    }
  }

  async function check() {
    if (!name) return;
    const { language, framework } =
      await window.electronAPI.getLanguageAndFramework(name, fileMetas);
    setLanguage(language);
    setFramework(framework);
  }

  async function generateDockerfile() {
    setGenerate("");
    if (!framework) return;
    setGenerate("Start");
    await window.electronAPI.generateDockerfile(name);
    setGenerate("done");
  }

  async function createContainer() {
    console.log(window.electronAPI);
    setBuildStatus("building");
    window.electronAPI.removeonBuildDockerContainer();
    window.electronAPI.onBuildDockerContainer((_, stream) => {
      console.log(stream);
      setLogs(stream);
    });
    await window.electronAPI.buildDockerImage(name);
    setBuildStatus("Done");
  }

  return (
    <div>
      <div>
        <button type="button" id="btn" onClick={openFile}>
          Open a File
        </button>
        File path: <strong id="filePath">{name}</strong>
      </div>
      <div>
        <button onClick={check}>Check Language and signature</button>
        <div>
          {language}: {framework}
        </div>
      </div>
      <div>
        <button onClick={generateDockerfile}>Generate Dockerfile</button>
        <div>{generate}</div>
      </div>
      <div>
        <button onClick={createContainer}>Create Docker Container</button>
        <div>{buildStatus}</div>
        {logs.map((log) => (
          <div>{log}</div>
        ))}
      </div>
      <div>
        {fileMetas.map(({ name, isDirectory }) => (
          <p style={{ color: isDirectory ? "green" : "black" }}>{name}</p>
        ))}
      </div>
    </div>
  );
};
