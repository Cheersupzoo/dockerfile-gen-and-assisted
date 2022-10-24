import Docker from "dockerode";
import Path from "path";
import { isDockerfileExist } from "./helper";

export async function runContainer(path: string) {
  if (!isDockerfileExist(path)) return;

  const folder = Path.basename(path);
  const docker = new Docker();
  const container = docker.getContainer(folder);
  try {
    await container.stop();
    await container.remove();
  } catch (error) {
    console.error(error);
  }
  docker.run(
    folder,
    [],
    [],
    {
      name: folder,
      HostConfig: {
        PortBindings: {
          "80/tcp": [
            {
              HostIp: "0.0.0.0",
              HostPort: "8080",
            },
          ],
        },
      },
    },
    {},
    (err, data) => {
      console.log(`err ${err}`);
      console.log(data);
    }
  );
}
