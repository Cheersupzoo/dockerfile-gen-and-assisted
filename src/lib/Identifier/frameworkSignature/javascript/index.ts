import { CreateReactApp } from "./createReactApp";
import { NextJs } from "./nextJs";
import { NuxtJs } from "./nuxtJs";
import { SvelteKit } from "./svelteKit";
import { CreateVue } from "./createVue";
import { Gatsby } from "./gatsby";
import { Angular } from "./angular";
import { Remix } from "./remix";
import { Astro } from "./astro";
import { SolidJS } from "./solidJs";
import { Qwik } from "./qwik";

export const javascriptFramework = [
  new CreateReactApp(),
  new NextJs(),
  new SvelteKit(),
  new NuxtJs(),
  new CreateVue(),
  new Gatsby(),
  new Angular(),
  new Remix(),
  new Astro(),
  new SolidJS(),
  new Qwik(),
];
