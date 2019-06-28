const path = require('path')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const uglifyjs = require('uglifyjs-webpack-plugin')
const { styles } = require('@ckeditor/ckeditor5-dev-utils')

module.exports = {
  // 打包模式
  mode: 'development',
  // 入口文件配置
  entry: {
    main: './src/app.js',
  },
  // 输出文件配置
  output: {
    // 打包路径
    path: path.resolve(__dirname + '/dist'),
    // 文件路径
    filename: '[name][hash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, 'src'),
      assets: path.join(__dirname, 'src', 'assets')
    }
  },
  // 打包模块
  module: {
    rules: [
      // css-loader
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.js$/,
      //   use: 'babel-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.css$/,
        use: [{
          loader: 'vue-style-loader'
          },{
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },{
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          }
        ]
      }, {
        test: /\.less$/,
        use: [{
          loader: 'vue-style-loader'
        }, {
          loader: 'style-loader',
          options: {
            singleton: true
          }
        }, {
          loader: 'postcss-loader',
          options: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
            },
            minify: true
          })
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [{
          loader: 'raw-loader'
        },{
          loader: 'url-loader',
          options: {
            limit: 4096,
            outputPath: 'image'
          }
        }]
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-loader'
      }
    ]
  },
  // 插件扩展
  plugins: [
    new uglifyjs(),
    new copyWebpackPlugin([
      {
        from: __dirname + '/src/assets',
        to: __dirname + '/dist/assets'
      }
    ]),
    new htmlPlugin({
      title: 'webtest',
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        removeAttributeQuotes: true
      }
    })
  ],
  // webpack配置开启服务能力
  devServer: {
    // 设置基本目录结构
    contentBase: path.resolve(__dirname, 'dist'),
    // 服务器ip地址，使用localhost代替
    host: 'localhost',
    // 服务端是否压缩代码
    compress: true,
    // 服务接口
    port: 8099,
    // 允许ip访问
    disableHostCheck: true
  }
}