import Docker from "dockerode";
import { getBasedName, getPorts, isDockerfileExist } from "./helper";

export async function runContainer(path: string) {
  if (!isDockerfileExist(path)) return;

  const folder = getBasedName(path);
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
  let containerExist = true;

  await container.inspect().catch(() => (containerExist = false));

  if (containerExist) {
    container.start();
  } else {
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
}
