const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const hardSourcePlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    entry: {
        app: ['@babel/polyfill', 'react-hot-loader/patch', path.resolve(__dirname, '../src/index.tsx')],
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.ts(x?)$/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    exclude: ['node_modules'],
                                    //jsx语法
                                    cacheDirectory: true,
                                },
                            },
                            {
                                loader: 'thread-loader',
                                // 有同样配置的 loader 会共享一个 worker 池(worker pool)
                                options: {
                                    // 产生的 worker 的数量，默认是 cpu 的核心数
                                    workers: 4,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(less|css)$/,
                        use: [
                            { loader: 'style-loader' },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    javascriptEnabled: true,
                                    // modifyVars: antOverride,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif|svg)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 1024 * 1,
                                    outputPath: '/',
                                    name: '[name].[hash:5].[ext]',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            // favicon: path.resolve(__dirname, '../src/assets/img/favicon.ico'),
        }),
        // new hardSourcePlugin(),
        new webpack.NamedModulesPlugin(),
        new LodashModuleReplacementPlugin({ shorthands: true }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@c': path.resolve(__dirname, '../src/components'),
            '@m': path.resolve(__dirname, '../src/model'),
            '@s': path.resolve(__dirname, '../src/services'),
            '@t': path.resolve(__dirname, '../src/types'),
            'react-dom': '@hot-loader/react-dom',
        },
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
        },
    },
};
