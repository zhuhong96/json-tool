import { ipcMain, session } from "electron";
const fs = require("fs");

const path = require('path');
const xlsx = require("node-xlsx")

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

  /**
   * 读取excel文件
   */
  ipcMain.on('reader-excel-file',(event, filePath)=>{

    const sheets = xlsx.parse(filePath);

    //读取xlxs的sheet1 
    const sheetData = sheets[0].data;

    win.webContents.send('reader-excel-file-data',sheetData);
  })
}