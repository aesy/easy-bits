const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const base = {
	context: path.resolve(__dirname, '..'),
	entry: {
		'easy-bits.min': './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist/'),
		publicPath: '/'
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

module.exports = {
	umd: merge(base, {
		output: {
			filename: '[name].js',
			library: {
				type: 'umd'
			},
			globalObject: 'this'
		}
	}),
	esm: merge(base, {
		output: {
			filename: '[name].mjs',
			library: {
				type: 'module'
			}
		},
		experiments: {
			outputModule: true
		}
	})
};
