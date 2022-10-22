import { FileMeta } from "../../DirScanner/type/fileMeta";
import { FrameworkSignature } from "../frameworkSignature/FrameworkSignature";
export type Language = "python" | "javascript" | "typescript" | "java";

export interface LanguageSignature {
  language: Language;
  frameworks: FrameworkSignature[];

  checkLanguage(files: FileMeta[]): boolean;
  guessLanguage(path: string): boolean;
}
