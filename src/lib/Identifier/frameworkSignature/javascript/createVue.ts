import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class CreateVue implements FrameworkSignature {
  framework = "create-vue";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.devDependencies?.["@vue/tsconfig"] ? true : false;
  }

  Dockerfile = `
  # build stage
  FROM node:lts-alpine as build-stage
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run build

  # production stage
  FROM nginx:stable-alpine as production-stage
  COPY --from=build-stage /app/dist /usr/share/nginx/html
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]`;
}