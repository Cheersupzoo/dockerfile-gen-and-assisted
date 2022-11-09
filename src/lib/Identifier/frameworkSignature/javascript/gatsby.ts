import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class Gatsby implements FrameworkSignature {
  framework = "Gatsby";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.dependencies?.["gatsby"] ? true : false;
  }

  Dockerfile = `
    FROM node:18-alpine AS build

    WORKDIR /app
    COPY . .

    RUN yarn
    RUN yarn build

    FROM nginx:1.18-alpine AS deploy

    WORKDIR /usr/share/nginx/html
    RUN rm -rf ./*
    COPY --from=build /app/public .
    ENTRYPOINT ["nginx", "-g", "daemon off;"]`;
}