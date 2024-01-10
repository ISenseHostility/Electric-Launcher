'use strict'

import { app, protocol, BrowserWindow, dialog, webContents, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import {ipcMain} from "electron";
const path = require('path');
const fs = require('fs');
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let mainWindow
const saveLocation = app.getPath('appData') + '\\Electric Launcher\\saved'
const saveFile = app.getPath('appData') + '\\Electric Launcher\\saved\\software.json';

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    frame: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets/electric-launcher.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,

      webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.maximize()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }
}

function getFilePath() {
  let path = dialog.showOpenDialogSync({
    properties: [
      'openFile'
    ],
    filters: [
      {
        name: 'Runnable',
        extensions: [
          'exe',
          'jar',
          'bat'
        ]
      }
    ]
  })

  return path.join()
}

function getImagePath() {
  let path = dialog.showOpenDialogSync({
    properties: [
      'openFile'
    ],
    filters: [
      {
        name: 'Image',
        extensions: [
          'png',
          'jpg',
          'jpeg',
          'webp',
          'gif'
        ]
      }
    ]
  })

  return path.join()
}

function makeLocalPath() {
  let exists = fs.existsSync(saveFile)

  if (!exists) {
    fs.mkdirSync(saveLocation, {recursive: true})
    fs.writeFileSync(saveFile, JSON.stringify([], null, 4), 'utf-8')
  }
}

function getAllSoftware() {
  return JSON.parse(fs.readFileSync(saveFile, 'utf-8'))
}

// on app started
app.whenReady().then(() => {

  // get saved data into app
  makeLocalPath()

  // ipc stuff
  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })

  ipcMain.on('toggleMaximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.handle('selectFile', getFilePath)
  ipcMain.handle('selectImage', getImagePath)

  ipcMain.on('addSoftware', (e, obj) => {
    let saves = JSON.parse(fs.readFileSync(saveFile, 'utf-8'))

    saves.push(obj)

    fs.writeFileSync(saveFile, JSON.stringify(saves, null, 4), 'utf-8')
  })

  ipcMain.on('updateSoftware', (e, obj) => {
    let saves = JSON.parse(fs.readFileSync(saveFile, 'utf-8'))

    for (let i = 0; i < saves.length; i++) {
      if (saves[i].id === obj.id) {
        saves.splice(i, 1)
        break
      }
    }

    saves.push(obj)

    fs.writeFileSync(saveFile, JSON.stringify(saves, null, 4), 'utf-8')
  })

  ipcMain.on('deleteSave', (e, id) => {
    let saves = JSON.parse(fs.readFileSync(saveFile, 'utf-8'))

    for (let i = 0; i < saves.length; i++) {
      if (saves[i].id === id) {
        saves.splice(i, 1)
        break
      }
    }

    fs.writeFileSync(saveFile, JSON.stringify(saves, null, 4), 'utf-8')
  })

  ipcMain.handle('getAllSoftware', getAllSoftware)

  ipcMain.on('launchSoftware', (e, path) => {
    shell.openExternal(path)
  })

  ipcMain.on('deleteAllSoftware', () => {
    fs.unlinkSync(saveFile)
    makeLocalPath()
  })

})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

