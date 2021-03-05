const path = require('path');
const config = require('./webpack.config.development.js');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
	target: 'node',
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
});
