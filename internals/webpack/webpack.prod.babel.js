/**
 * Production webpack configuration called from the package.json file.
 */

/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.babel');
const packageFile = require('../../package.json');

module.exports = Object.assign(baseConfig, {
    devtool: 'no-sources-sourcemap',
    entry: {
        app: path.join(process.cwd(), 'src/index.js'),
        vendor: Object.keys(packageFile.dependencies),
    },
    plugins: baseConfig.plugins.concat([
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['vendor'],
            filename: 'vendor.bundle.js',
            minChunks: Infinity
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
            mangle: true,
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi], // Skip pre-minified libs
        }),
        new HtmlWebpackPlugin({
            inject: true,
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
            template: path.resolve(process.cwd(), 'src/www/index.html'),
        })
    ]),
});
