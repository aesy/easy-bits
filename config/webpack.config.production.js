const config = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(config, {
	mode: 'production',
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				include: /\.min\.js$/,
				sourceMap: false,
				uglifyOptions: {
					compress: {
						drop_console: true
					}
				}
			})
		]
	}
});
