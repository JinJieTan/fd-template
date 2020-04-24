const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const hardSourcePlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack');
const antOverride = require('../src/vendor/antd');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.tsx'),
        vendor: ['react', 'react-dom'],
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
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
                                    //jsx语法
                                    presets: [['@babel/preset-env', { modules: false }]],
                                    cacheDirectory: true,
                                    plugins: [
                                        '@babel/plugin-transform-runtime',
                                        'dva-hmr',
                                        [
                                            'import',
                                            {
                                                libraryName: 'antd',
                                                libraryDirectory: 'es',
                                                style: true, // or 'css'
                                            },
                                        ],
                                    ],
                                },
                            },
                            {
                                loader: 'awesome-typescript-loader',
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
                                loader: 'less-loader',
                                options: {
                                  javascriptEnabled: true,
                                  modifyVars: antOverride
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 1024 * 1,
                                    outputPath: './asset/images',
                                    name: '[name].[hash:5].[ext]',
                                    pulbicPath: './dist/asset/images',
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
            favicon: path.resolve(__dirname, '../src/assets/img/favicon.ico'),
        }),
        new hardSourcePlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@c': path.resolve(__dirname, '../src/components'),
        },
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
        },
    },
};
