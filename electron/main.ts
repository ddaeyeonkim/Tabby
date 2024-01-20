const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

import 'reflect-metadata'
import { AppDataSource, getAllUsers, saveUser } from './db'

const isDev = process.env.IS_DEV == "true" ? true : false

const createWindow = () => {
    AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL(
        isDev
            ? 'http://localhost:5173'
            : `file://${path.join(__dirname, '../dist/index.html')}`
    )

    return win
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('db:getAllUsers', getAllUsers)
    ipcMain.handle('db:saveUser', saveUser)
    
    const mainWindow = createWindow()

    mainWindow.toggleDevTools()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})