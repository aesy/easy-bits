const pkg = require('../package.json');

const customLaunchers = Object.assign({},
	...saucelabs(['OS X 10.8'], ['safari'], [6]),
	...saucelabs(['OS X 10.10'], ['safari'], [8]),
	...saucelabs(['OS X 10.12'], ['safari'], [10]),
	...saucelabs(['OS X 10.12'], ['firefox'], [4]),
	...saucelabs(['Linux'], ['firefox'], [28, 45]),
	...saucelabs(['Linux'], ['chrome'], [26, 48]),
	...saucelabs(['Linux'], ['opera'], [12]),
	...saucelabs(['Windows 7'], ['firefox'], [54]),
	...saucelabs(['Windows 7'], ['internet explorer'], [8, 9, 10, 11]),
	...saucelabs(['Windows 10'], ['microsoftedge'], [13, 15]),
	...saucelabs(['Windows 10'], ['chrome'], [38, 60])
);

function saucelabs(platforms, browsers, versions) {
	return cartesianProduct(platforms, browsers, versions)
		.map(item => {
			const configuration = {
				base: 'SauceLabs',
				platform: item[0],
				browserName: item[1],
				version: item[2]
			};

			const name = `${configuration.platform}_${configuration.browserName}_${configuration.version}`
				.replace(' ', '_');

			return {
				[name]: configuration
			};
		});
}

function cartesianProduct() {
	const values = [];
	Array.prototype.push.apply(values, arguments);

	return values.reduce((a, b) => {
		return a.map(x => {
			return b.map(y => x.concat(y));
		}).reduce((a, b) => {
			return a.concat(b);
		}, []);
	}, [[]]);
}

function range(from, to) {
	return Array.prototype.apply(null, new Array(to - from + 1))
		.map((element, index) => index + from);
}

module.exports = (config) => {
	config.set({
		basePath: '../',
		browsers: Object.keys(customLaunchers),
		browserDisconnectTolerance: 1,
		concurrency: 2,
		customLaunchers: customLaunchers,
		files: ['test/**/*.js'],
		frameworks: ['mocha', 'chai'],
		preprocessors: {
			'test/**/*.js': ['webpack', 'sourcemap']
		},
		reporters: ['mocha', 'saucelabs'],
		sauceLabs: {
			testName: pkg.name,
			recordScreenshots: false
		},
		singleRun: true,
		webpack: require('./webpack.config.development')
	});

	if (process.env.TRAVIS) {
		config.sauceLabs.build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
		config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
	}
};
