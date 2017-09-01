const webpack = require('webpack');
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, '..'),
	entry: {
		'easy-bits.min': './src/index.js'
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
				options: {
					'presets': ['es2015'],
					'plugins': [
						'transform-class-properties',
						'transform-function-bind'
					]
				}
			}]
		}]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.ProvidePlugin({
			Symbol: 'core-js/library/es6/symbol'
		})
	]
};
