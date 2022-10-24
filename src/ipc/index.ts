import { ipcRenderer } from "electron";

export const services: { name: string; channel: string }[] = [
  { name: "scanDirectory", channel: "dir:scanDirectory" },
  { name: "selectDirectory", channel: "dialog:selectDirectory" },
  { name: "getLanguageAndFramework", channel: "dialog:getLanguageAndFramework" },
  { name: "generateDockerfile", channel: "dialog:generateDockerfile" },
];

export const ipcs = services.reduce(
  (pre, cur) => ({
    ...pre,
    [cur.name]: (...arg: unknown[]) => ipcRenderer.invoke(cur.channel, ...arg),
  }),
  {}
);
