var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [];
var devtool = undefined;

if (process.env.NODE_ENV === 'production') {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.DedupePlugin()
	);
} else {
	plugins.push(
		new webpack.NoErrorsPlugin()
	);
	devtool = 'inline-source-map';
}

module.exports = {
    context: path.join(__dirname, 'public'),
    entry: './components/entry',
    output: {
		path: path.join(__dirname, 'static'),
        publicPath: '/static/',
        filename: "app.js"
    },

    plugins: [
        new ExtractTextPlugin("app.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            _: "lodash",
            Reflux: "reflux"
        })
	].concat(plugins),

    module: {
        loaders: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
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
    },
	devtool: devtool
};
