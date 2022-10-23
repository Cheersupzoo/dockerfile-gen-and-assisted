import { CreateReactApp } from "./createReactApp";
import { NextJs } from "./nextJs";
import { SvelteKit } from "./SvelteKit";

export const javascriptFramework = [
  new CreateReactApp(),
  new NextJs(),
  new SvelteKit(),
];
