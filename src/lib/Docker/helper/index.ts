import fs from "fs";

export function isDockerfileExist(path: string) {
  return fs.existsSync(`${path}/Dockerfile`);
}

export function getPorts(path: string): string[] {
  const dockerFile = fs.readFileSync(`${path}/Dockerfile`, {
    encoding: "utf8",
  });
  const regex = /EXPOSE\s+([0-9]+)/gi;
  const result = [];
  let exec;
  while ((exec = regex.exec(dockerFile)) !== null) {
    result.push(exec[1].toString());
  }
  return result;
}
