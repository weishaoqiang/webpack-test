const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const extracTtextWebpackPlugin = require('extract-text-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const uglifyjs = require('uglifyjs-webpack-plugin')

module.exports = {
  // 打包模式
  mode: 'development',
  // 入口文件配置
  entry: {
    main: './src/main.js',
  },
  // 输出文件配置
  output: {
    // 打包路径
    path: path.resolve(__dirname, './dist/'),
    // 文件路径
    filename: '[name][hash].js'
  },
  // 打包模块
  module: {
    rules: [
      // css-loader
      {
        test: /\.css$/,
        // use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
        use: extracTtextWebpackPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 4096,
            outputPath: 'images/'
          }
        }]
      },
      // {
      //   test: /\.(htm|html)$/i,
      //   use: ['html-withimg-loader']
      // }
    ]
  },
  // 插件扩展
  plugins: [
    new uglifyjs(),
    new CleanWebpackPlugin(['./dist']),
    new htmlPlugin({
      title: '长租公寓',
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        removeAttributeQuotes: true
      },
      hash: true
    }),
    new extracTtextWebpackPlugin('css/index')
  ],
  // webpack配置开启服务能力
  devServer: {
    // 设置基本目录结构
    contentBase: path.resolve(__dirname, './dist/'),
    // 服务器ip地址，使用localhost代替
    host: 'localhost',
    // 服务端是否压缩代码
    compress: true,
    // 服务接口
    port: 8099
  }
}