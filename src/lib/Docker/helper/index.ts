import fs from "fs";

export function isDockerfileExist(path: string) {
  return fs.existsSync(`${path}/Dockerfile`);
}
