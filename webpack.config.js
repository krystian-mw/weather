/**
 * @author Krystian
 * @license None
 */

const path = require('path')
const DefinePlugin = require('webpack').DefinePlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.stringify('development')
const isDevelopment = (process.env.NODE_ENV === 'development') ? true : false

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'build'),
    filename: '[name].pack.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
      new DefinePlugin({
          'process.env': {
              NODE_ENV: process.env.NODE_ENV || JSON.stringify('development'),
              ENV: process.env.NODE_ENV || JSON.stringify('development'),
              ASSET_PATH: JSON.stringify('/')
          }
      }),
      // If splitting bundles, use this to auto import all splitted modules
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    // publicPath: '/',
    historyApiFallback: true,
    port: process.env.PORT || 80,
    proxy: {
        "/api": {
            target: 'http://localhost:8080',
            secure: false
        }
    },
    host: '0.0.0.0',
    disableHostCheck: true
  }
}