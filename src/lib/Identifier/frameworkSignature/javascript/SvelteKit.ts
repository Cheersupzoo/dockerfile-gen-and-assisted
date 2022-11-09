import { FrameworkSignature } from "../FrameworkSignature";
import { getPackageJson } from "./helper";

export class SvelteKit implements FrameworkSignature {
  framework = "SvelteKit";

  checkFramework(path: string) {
    const packageJson = getPackageJson(path);

    return packageJson.devDependencies?.["@sveltejs/kit"] ? true : false;
  }

  Dockerfile = `
  FROM node:16.7-alpine AS build

  WORKDIR /app
  COPY . .
  RUN yarn 
  RUN yarn build

  FROM nginx:1.18-alpine AS deploy-static

  WORKDIR /usr/share/nginx/html
  RUN rm -rf ./*
  COPY --from=build /app/build .
  ENTRYPOINT ["nginx", "-g", "daemon off;"]

  FROM node:18-alpine AS deploy-node

  WORKDIR /app
  RUN rm -rf ./*
  COPY --from=build /app/package.json .
  COPY --from=build /app/build-node .
  RUN yard --prod
  CMD ["node", "index.js"] `;
}
