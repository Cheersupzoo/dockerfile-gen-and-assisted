import {
  frameworkList,
  getLanguageAndFramework,
  languageList,
} from "../lib/Identifier";
import { services } from ".";
import { selectDirectory, scanDirectory, openPath } from "../lib/DirScanner";
import { generateDockerfile } from "../lib/Generator";
import {
  buildDockerImage,
  onStatusChanges,
  inspectContainer,
  listenContainer,
  removeContainer,
  runContainer,
  stopContainer,
} from "../lib/Docker";
import { isDockerfileExist } from "../lib/Docker/isDockerfileExist";

const apis = {
  scanDirectory,
  selectDirectory,
  getLanguageAndFramework,
  generateDockerfile,
  buildDockerImage,
  runContainer,
  inspectContainer,
  stopContainer,
  removeContainer,
  listenContainer,
  onStatusChanges,
  openPath,
  languageList,
  frameworkList,
  isDockerfileExist,
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const handles = Object.values(apis) as Function[];

if (services.length !== handles.length)
  throw new Error("IPC not setup properly");

export type electronAPI = typeof apis & {
  onBuildDockerContainer: (
    listener: (event: Electron.IpcRendererEvent, stream: string[]) => void
  ) => Electron.IpcRenderer;
  removeonBuildDockerContainer: () => void;
  onStatusChangesStream: (
    listener: (event: Electron.IpcRendererEvent, stream: object) => void
  ) => Electron.IpcRenderer;
  removeonStatusChangesStream: () => void;
};

export const exposes = services.map(({ channel }, index) => ({
  channel,
  handle: handles[index],
}));

export const ipcType = services
  .map(({ name }, index) => ({
    name,
    handle: handles[index],
  }))
  .reduce((prev, cur) => ({ ...prev, [cur.name]: cur.handle }), {});
