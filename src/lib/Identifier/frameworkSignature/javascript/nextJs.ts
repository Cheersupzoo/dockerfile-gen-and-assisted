import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class NextJs implements FrameworkSignature {
  framework = "Next.js";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.dependencies["next"] ? true : false;
  }
}
