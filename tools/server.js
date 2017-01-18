/**
 * This is the development server used for testing.  The production application
 *      will be communicating with a separate API.
 * @module server
 */
import config from 'config';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import { green, red } from 'chalk';

/*eslint-disable no-console */

const port = config.spa.port;

webpackConfig.entry.concat([
    `webpack-dev-server/client?http://${config.host}:${port}/`,
    'webpack/hot/dev-server',
]);

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
}).listen(port, err => {
    if (err) {
        return console.log(red('Error starting server.'));
    }
    console.log(green(`Server running on port ${port}.`));
});
