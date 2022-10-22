import { services } from ".";
import { selectDirectory, scanDirectory } from "../lib/DirScanner";

// eslint-disable-next-line @typescript-eslint/ban-types
export const handles: Function[] = [scanDirectory, selectDirectory];

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
