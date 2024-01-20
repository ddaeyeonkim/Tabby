const { contextBridge, ipcRenderer } = require('electron')
import { getAllUsers, saveUser } from './db'

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    // we can also expose variables, not just functions
    getAllUsers: () => ipcRenderer.invoke('db:getAllUsers'),
    saveUser: () => ipcRenderer.invoke('db:saveUser'),
})