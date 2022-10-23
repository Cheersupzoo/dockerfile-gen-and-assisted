import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class CreateReactApp implements FrameworkSignature {
  framework = "create-react-app";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.dependencies["react-scripts"] ? true : false;
  }
}
