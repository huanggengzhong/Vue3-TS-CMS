const path = require('path')
module.exports = {
  // publicPath: '/'
  outputDir: 'pc',
  //配置方式1
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: "@/components"
  //     }
  //   }
  // },
  // 配置方式2
  // configureWebpack: (config) => { //函数写法会把当前配置全部覆盖
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, 'src'),
  //     "components": '@/components'
  //   }
  // }
  //配置方式3:set链式调用
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
}
