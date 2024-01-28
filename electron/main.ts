const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const isDev = process.env.IS_DEV == "true" ? true : false

const createWindow = () => {
    const win = new BrowserWindow({
        width: isDev ? 1424 : 1024,
        height: 760,
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