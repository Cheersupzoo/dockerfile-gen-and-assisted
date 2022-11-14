import fs from "fs";

export async function isDockerfileExist(path: string) {
  return fs.existsSync(`${path}/Dockerfile`);
}
