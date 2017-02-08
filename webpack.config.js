/* eslint-disable */
import config from 'config';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import Visualizer from 'webpack-visualizer-plugin';

const configFile = require('./config/default.json');
const packageFile = require('./package.json');

/*
 * This will take the current NODE_ENV, and save the config file to
 * 'client/config.json'.  The webpack alias below will then build that file
 * into the client build.
 */
fs.writeFileSync(path.resolve(__dirname, 'client/config.json'),
    JSON.stringify(config));

const baseConfig = {
    noInfo: true,
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'client'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            loader: 'babel',
        }, {
            test: /(\.css)$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file',
        }, {
            test: /\.(woff|woff2)$/,
            loader: 'url?prefix=font/&limit=5000',
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream',
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml',
        }, {
            test: /\.(jpg|png)$/,
            loader: 'file',
        }],
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ],
    resolve: {
        root: path.resolve(__dirname, 'src'),
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
        ],
        extensions: ['', '.js'],
        alias: {
            config: path.resolve(__dirname, 'client/config.json'),
            scenes: path.resolve(__dirname, 'src/scenes'),
        },
    },
};

const developmentConfig = {
    debug: true,
    devtool: 'inline-source-map',
    entry: [
        `webpack-dev-server/client?http://${configFile.host}:${configFile.spa.port}/`,
        'webpack/hot/dev-server',
        './src/index',
    ],
    plugins: baseConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]),
};

let buildConfig = {
    debug: false,
    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
        vendor: Object.keys(packageFile.dependencies),
    },
    plugins: baseConfig.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the React library size:
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.IgnorePlugin(
            /^\.\/locale$/, [/moment$/]
        ),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['vendor'],
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                dead_code: true,
                if_return: true,
                join_vars: true,
                pure_getters: true,
                sequences: false,
                screw_ie8: true,
                unsafe: true,
                unsafe_comps: true,
                unused: true,
                warnings: false,
            },
            mangle: true,
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi], // Skip pre-minified libs
        }),
    ]),
};

/*
 * Generates statistics for bundle (size allocation for each library).  The
 * GET_STATS environment variable is set in the build:stats script in the
 * package.json.
 * Note:
 * For some reason, concat() isn't working for the Webpack plugins.  Using the
 * Array.push() method gets the job done.
 */
if (process.env.GET_STATS == 'true') {
    buildConfig.plugins.push(
        new StatsWriterPlugin({
            transform: (data, opts) => {
                const stats = opts.compiler.getStats().toJson({
                    chunkModules: true,
                });
                return JSON.stringify(stats, null, 2);
            },
        })
    );
    buildConfig.plugins.push(
        new Visualizer({
            filename: './statistics.html',
        })
    );
}

const configToUse = (process.env.NODE_ENV == 'development') ?
                    developmentConfig :
                    buildConfig;

export default Object.assign({}, baseConfig, configToUse);
