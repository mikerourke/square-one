/**
 * This is the development server used for testing.  The production application
 *      will be communicating with a separate API.
 */

/* eslint-disable */

const { green, red } = require('chalk');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.dev.babel');

const port = process.env.PORT || 8081;
const buildPath = path.join(process.cwd(), 'src/www');
const compiler = webpack(webpackConfig);

new WebpackDevServer(compiler, {
    compress: true,
    contentBase: buildPath,
    clientLogLevel: 'error',
    historyApiFallback: true,
    hot: true,
    // TODO: Setup proxy for API.
    // proxy: {
    //     '/api': {
    //         target: `http://localhost:${process.env.API_PORT}`,
    //     },
    // },
    quiet: false,
    stats: {
        chunkModules: false,
        colors: true,
        errors: true,
        errorDetails: true,
    },
}).listen(port, (err) => {
    if (err) {
        return console.log(red('Error starting server.'));
    }
    return console.log(green(`Server running on port ${port}.`));
});
