import fg from "fast-glob";
import { Language, LanguageSignature } from ".";
import { FileMeta } from "../../DirScanner/type/fileMeta";
import { javaFramework } from "../frameworkSignature";
import { FrameworkSignature } from "../frameworkSignature/FrameworkSignature";
export class JavaSignature implements LanguageSignature {
  language: Language = "java";
  frameworks: FrameworkSignature[] = javaFramework;
  checkLanguage(files: FileMeta[]) {
    const packageJson = files.find((files) => files.name === "package.json");
    if (packageJson) return true;
    const indexJs = files.find((files) => files.name === "index.js");
    if (indexJs) return true;

    return false;
  }

  guessLanguage(path: string): boolean {
    const files = fg.sync("*.{js,jsx}", { cwd: path });
    if (files.length > 0) return true;

    return false;
  }
}
