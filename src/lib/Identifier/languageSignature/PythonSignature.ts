import fg from "fast-glob";
import { Language, LanguageSignature } from ".";
import { FileMeta } from "../../../lib/DirScanner/type/fileMeta";
import { FrameworkSignature } from "../frameworkSignature/FrameworkSignature";
export class PythonSignature implements LanguageSignature {
  language: Language = "python";
  frameworks: FrameworkSignature[] = [];
  checkLanguage(files: FileMeta[]) {
    const requirementTxt = files.find(
      (files) => files.name === "requirements.txt"
    );
    if (requirementTxt) return true;

    return false;
  }

  guessLanguage(path: string): boolean {
    const files = fg.sync("*.py", { cwd: path });
    if (files.length > 0) return true;

    return false;
  }
}
