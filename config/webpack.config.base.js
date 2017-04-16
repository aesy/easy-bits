const webpack = require('webpack');
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, '..'),
	entry: {
		"EasyBits":     "./src/index.js",
		"EasyBits.min": "./src/index.js",
	},
	output: {
		path: path.resolve(__dirname, '../dist/'),
		publicPath: '/',
		filename: '[name].js',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['.js']
	},
	module: {
		rules: [{
			test: /\.(js)$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
			}]
		}]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin()
	],
	performance: {
		hints: false
	}
};
