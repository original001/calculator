var webpack = require('webpack');
var path = require('path');

module.exports = {
    output: {
        path: path.resolve('test/'),
        publicPath: 'test',
        filename: "test.js"
    },

    plugins: [
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
                loader: 'style-loader!css-loader'
            },
            {
                test:/\.less$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test:/\.(png|jpg|svg)/,
                exclude: /node_modules/,
                loader: 'url-loader'
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                exclude: /(test|node_modules)/,
                loader: 'istanbul-instrumenter'
            }
        ]
    },

    resolve: {
        alias: {
            components: '../../public/components'
        },
        extensions: ['', '.js']
    }
};