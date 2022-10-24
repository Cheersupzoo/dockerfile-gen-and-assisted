import { getBasedName, isDockerfileExist } from "./helper";
import Docker from "dockerode";

export async function inspectContainer(path: string) {
  if (!isDockerfileExist(path)) return;

  const folder = getBasedName(path);
  const docker = new Docker();
  const container = docker.getContainer(folder);
  try {
    return await container.inspect();
  } catch (error) {
    console.error(error);
  }
}
