const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        appId: 'electric_launcher',
        productName: 'Electric Launcher',
        win: {
          icon: './electric-launcher.ico',
          target: 'portable'
        }
      }
    }
  }
})
