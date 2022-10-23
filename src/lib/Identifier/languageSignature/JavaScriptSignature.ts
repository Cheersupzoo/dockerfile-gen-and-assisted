import fg from "fast-glob";
import { Language, LanguageSignature } from ".";
import { FileMeta } from "../../../lib/DirScanner/type/fileMeta";
import { javascriptFramework } from "../frameworkSignature";
import { FrameworkSignature } from "../frameworkSignature/FrameworkSignature";
export class JavascriptSignature implements LanguageSignature {
  language: Language = "javascript";
  frameworks: FrameworkSignature[] = javascriptFramework;
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
