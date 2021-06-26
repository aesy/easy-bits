const base = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');

const dev = {
	mode: 'development',
	devtool: 'inline-source-map'
};

module.exports = [
	merge(base.umd, dev),
	merge(base.esm, dev)
];
