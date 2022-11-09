import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class Qwik implements FrameworkSignature {
  framework = "qwik";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.devDependencies?.["@builder.io/qwik"] ? true : false;
  }

  Dockerfile = `
FROM node:16.12.0-buster
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY . ./
RUN yarn build.preview
EXPOSE 4173
CMD ["node", "./node_modules/vite/bin/vite.js", "preview", "--host"]`;
}
