/**
 * This is the development server used for testing.  The production application
 *      will be communicating with a separate API.
 */

/* External dependencies */
const { green, red } = require('chalk');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

/* Internal dependencies */
const webpackConfig = require('../webpack/webpack.dev.js');

/**
 * Sets defaults for the required environment variables.  They are only set
 *      if the user didn't specify them prior to running the mock server.
 * @param {Function} done Function to run after the environment variables are
 *      set.
 */
const setDefaultEnvVars = (done) => {
    if (process.env.USE_MOCK_API) {
        if (!process.env.API_URL) {
            process.env.API_URL = 'http://localhost:8080/api';
        }
        if (!process.env.API_PORT) {
            process.env.API_PORT = 8080;
        }
    }
    done();
};

/**
 * Start the Webpack development server.
 */
const startupDevServer = () => {
    const port = process.env.PORT || 8081;
    const buildPath = path.join(process.cwd(), 'src/www');
    const compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        compress: true,
        contentBase: buildPath,
        clientLogLevel: 'error',
        historyApiFallback: true,
        hot: true,
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
};

setDefaultEnvVars(() => {
    startupDevServer();
});
