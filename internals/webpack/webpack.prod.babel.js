/**
 * Production webpack configuration called from the package.json file.
 */

/* External dependencies */
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* Internal dependencies */
const baseConfig = require('./webpack.base.babel');
const packageFile = require('../../package.json');

const extractBundles = (bundles) => ({
    plugins: bundles.map((bundle) => (
        new webpack.optimize.CommonsChunkPlugin(bundle)
    )),
});

module.exports = Object.assign(baseConfig, {
    entry: [
        path.join(process.cwd(), 'src/index.js'),
    ],
    output: Object.assign({}, baseConfig.output, {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    }),
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.optimize.AggressiveMergingPlugin(),
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
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        })
    ].concat(baseConfig.plugins),
});
