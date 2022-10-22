import { FrameworkSignature } from "../FrameworkSignature";
import fs from "fs";
export class CreateReactApp implements FrameworkSignature {
  framework = "create-react-app";

  checkFramework(path: string) {
    const packageJsonPath = `${path}/package.json`;
    if (fs.existsSync(packageJsonPath)) {
      const file = fs.readFileSync(packageJsonPath, "utf8");
      const json = JSON.parse(file);
      console.log(json);
    }
    return true;
  }
}
