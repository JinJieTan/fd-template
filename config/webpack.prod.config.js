const merge = require('webpack-merge');
const base_config = require('./webpack.base.config');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const prod_config = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: './',
    },
    module: {
        rules: [
            {
                test: /\.(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: { javascriptEnabled: true },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
        }),
        //依赖分析
        // new BundleAnalyzerPlugin()
        //PWA
        // new WorkboxPlugin.GenerateSW({
        //   clientsClaim: true,
        //   skipWaiting: true,
        //   importWorkboxFrom: 'local',
        //   include: [/\.js$/, /\.css$/, /\.html$/, /\.jpg/, /\.jpeg/, /\.svg/, /\.webp/, /\.png/],
        // }),
    ],
};

module.exports = merge([base_config, prod_config]);
