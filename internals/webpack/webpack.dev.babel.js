/**
 * Development webpack configuration called by internals/server/index.js.
 */

/* eslint-disable */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.babel');

const serverHost = process.env.IP || 'localhost';
const serverPort = process.env.PORT || 8081;

module.exports = Object.assign(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        `webpack-dev-server/client?http://${serverHost}:${serverPort}/`,
        'webpack/hot/dev-server',
        path.join(process.cwd(), 'src/index.js'),
    ],
    plugins: baseConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            templateContent: fs.readFileSync(
                path.resolve(process.cwd(), 'src/www/index.html')
            ).toString(),
        }),
    ]),
});
