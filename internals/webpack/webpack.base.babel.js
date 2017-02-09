/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    target: 'web',
    output: {
        path: path.resolve(process.cwd(), 'client'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: path.join(process.cwd(), 'src'),
            exclude: /node_modules/,
            loader: 'babel',
        }, {
            test: /(\.css)$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif)$/,
            loader: 'file',
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new ExtractTextPlugin('styles.css'),
    ],
    resolve: {
        root: path.resolve(process.cwd(), 'src'),
        modules: [
            path.resolve(process.cwd(), 'src'),
            'node_modules',
        ],
        extensions: ['', '.js'],
        alias: {
            scenes: path.resolve(process.cwd(), 'src/scenes'),
        },
    },
};
