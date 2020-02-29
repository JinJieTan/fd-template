const merge = require('webpack-merge');
const base_config = require('./webpack.base.config');
const proxy_config = require('./proxy_config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const dev_config = {
    mode: 'development',
    devServer: {
        contentBase: '.',
        open: true,
        port: 7765,
        hot: true,
        proxy: {
            '/api': {
                target: proxy_config.target,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
        disableHostCheck: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //  new BundleAnalyzerPlugin()
    ],
};

module.exports = merge([base_config, dev_config]);
