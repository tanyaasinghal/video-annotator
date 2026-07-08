import { ipcMain, dialog } from "electron";
import XLSX from "xlsx";

export function registerExcelHandlers() {

    ipcMain.handle(
        "excel:export",
        async (_, videos, schema) => {

            const rows = videos.map((video) => {

                const row = {
                    "Video Name": video.name
                };

                schema.forEach((category) => {

                    if (category.type === "simple") {

                        row[category.name] =
                            video.labels[category.id] || "";

                    }

                    else if (category.type === "group") {

                        row[`${category.name} Group`] =
                            video.labels[`${category.id}Group`] || "";

                        row[category.name] =
                            video.labels[category.id] || "";

                    }

                });

                return row;

            });

            const workbook = XLSX.utils.book_new();

            const worksheet =
                XLSX.utils.json_to_sheet(rows);

            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "Annotations"
            );

            const result =
                await dialog.showSaveDialog({

                    defaultPath: "annotations.xlsx"

                });

            if (result.canceled)
                return false;

            XLSX.writeFile(
                workbook,
                result.filePath
            );

            return true;

        }
    );

}