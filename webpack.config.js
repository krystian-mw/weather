/**
 * @author Krystian
 * @license None
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
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
        test: /\.(woff(2)?|ttf|eot|jpe?g|gif|png|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new CopyWebpackPlugin([
          {
            from: 'public'
          }
      ])
  ],
  devtool: 'cheap-module-eval-source-map'
}

module.exports = config