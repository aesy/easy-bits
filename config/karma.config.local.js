require('dotenv').config();

module.exports = (config) => {
	config.set({
		basePath: '../',
		browsers: ['ChromeHeadless', 'FirefoxHeadless'],
		customLaunchers: {
			'FirefoxHeadless': {
				base: 'Firefox',
				flags: [
					'-headless'
				]
			}
		},
		files: ['test/**/*.js'],
		frameworks: ['mocha', 'chai'],
		preprocessors: {
			'test/**/*.js': ['webpack', 'sourcemap']
		},
		reporters: ['mocha'],
		singleRun: true,
		webpack: require('./webpack.config.production')
	});
};
