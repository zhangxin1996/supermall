// const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.less', '.css'],
      alias: {
        // css: path.join(__dirname, 'src/assets/css'),
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    }
  }
}