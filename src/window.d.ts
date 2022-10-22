export {};
import type { electronAPI } from "./ipc/handles";
declare global {
  interface Window {
    electronAPI: electronAPI;
  }
}
