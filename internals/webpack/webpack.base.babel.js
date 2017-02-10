/**
 * Base webpack configuration with options used by the development and
 *      production configurations.
 */

/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    output: {
        filename: 'bundle.js',
        path: path.resolve(process.cwd(), 'client'),
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [
                    ['es2015', {modules: false}],
                    'latest',
                    'react',
                    'stage-0',
                ],
            }
        }, {
            test: /(\.css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
                publicPath: '/client'
            }),
        }, {
            test: /\.html$/,
            use: 'html-loader',
        }, {
            test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif)$/,
            use: 'file-loader',
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: false,
        }),
    ],
    resolve: {
        modules: [
            path.join(process.cwd(), 'src'),
            'node_modules',
        ],
        extensions: ['.js'],
        alias: {
            scenes: path.resolve(process.cwd(), 'src/scenes'),
        },
    },
    target: 'web',
};
