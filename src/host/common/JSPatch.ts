
import { ipcMain } from "electron";
const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = true; // 是否自动更新
autoUpdater.autoInstallOnAppQuit = true // APP退出的时候自动安装

/*
  * 在开启更新监听事件之前设置
  * 一定要保证该地址下面包含lasted.yml文件和需要更新的exe文件
  */
autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'https://zhuhong.xyz/public/json-tool',
});

export default (win:any)=>{ 
  // autoUpdater.setFeedURL({
  //   provider: 'generic',
  //   url: process.env.VUE_APP_HOT_UPDATE,
  // })
  
  // 发送消息给渲染线程
  function sendStatusToWindow(status?:any, params?:any) {
    win.webContents.send(status, params);
  }
  
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  })
  autoUpdater.on('update-available', (info:any) => {
    // 可以更新版本
    sendStatusToWindow('autoUpdater-canUpdate', info)
  })
  
  autoUpdater.on('error', (err:any) => {
    // 更新错误
    sendStatusToWindow('autoUpdater-error', err)
  })
  // 发起更新程序
  ipcMain.on('autoUpdater-toDownload', () => {
    autoUpdater.downloadUpdate()
  })
  autoUpdater.on('download-progress', (progressObj:any) => {
    // 正在下载的下载进度
    sendStatusToWindow('autoUpdater-progress', progressObj)
  })
  autoUpdater.on('update-downloaded', () => {
    // 下载完成
    sendStatusToWindow('autoUpdater-downloaded')
  })
  
  // 退出程序
  ipcMain.on('exit-app', () => {
    autoUpdater.quitAndInstall()
  })
  
  // 重新检查是否有新版本更新
  ipcMain.on('monitor-update-system',()=>{
    autoUpdater.checkForUpdates()
  })

  // 检测是否有更新
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, 5000);

}