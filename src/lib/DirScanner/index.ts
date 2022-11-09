import { dialog, shell } from "electron";
import fs from "fs/promises";
import { getState } from "../../state";
import { FileMeta } from "./type/fileMeta";

export async function selectDirectory() {
  const state = getState();
  const { canceled, filePaths } = await dialog.showOpenDialog(
    state.mainWindow,
    {
      properties: ["openDirectory"],
    }
  );
  return { canceled, path: filePaths[0] };
}

export async function scanDirectory(path: string): Promise<FileMeta[]> {
  const files = await fs.readdir(path, { withFileTypes: true });

  return files.map((file) => ({
    name: file.name,
    isDirectory: file.isDirectory(),
  }));
}

export function openPath(path: string) {
  shell.openPath(path);
}
