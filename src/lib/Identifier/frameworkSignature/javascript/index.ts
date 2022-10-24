import { CreateReactApp } from "./createReactApp";
import { NextJs } from "./nextJs";
import { NuxtJs } from "./nuxtJs";
import { SvelteKit } from "./svelteKit";

export const javascriptFramework = [
  new CreateReactApp(),
  new NextJs(),
  new SvelteKit(),
  new NuxtJs(),
];
