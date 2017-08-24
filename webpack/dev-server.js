const path = require('path')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

module.exports = function (config, params = {}) {
  const {
    port = process.env.PORT || 3000,
    host = '127.0.0.1',
    hotReload = false,
  } = params

  config.entry.unshift(`webpack-dev-server/client?http://${host}:${port}`)
  config.entry.unshift('webpack/hot/only-dev-server')
  config.plugins.push(new HotModuleReplacementPlugin())

  config.devServer = {
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
    hot: true,
    port,
    overlay: {
      warnings: true,
      errors: true,
    },
    stats: {
      cached: false,
      cachedAssets: false,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: true,
      version: false,
      modules: false,
    },
  }
}
