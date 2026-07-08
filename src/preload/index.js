import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openFolder: () => ipcRenderer.invoke("folder:open"),

  prepareDataset: (folder) =>
    ipcRenderer.invoke("dataset:prepare", folder),

  saveLabels: (folder, labels) =>
    ipcRenderer.invoke(
      "label:save",
      folder,
      labels
    ),
  exportExcel: (videos, schema) =>
    ipcRenderer.invoke(
      "excel:export",
      videos,
      schema
    ),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
