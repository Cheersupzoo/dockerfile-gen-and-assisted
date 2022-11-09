import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class Astro implements FrameworkSignature {
  framework = "Astro";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.dependencies?.["astro"] ? true : false;
  }

  Dockerfile = `
  `;
}