import { getBasedName, isDockerfileExist } from "./helper";
import Docker from "dockerode";

export async function isImageExist(path: string) {
  if (!isDockerfileExist(path)) return;

  const folder = getBasedName(path);
  const docker = new Docker();
  const image = docker.getImage(folder);
  try {
    await image.inspect();
    return true;
  } catch (error) {
    return false;
  }
}
