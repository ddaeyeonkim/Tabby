const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    getAllUsers: () => ipcRenderer.invoke('db:getAllUsers'),
    saveUser: () => ipcRenderer.invoke('db:saveUser'),
})