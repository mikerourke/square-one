/**
 * This is the development server used for testing.  The production application
 *      will be communicating with a separate API.
 * @module server
 */
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../webpack.config';
import { green, red } from 'chalk';

/*eslint-disable no-console */

const port = process.env.PORT || 8081;
const compiler = webpack(config);

new WebpackDevServer(compiler, {
    contentBase: config.devServer.contentBase,
    hot: true,
    quiet: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
}).listen(port, err => {
    if (err) {
        return console.log(red('Error starting server.'));
    }
    console.log(green(`Server running on port ${port}.`));
});
