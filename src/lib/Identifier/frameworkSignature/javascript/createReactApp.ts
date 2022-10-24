import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class CreateReactApp implements FrameworkSignature {
  framework = "create-react-app";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.dependencies?.["react-scripts"] ? true : false;
  }

  Dockerfile = `
FROM node:16.18.0 as build-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.23.2-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`;
}
