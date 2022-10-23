import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class SvelteKit implements FrameworkSignature {
  framework = "SvelteKit";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.devDependencies?.["@sveltejs/kit"] ? true : false;
  }
}
