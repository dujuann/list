const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: [
        resolve("example/main.js")
    ],
    module: {
        noParse: /(mapbox-gl)\.js$/,
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('example')],
                query: {
                    presets: [
                        'es2015',
                        'stage-2'
                    ]
                }
            }, {
                test: /\.css$/, // Only .css files
                loader: 'style-loader!css-loader' // Run both loaders
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'example/index.html'
        }),
    ],
}