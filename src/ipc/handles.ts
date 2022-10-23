import { services } from ".";
import { selectDirectory, scanDirectory } from "../lib/DirScanner";

// eslint-disable-next-line @typescript-eslint/ban-types
export const handles: Function[] = [scanDirectory, selectDirectory];

if (services.length !== handles.length)
  throw new Error("IPC not setup properly");

export type electronAPI = {
  selectDirectory: typeof selectDirectory;
  scanDirectory: typeof scanDirectory;
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
