const webpack = require('webpack');
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, '..'),
	entry: {
		'easy-bits.min': './src/index.js'
	},
	target: 'web',
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
					presets: [['@babel/preset-env', {
						useBuiltIns: 'usage',
						corejs: 3,
						targets: {
							node: '8',
							chrome: '26',
							firefox: '4',
							edge: '13',
							ie: '10',
							safari: '7'
						}
					}]],
					plugins: [
						'@babel/plugin-proposal-class-properties'
					]
				}
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
