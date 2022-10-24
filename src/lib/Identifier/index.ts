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

export class Identifier {
  constructor(private path: string, private files: FileMeta[]) {}

  getLanguageSignature(): LanguageSignature {
    const languageSignatures = [
      new JavascriptSignature(),
      new JavaSignature(),
      new PythonSignature(),
    ];

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
    language: language?.language ?? "unknown",
    framework: framework?.framework ?? "",
  };
}
