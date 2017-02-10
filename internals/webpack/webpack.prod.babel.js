/**
 * Production webpack configuration called by internals/build.js.
 */

/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const baseConfig = require('./webpack.base.babel');
const packageFile = require('../../package.json');

const plugins = baseConfig.plugins.concat([
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['vendor'],
        filename: 'vendor.bundle.js',
        minChunks: Infinity,
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
    new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), 'src/www/index.html'),
        inject: true,
    })
]);

/*
 * Generates statistics for bundle (size allocation for each library).  The
 * GET_STATS environment variable is set in the build:stats script in the
 * package.json.
 * Note:
 * For some reason, concat() isn't working for the Webpack plugins.  Using the
 * Array.push() method gets the job done.
 */
const getStats = process.env.GET_STATS || false;
if (JSON.stringify(getStats) === 'true') {
    plugins.push(
        new StatsWriterPlugin({
            transform: (data, opts) => {
                const stats = opts.compiler.getStats().toJson({
                    chunkModules: true,
                });
                return JSON.stringify(stats, null, 2);
            },
        })
    );
    plugins.push(
        new Visualizer({
            filename: './statistics.html',
        })
    );
}

module.exports = Object.assign(baseConfig, {
    entry: {
        app: path.resolve(process.cwd(), 'src/index.js'),
        vendor: Object.keys(packageFile.dependencies),
    },
    plugins,
    debug: true,
});
