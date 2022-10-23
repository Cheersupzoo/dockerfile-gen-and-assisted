import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class NuxtJs implements FrameworkSignature {
  framework = "Nuxt.js";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.dependencies?.["nuxt"] ? true : false;
  }
}
