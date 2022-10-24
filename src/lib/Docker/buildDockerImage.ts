import Docker from "dockerode";

import { getState } from "../../state";
import { ON_DOCKER_BUILD } from "../../ipc";
import { getBasedName, isDockerfileExist } from "./helper";

export async function buildDockerImage(path: string) {
  if (!isDockerfileExist(path)) return;

  const folder = getBasedName(path);
  const docker = new Docker();
  const state = getState();

  await new Promise((resolve, reject) => {
    docker.buildImage(
      { context: `${path}`, src: ["./"] },
      { t: folder },
      (err, res) => {
        const logs = Array<string>();
        res.setEncoding("utf8");
        docker.modem.followProgress(res, (err, res) =>
          err ? reject(err) : resolve(res)
        );
        res.on("data", (data) => {
          const text = data as string;
          const textList = text.split(/\n|\r/);
          textList
            .filter((item) => item.length !== 0)
            .forEach((item) => {
              const stream = JSON.parse(item).stream;
              logs.push(stream);
              state.mainWindow.webContents.send(ON_DOCKER_BUILD, logs);
            });
        });
      }
    );
  });
}
