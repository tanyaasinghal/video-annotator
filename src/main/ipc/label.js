import { ipcMain } from "electron";
import fs from "fs";
import path from "path";

export function registerLabelHandlers() {

  ipcMain.handle(

    "label:save",

    async (_, folder, labels) => {

      fs.writeFileSync(

        path.join(folder, "labels.json"),

        JSON.stringify(labels, null, 2)

      );

      return true;

    }

  );

}