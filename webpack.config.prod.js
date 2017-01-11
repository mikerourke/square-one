import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import baseConfig from './webpack.config.base';

const productionConfig = {
    debug: false,
    devtool: 'source-map',
    noInfo: false,
    entry: './src/index',
    devServer: {
        contentBase: './build'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the React library size:
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
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
            exclude: [/\.min\.js$/gi] // Skip pre-minified libs
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0,
        })
    ]
};

export default Object.assign({}, baseConfig, productionConfig);
