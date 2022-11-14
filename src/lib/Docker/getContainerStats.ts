import { getBasedName, isDockerfileExist } from "./helper";
import Docker from "dockerode";

export async function getContainerStats(path: string) {

  if (!isDockerfileExist(path)) return;

  const folder = getBasedName(path);
  const docker = new Docker();
  const image = docker.getContainer(folder);
  try {
    const stats = await image.stats();
    return stats;
  } catch (error) {
    console.error(error);
  }
}
