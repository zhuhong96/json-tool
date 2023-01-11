<template>
  <div>我是侧边栏
    <el-button type="primary" @click="test">测试</el-button>
      <el-upload
        class="upload-demo"
        drag
        multiple
        action=""
        :auto-upload="false"
        :handleStart="handleStart"
        :on-change="onchange"
        :file-list="fileList"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>

      <div class="table"></div>
  </div>
</template>

<script lang='ts'>
import { ipcRenderer } from "electron";
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: '',
  setup(props: any, { emit }: { emit: any }) {
    const data = reactive({
      fileList:[],
      file:{
        raw:{
          path:''
        }
      }
    });


    let html = '<table>';
    ipcRenderer.on('reader-json-file-data',(event, lists)=>{
      // console.log(event);
      console.log(lists);
      const table = document.querySelector('.table');

      console.log(table);
      const list = [
          {
          "author": "和岘", 
          "paragraphs": [
            "气和玉烛，睿化著鸿明。", 
          ], 
          "rhythmic": "导引"
        }, 
        {
          "author": "和岘", 
          "paragraphs": [
            "严夜警，铜莲漏迟迟。", 
          ], 
          "rhythmic": "六州"
        }, 
      ]
      for (const i in list) {
          html += '<tr>';

          const isObj = !!Object.keys(list[i]).length;

          html += '<td>'+ i +'</td>';
          if (isObj) {
            const objectList:any = list[i] as {};
            for(const n in objectList) {
              // if (i == '0') {
              //   html += '<th>'+n+'</th>';
              // };
              html += '<td>'+objectList[n]+'</td>';
            }
          }
          
          html += '</tr>';
      }
      html += '</table>';

      console.log(html);
      
      

      table && (table.innerHTML = html)
      
    })

    const test = () =>{
      // ipcRenderer.send('get-read',{id:45});
      ipcRenderer.send('reader-json-file',data.file.raw.path);
    };
    const handleStart = (file:any) => {
      console.log(file);
      
    }

    const onchange = (file:any, fileList:any) =>{
      console.log(file);
      data.file = file;
      console.log(fileList);
    }
    return {
      ...toRefs(data),
      test,
      handleStart,
      onchange
    }
  },
})

</script>

<style scoped lang='less'>
</style>