/**
 * Development webpack configuration called by internals/server/index.js.
 */

/* External dependencies */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverHost = process.env.IP || 'localhost';
const serverPort = process.env.PORT || 8081;

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    `webpack-dev-server/client?http://${serverHost}:${serverPort}/`,
    'webpack/hot/dev-server',
    path.join(process.cwd(), 'src/index.js'),
  ],
  output: {
    path: path.resolve(process.cwd(), 'client'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      },
      {
        test: /(\.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/client'
        }),
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(process.cwd(), 'src/www/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  resolve: {
    modules: [
      path.join(process.cwd(), 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.css'],
  },
  performance: {
    hints: false,
  },
};
