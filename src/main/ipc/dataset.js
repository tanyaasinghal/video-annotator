import { ipcMain, app } from "electron";
import fs from "fs";
import path from "path";

export function registerDatasetHandlers() {
  ipcMain.handle("dataset:prepare", async (_, folder) => {

    const schemaFile = path.join(folder, "annotation-schema.json");
    const labelsFile = path.join(folder, "labels.json");

    // Default schema bundled with the application
    const defaultSchema = app.isPackaged
      ? path.join(
        process.resourcesPath,
        "resources",
        "annotation-schema.json"
      )
      : path.join(
        process.cwd(),
        "resources",
        "annotation-schema.json"
      );

    // Copy default schema if it doesn't exist
    if (!fs.existsSync(schemaFile)) {
      fs.copyFileSync(defaultSchema, schemaFile);
    }

    // Create labels.json if missing
    if (!fs.existsSync(labelsFile)) {
      fs.writeFileSync(
        labelsFile,
        JSON.stringify({}, null, 2)
      );
    }

    // Read annotation schema
    const schema = JSON.parse(
      fs.readFileSync(schemaFile, "utf8")
    );

    // Read labels
    const labels = JSON.parse(
      fs.readFileSync(labelsFile, "utf8")
    );

    return {
      schema,
      labels
    };

  });
}