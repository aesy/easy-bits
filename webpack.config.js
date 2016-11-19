
module.exports = {
	context: __dirname,
	entry: './src/index.js',
	output: {
		path: 'dist',
		filename: 'BitField.js'
	},

	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: [/node_modules/],
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}]
	},
	plugins: []
};
