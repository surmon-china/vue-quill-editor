
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./base.conf')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = merge(baseConfig, {
  entry: {
    'vue-quill-editor': './src/index.js'
  },
  externals: {
    quill: {
        root: 'Quill',
        commonjs: 'quill',
        commonjs2: 'quill',
        amd: 'quill'
    },
    'object-assign': 'object-assign'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    library: 'VueQuillEditor',
    libraryTarget: 'umd'
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'quill': 'quill/dist/quill.js',
    }
  }
})
