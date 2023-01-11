import { ipcMain, session } from "electron";
const fs = require("fs");

const path = require('path');

export default (win:any)=>{

  /**
   * 读取json文件
   */
  ipcMain.on('reader-json-file',(event, filePath)=>{
    
    fs.readFile(filePath,"utf8",(err:any, data:any)=>{
      if(err) return console.error(err);
      // 返回json数据
      win.webContents.send('reader-json-file-data',data);
    })
  })
}