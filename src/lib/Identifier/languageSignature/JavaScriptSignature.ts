import fg from "fast-glob";
import { Language, LanguageSignature } from ".";
import { FileMeta } from "../../../lib/DirScanner/type/fileMeta";
import { FrameworkSignature } from "../frameworkSignature/FrameworkSignature";
import { CreateReactApp } from "../frameworkSignature/javascript/create-react-app";
export class JavascriptSignature implements LanguageSignature {
  language: Language = "javascript";
  frameworks: FrameworkSignature[] = [new CreateReactApp()];
  checkLanguage(files: FileMeta[]) {
    const packageJson = files.find((files) => files.name === "package.json");
    if (packageJson) return true;
    const indexJs = files.find((files) => files.name === "index.js");
    if (indexJs) return true;

    return false;
  }

  guessLanguage(path: string): boolean {
    const files = fg.sync("*.{js,jsx,ts,tsx}", {
      cwd: path,
      ignore: ["node_modules"],
    });
    if (files.length > 0) return true;

    return false;
  }

  checkFrameworks(path: string) {
    const framework = this.frameworks.find((framework) =>
      framework.checkFramework(path)
    );
    console.log(framework);
  }
}
