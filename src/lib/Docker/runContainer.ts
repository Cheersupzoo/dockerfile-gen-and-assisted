import Docker from "dockerode";
import Path from "path";
import { getPorts, isDockerfileExist } from "./helper";

export async function runContainer(path: string) {
  if (!isDockerfileExist(path)) return;

  const folder = Path.basename(path);
  const ports = getPorts(path);
  const PortBindings = ports.reduce(
    (prev, port, index) => ({
      ...prev,
      [`${port}/tcp`]: [
        {
          HostIp: "0.0.0.0",
          HostPort: `${8080 + index}`,
        },
      ],
    }),
    {}
  );
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
        PortBindings,
      },
    },
    {},
    (err, data) => {
      console.log(`err ${err}`);
      console.log(data);
    }
  );
}
