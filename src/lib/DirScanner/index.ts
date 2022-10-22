import { dialog } from "electron";
import fs from "fs/promises";
import { FileMeta } from "./type/fileMeta";

export async function selectDirectory() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return { canceled, path: filePaths[0] };
}

export async function scanDirectory(path: string): Promise<FileMeta[]> {
  const files = await fs.readdir(path, { withFileTypes: true });

  return files.map((file) => ({
    name: file.name,
    isDirectory: file.isDirectory(),
  }));
}
