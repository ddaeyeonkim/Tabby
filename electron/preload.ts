const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  getAllUsers: () => ipcRenderer.invoke('db:getAllUsers'),
  saveUser: () => ipcRenderer.invoke('db:saveUser'),
  getAllTasks: () => ipcRenderer.invoke('db:getAllTasks'),
  saveTask: (
    taskName: string,
    estimatedDurationHours?: number,
    fixVersion?: string,
    description?: string
  ) => ipcRenderer.invoke('db:saveTask', taskName, estimatedDurationHours, fixVersion, description)
})
