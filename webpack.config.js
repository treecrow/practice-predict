// 模块引入
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')

// 全局变量
const isProduction = process.env.NODE_ENV === 'production' // 是否是生产环境

// 路径
const src_PATH = path.resolve(__dirname, 'src')
const client_PATH = path.resolve(src_PATH, 'client')
const server_PATH = path.resolve(src_PATH, 'server')
const static_PATH = path.resolve(__dirname, 'static')
const output_PATH = path.resolve(static_PATH, 'dist')

// 获取 cssLoaders 以及 styleLoaders
function generateLoaders(loader) {
  let loaders = [{
    loader: 'css-loader',
    options: {
      minimize: isProduction,
      sourceMap: isProduction
    }
  }]
  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: {
        sourceMap: isProduction
      }
    })
  }
  if (isProduction) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader'
    })
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
}
const css_LOADERS = {
  css: generateLoaders(),
  postcss: generateLoaders(),
  stylus: generateLoaders('stylus'),
  styl: generateLoaders('stylus')
}
const style_LOADERS = []
for (let extension in css_LOADERS) {
  let loader = css_LOADERS[extension]
  style_LOADERS.push({
    test: new RegExp('\\.' + extension + '$'),
    use: loader
  })
}

// 基本设置
const baseWebpackConfig = {
  output: {
    path: static_PATH,
    filename: 'dist/js/[name].js',
    chunkFilename: 'dist/js/[id].js',
    publicPath: isProduction ? '/' : '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'client': client_PATH
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [client_PATH]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: css_LOADERS,
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'dist/imgs/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'dist/fonts/[ext]?[hash]'
        }
      }
    ]
  }
}

// 开发环境
if (!isProduction) module.exports = merge(baseWebpackConfig, {
  entry: {
    app: path.resolve(client_PATH, 'main.js'),
  },
  module: {
    rules: style_LOADERS
  },
  devServer: {
    historyApiFallback: true,
    port: 9000,
    noInfo: true
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(client_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app'],
      inject: true,
      hash: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
// 生产环境
if (isProduction) module.exports = merge(baseWebpackConfig, {
  entry: {
    app: path.resolve(client_PATH, 'main.js'),
    vendors: ['vue', 'vuex', 'vue-router']
  },
  module: {
    rules: style_LOADERS
  },
  devtool: '#source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(client_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['vendors', 'app', 'hljs.1c'],
      inject: true,
      hash: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'dist/js/vendors.js'
    }),
    new ExtractTextPlugin("dist/css/styles.css"),
    new CleanWebpackPlugin(output_PATH),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})
