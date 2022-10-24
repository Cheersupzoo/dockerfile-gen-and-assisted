import fs from "fs";
import { getState } from "../../state";

export function generateDockerfile(path: string) {
  const { framework } = getState();
  fs.writeFileSync(`${path}/Dockerfile`, framework.Dockerfile ?? "");
}
