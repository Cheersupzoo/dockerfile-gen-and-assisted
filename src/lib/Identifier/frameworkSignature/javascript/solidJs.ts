import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class SolidJS implements FrameworkSignature {
  framework = "SolidJS";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.devDependencies?.["solid-js"] ? true : false;
  }

  Dockerfile = `
  `;
}