'use strict'

import { app, protocol, BrowserWindow,session } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'; // 会导致启动的时候很慢,所以不用
const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require("path");
import host from '@/host/index';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    // 不要边框
    frame: false,
    webPreferences: {
      webviewTag: true,
      // 禁止同源策略，避免 axios 无法使用
      webSecurity: false,
      // Required for Spectron testing
      enableRemoteModule: !!process.env.IS_TEST,
      nodeIntegration: true,
      contextIsolation: false
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: (process.env
      //     .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })


  // 主进程
  host(win);

  // 开发环境
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools() // 打开控制台
  } else {
    // 生产环境
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

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
      // await installExtension(VUEJS3_DEVTOOLS) // 会导致启动的时候很慢
      session.defaultSession.loadExtension( path.resolve(__dirname, "../devTools/chrome"));
    } catch (e:any) {
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
