import { BrowserWindow } from "electron";
import { LanguageSignature, FrameworkSignature } from "../lib/Identifier";

export function getState() {
  return SharedState.getInstance();
}

export class SharedState {
  private static instance: SharedState;

  language: LanguageSignature;
  framework: FrameworkSignature;
  mainWindow: BrowserWindow;

  public static getInstance(): SharedState {
    if (!SharedState.instance) {
      SharedState.instance = new SharedState();
    }

    return SharedState.instance;
  }
}
