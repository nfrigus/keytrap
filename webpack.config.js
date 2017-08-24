const path = require('path')

const config = {
  entry: ['./index.js'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [],
}


if (process.env.NODE_ENV === 'production') {
  config.devtool = 'hidden-source-map'
} else {
  config.devtool = 'cheap-module-source-map'
  require('./webpack/dev-server')(config)
}

module.exports = config
