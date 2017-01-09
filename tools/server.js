/**
 * This is the development server used for testing.  The production application
 *      will be communicating with a separate API.
 * @module server
 */
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = process.env.PORT || 8081;
const compiler = webpack(config);

new WebpackDevServer(compiler, {
    contentBase: config.devServer.contentBase,
    hot: true,
    noInfo: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    historyApiFallback: true
}).listen(port, err => {
    if (err) {
        return console.log('Error starting server.');
    }
    console.log('Server loaded.');
});
