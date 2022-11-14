import Docker from "dockerode";

import { getState } from "../../state";
import { ON_STATUS_CHANGE } from "../../ipc";
import { getBasedName, isDockerfileExist } from "./helper";
import { inspectContainer } from "./inspectContainer";

export async function onStatusChanges(path: string) {
  if (!isDockerfileExist(path)) return;

  const folder = getBasedName(path);
  const docker = new Docker();
  //   const state = getState();
  const container = docker.getContainer(folder);
  //   const stat = await container.stats();
  //   console.log(stat);
  const stream = await docker.getEvents();
  const state = getState();
  //   stream.pipe(process.stdout);
  stream.setEncoding("utf8");
  stream.addListener("data", (event) => {
    const logs = JSON.parse(event);
    if ((logs as any)?.from === folder) {
      state.mainWindow.webContents.send(ON_STATUS_CHANGE, logs);
    }
  });
}
