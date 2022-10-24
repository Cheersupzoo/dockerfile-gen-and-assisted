import { ipcRenderer } from "electron";

export const ON_DOCKER_BUILD = 'dialog:onBuildDockerContainer'

export const services: { name: string; channel: string }[] = [
  { name: "scanDirectory", channel: "dir:scanDirectory" },
  { name: "selectDirectory", channel: "dialog:selectDirectory" },
  {
    name: "getLanguageAndFramework",
    channel: "dialog:getLanguageAndFramework",
  },
  { name: "generateDockerfile", channel: "dialog:generateDockerfile" },
  { name: "buildDockerImage", channel: "dialog:buildDockerImage" },
  { name: "runContainer", channel: "dialog:runContainer" },
  { name: "inspectContainer", channel: "dialog:inspectContainer" },
  { name: "stopContainer", channel: "dialog:stopContainer" },
  { name: "removeContainer", channel: "dialog:removeContainer" },
];
export const stream: { name: string; channel: string }[] = [
  { name: "onBuildDockerContainer", channel: ON_DOCKER_BUILD },
];

export const ipcs = services.reduce(
  (pre, cur) => ({
    ...pre,
    [cur.name]: (...arg: unknown[]) => ipcRenderer.invoke(cur.channel, ...arg),
  }),
  {}
);

export const ipcsOn = {
  ...stream.reduce((pre, cur) => ({
    ...pre,
    [cur.name]: (
      listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void
    ) => ipcRenderer.on(cur.channel, listener),
  }),{}),
  ...stream.reduce((pre, cur) => ({
    ...pre,
    [`remove${cur.name}`]: () => ipcRenderer.removeAllListeners(cur.channel),
  }),{}),
};
