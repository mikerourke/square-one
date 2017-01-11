import webpack from 'webpack';
import path from 'path';

export default {
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'client'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: ['babel']
            },
            {
                test: /(\.css)$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url?prefix=font/&limit=5000'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    resolve: {
        root: path.resolve(__dirname, 'src'),
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    }
};
