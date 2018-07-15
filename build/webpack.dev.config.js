const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
    output: {
        filename: "app.[hash].js",
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});