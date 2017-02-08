/**
 * This is the development server used for testing.  The production application
 *      will be communicating with a separate API.
 */
/* eslint-disable no-console */
import { green, red } from 'chalk';
import config from 'config';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

const port = config.spa.port;
const buildPath = path.resolve(__dirname, '..', 'src/www');
const compiler = webpack(webpackConfig);

new WebpackDevServer(compiler, {
    contentBase: buildPath,
    outputPath: buildPath,
    stats: {
        chunkModules: false,
        colors: true,
    },
    hot: true,
    quiet: false,
    historyApiFallback: true,
}).listen(port, (err) => {
    if (err) {
        return console.log(red('Error starting server.'));
    }
    return console.log(green(`Server running on port ${port}.`));
});
