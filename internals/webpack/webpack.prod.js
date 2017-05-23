/**
 * Production webpack configuration called from the package.json file.
 */

/* External dependencies */
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  bail: true,
  entry: [
    path.join(process.cwd(), 'src/index.js'),
  ],
  output: {
    path: path.resolve(process.cwd(), 'client'),
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  module: {
    strictExportPresence: true,
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
          name: '[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        dead_code: true,
        if_return: true,
        join_vars: true,
        pure_getters: true,
        screw_ie8: true,
        sequences: false,
        unsafe: true,
        unsafe_comps: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi], // Skip pre-minified libs
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(process.cwd(), 'src/www/index.html'),
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: false,
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new WebpackCleanupPlugin({
      exclude: [
        'index.html',
        'favicon.ico',
      ],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  resolve: {
    modules: [
      path.join(process.cwd(), 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.css'],
  },
};
