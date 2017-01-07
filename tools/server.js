/**
 * This is the development server used for testing.  The production application
 *      will be communicating with a separate API.
 */
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const compiler = webpack(config);

let server = new WebpackDevServer(compiler, {
    contentBase: config.devServer.contentBase,
    hot: true,
    noInfo: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath
});

server.listen(process.env.PORT, function() {
    console.log('Server loaded.');
});