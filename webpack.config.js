import config from 'config';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import Visualizer from 'webpack-visualizer-plugin';

/* eslint-disable */

/*
 * This will take the current NODE_ENV, and save the config file to
 * 'client/config.json'.  The webpack alias below will then build that file
 * into the client build.
 */
fs.writeFileSync(path.resolve(__dirname, 'client/config.json'),
    JSON.stringify(config));

const isDevelopment = (process.env.NODE_ENV == 'development');

const baseConfig = {
    debug: (isDevelopment),
    noInfo: true,
    target: 'web',
    entry: ['./src/index'],
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
            loaders: ['style', 'css'],
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
        }],
    },
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
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
};

let buildConfig = {
    devtool: 'eval',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the React library size:
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi], // Skip pre-minified libs
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),

    ],
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

const configToUse = isDevelopment ?
                    developmentConfig :
                    buildConfig;

export default Object.assign({}, baseConfig, configToUse);
