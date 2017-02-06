/**
 * This is the development server used for testing.  The production application
 *      will be communicating with a separate API.
 */
/* eslint-disable no-console */
import { green, red } from 'chalk';
import config from 'config';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

const port = config.spa.port;
const compiler = webpack(webpackConfig);

new WebpackDevServer(compiler, {
    contentBase: 'src/',
    publicPath: webpackConfig.output.publicPath,
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
