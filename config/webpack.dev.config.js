const merge = require('webpack-merge');
const base_config = require('./webpack.base.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const dev_config = {
    mode: 'development',
    devServer: {
        contentBase: '/',
        open: true,
        port: 8808,
        hot: true,
        host: 'rental-dev.mysoft.com.cn',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
        // proxy: {
        //     '/api': {
        //         target: proxyConfig.target,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': '',
        //         },
        //     },
        // },
        disableHostCheck: true,
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        //  new BundleAnalyzerPlugin()
    ],
};

module.exports = merge([base_config, dev_config]);
