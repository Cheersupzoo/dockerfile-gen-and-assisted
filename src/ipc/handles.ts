import { getLanguageAndFramework } from "../lib/Identifier";
import { services } from ".";
import { selectDirectory, scanDirectory } from "../lib/DirScanner";
import { generateDockerfile } from "../lib/Generator";

const apis = {
  scanDirectory,
  selectDirectory,
  getLanguageAndFramework,
  generateDockerfile,
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const handles = Object.values(apis) as Function[];

if (services.length !== handles.length)
  throw new Error("IPC not setup properly");

export type electronAPI = typeof apis;

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
