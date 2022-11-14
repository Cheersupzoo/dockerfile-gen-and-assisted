import fs from "fs";
import { languageSignatures } from "../Identifier";

export function generateDockerfile(path: string, language: string, framework: string) {
  const signature =  languageSignatures.find(sig => sig.language === language).frameworks.find(sig => sig.framework === framework)
  fs.writeFileSync(`${path}/Dockerfile`, signature.Dockerfile ?? "");
}
