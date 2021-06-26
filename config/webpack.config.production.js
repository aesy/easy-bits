const base = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const prod = {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()]
	}
};

module.exports = [
	merge(base.umd, prod),
	merge(base.esm, prod)
];
