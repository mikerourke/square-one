/**
 * Development webpack configuration called by internals/server.js.
 */

/* eslint-disable */

const webpack = require('webpack');
const baseConfig = require('./webpack.base.babel');

const serverHost = process.env.IP || 'localhost';
const serverPort = process.env.PORT || 8081;

module.exports = Object.assign(baseConfig, {
    entry: [
        `webpack-dev-server/client?http://${serverHost}:${serverPort}/`,
        'webpack/hot/dev-server',
        './src/index',
    ],
    plugins: baseConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]),
    debug: true,
    devtool: 'cheap-module-eval-source-map',
});
