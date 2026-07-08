export async function openFolder() {
  return window.api.openFolder();
}

export async function prepareDataset(folder) {
  return window.api.prepareDataset(folder);
}

export async function saveLabels(folder, labels) {
    return window.api.saveLabels(folder, labels);
}

export async function exportExcel(videos, schema) {

    return window.api.exportExcel(videos, schema);

}