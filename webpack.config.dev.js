import webpack from 'webpack';
import baseConfig from './webpack.config.base';

const developmentConfig = {
    debug: true,
    devtool: 'inline-source-map',
    noInfo: true,
    entry: [
        './src/index.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8081/',
    ],
    devServer: {
        contentBase: './src'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

export default Object.assign({}, baseConfig, developmentConfig);