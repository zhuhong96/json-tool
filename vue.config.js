const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    externals: {
      'electron': 'require("electron")'
    },
  },
})
