const path = require('path');
const config = require('./webpack.config.development.js');
const merge = require('webpack-merge');

module.exports = merge.smart({
	module: {
		rules: [{
			test: /\.(js)/,
			include: path.resolve('src'),
			loader: 'istanbul-instrumenter-loader'
		}]
	}
}, config);
