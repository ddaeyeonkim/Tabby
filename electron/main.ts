const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

import 'reflect-metadata'
import { AppDataSource, getAllUsers, saveUser } from './db'
import TaskRepository from './task_repository'

const isDev = process.env.IS_DEV == "true" ? true : false

let taskRepository!: TaskRepository

const createWindow = () => {
    AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        taskRepository = new TaskRepository(AppDataSource)
    })
    .catch((error) => console.log(error))

    const win = new BrowserWindow({
        width: isDev ? 1200 : 800,
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
    ipcMain.handle('db:getAllTasks', async () => await taskRepository.getAllTasks())
    ipcMain.handle('db:saveTask', async (_: any, args: string) => {
        await taskRepository.saveTask(args)
    }
    )
    
    const mainWindow = createWindow()

    if (isDev) {
        mainWindow.toggleDevTools()
    }

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