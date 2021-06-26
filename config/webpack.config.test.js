const path = require('path');
const base = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');

const test = {
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [{
			test: /\.(js)$/,
			include: path.resolve('src'),
			enforce: 'post',
			use: [{
				loader: 'istanbul-instrumenter-loader',
				options: {
					esModules: true
				}
			}]
		}]
	}
};

module.exports = merge(base.umd, test);
