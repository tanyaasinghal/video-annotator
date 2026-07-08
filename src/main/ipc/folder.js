import { ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";

const VIDEO_EXTENSIONS = [
  ".mp4",
  ".mov",
  ".avi",
  ".mkv",
  ".wmv",
  ".webm",
  ".mpeg",
  ".mpg",
  ".m4v"
];

export function registerFolderHandlers() {
  ipcMain.handle("folder:open", async () => {

    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"]
    });

    if (result.canceled) {
      return null;
    }

    const folder = result.filePaths[0];

    const videos = fs
  .readdirSync(folder)
  .filter((file) => {
    const extension = path.extname(file).toLowerCase();
    return VIDEO_EXTENSIONS.includes(extension);
  })
  .sort()
  .map((file, index) => ({
    id: index,
    name: file,
    fullPath: path.join(folder, file)
  }));

    return {
      folder,
      videos
    };

  });
}