var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    // 'react-hot-loader/patch',
    path.join(__dirname, 'source', 'index.js')
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname),
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    port: 9000,
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                modules: false
              }], '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-async-to-generator', '@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-react-jsx-source', 'react-hot-loader/babel']
            }
          }
        ]
      }, {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCase'
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              debug: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|gif|jpg|woff|woff2|svg|ttf)$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new HtmlWebpackPlugin({
      title: '@oscbco/select',
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-eval-source-map',
  target: 'web'
};
