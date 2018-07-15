const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
    output: {
        path: resolve('dist'),
        filename: "app.[hash].js",
    },
    plugins: [
    	new CleanWebpackPlugin([resolve('dist')]),
    	new UglifyJsPlugin()
    ]
});