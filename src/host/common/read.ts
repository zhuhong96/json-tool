
import { ipcMain, session } from "electron";
const fs = require("fs");

const path = require('path');

export default (win:any)=>{

  ipcMain.on('get-read',(event, cookie)=>{
    console.log(cookie);
     // 这里是传给渲染进程的数据
    fs.readFile("src/utils/author.json","utf8",(err:any, data:any)=>{
      if(err){
        // event.sender.send('asynchronous-reply', "读取失败");
      }else{
        // event.sender.send('asynchronous-reply', data);
      }
      console.log(err);
      

      console.log(data);
      
    })
    // var data = fs.readFileSync('text.txt');
    // console.log("同步读取: " + data.toString());
    // 异步读取
    // fs.readFile('./text.txt', function (err:any, data:any) {
    //    if (err) {
    //        return console.error(err);
    //    }
    //    console.log("异步读取: " + data.toString());
    // });
  })
}