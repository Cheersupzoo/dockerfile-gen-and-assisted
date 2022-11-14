import { getState } from "../../state";
import { FileMeta } from "../DirScanner/type/fileMeta";
import { FrameworkSignature } from "./frameworkSignature/FrameworkSignature";
import {
  JavascriptSignature,
  JavaSignature,
  LanguageSignature,
  PythonSignature,
} from "./languageSignature";

export * from "./frameworkSignature";
export * from "./languageSignature";

export const languageSignatures = [
  new JavascriptSignature(),
  new JavaSignature(),
  new PythonSignature(),
];

export const languageList = async () =>
  languageSignatures.map((sig) => sig.language);

export const frameworkList = async (language: string) =>
  languageSignatures
    .find((sig) => sig.language === language)
    .frameworks.map((sig) => sig.framework);

export class Identifier {
  constructor(private path: string, private files: FileMeta[]) {}

  getLanguageSignature(): LanguageSignature {
    return (
      languageSignatures.find((lSignature) =>
        lSignature.checkLanguage(this.files)
      ) ??
      languageSignatures.find((lSignature) =>
        lSignature.guessLanguage(this.path)
      )
    );
  }

  getFrameworkSignature(
    languageSignature: LanguageSignature
  ): FrameworkSignature {
    return languageSignature?.frameworks.find((framework) =>
      framework.checkFramework(this.path)
    );
  }
}

export async function getLanguageAndFramework(path: string, files: FileMeta[]) {
  const identifier = new Identifier(path, files);
  const language = identifier.getLanguageSignature();
  const framework = identifier.getFrameworkSignature(language);

  const state = getState();
  state.language = language;
  state.framework = framework;

  return {
    language: language?.language ?? "",
    framework: framework?.framework ?? "",
  };
}
