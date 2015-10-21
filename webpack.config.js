var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve('public'),
    entry: './assets/entry',
    output: {
        path: path.resolve('www/assets/'),
        publicPath: '/www/assets',
        filename: "app.js"
    },

    plugins: [
        new ExtractTextPlugin("app.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            _: "lodash",
            Reflux: "reflux"
        })
    ],

    module: {
        loaders: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test:/\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader')
            },
            {
                test:/\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader')
            },
            {
                test:/\.(png|jpg|svg)/,
                exclude: /node_modules/,
                loader: 'url-loader'
            }
        ]
    },

    resolve: {
        extensions: ['', '.js']
    }
};