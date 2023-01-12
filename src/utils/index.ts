
export default { 

  /**
   * 数据转json文件
   * @param stringData 数据
   * @param filename 文件名称
   */
  dataToJSONFile(stringData:string,filename:string = 'json-toll') {
    const blob = new Blob([stringData], {
      type: "application/json",
    });
    // 根据 blob生成 url链接
    const objectURL = URL.createObjectURL(blob);

    // 创建一个 a 标签Tag
    const aTag = document.createElement("a");
    // 设置文件的下载地址
    aTag.href = objectURL;
    // 设置保存后的文件名称
    aTag.download = filename + ".json";
    // 给 a 标签添加点击事件
    aTag.click();
    if (aTag) {
      aTag.remove()
    }
    // 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
    // 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
    // URL.revokeObjectURL(objectURL);
  }

}