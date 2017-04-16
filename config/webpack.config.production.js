const webpack = require('webpack');
const config = require('./webpack.config.base.js');
const merge = require('webpack-merge');

module.exports = merge.smart({
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			compress: {
				warnings: false,
				drop_console: true
			},
			comments: false,
			sourceMap: false,
			mangle: {
				except: [
					'Array', 'BigInteger', 'Boolean', 'Buffer',
					'webpackJsonp', 'exports', 'require'
				]
			},
			minimize: true
		})
	]
}, config);
