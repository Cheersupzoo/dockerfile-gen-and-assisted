import { ipcRenderer } from "electron";

export const services: { name: string; channel: string }[] = [
  { name: "scanDirectory", channel: "dir:scanDirectory" },
  { name: "selectDirectory", channel: "dialog:selectDirectory" },
];



export const ipcs = services.reduce(
  (pre, cur) => ({
    ...pre,
    [cur.name]: (...arg: any[]) => ipcRenderer.invoke(cur.channel, ...arg),
  }),
  {}
);

