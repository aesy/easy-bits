require('dotenv').config();
const pkg = require('../package.json');

const customLaunchers = Object.assign({},
	...saucelabs(['OS X 10.8'], ['safari'], [6]),
	...saucelabs(['OS X 10.10'], ['safari'], [8]),
	...saucelabs(['OS X 10.12'], ['safari'], [10]),
	...saucelabs(['OS X 10.12'], ['firefox'], [4]),
	...saucelabs(['OS X 10.12'], ['chrome'], [48]),
	...saucelabs(['Linux'], ['firefox'], [28]),
	...saucelabs(['Linux'], ['chrome'], [26]),
	...saucelabs(['Linux'], ['opera'], [12]),
	...saucelabs(['Windows 7'], ['firefox'], [54]),
	...saucelabs(['Windows 7'], ['internet explorer'], [9, 10, 11]),
	...saucelabs(['Windows 7'], ['chrome'], [38]),
	...saucelabs(['Windows 10'], ['microsoftedge'], [13, 15]),
	...saucelabs(['Windows 10'], ['chrome'], [60]),
	...saucelabs(['Windows 10'], ['firefox'], [45])
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

module.exports = (config) => {
	if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
		console.error('saucelabs username and/or access key missing');

		process.exit(1);
	}

	require('./karma.config.local')(config);

	config.reporters.push('saucelabs');

	config.set({
		browsers: Object.keys(customLaunchers),
		browserNoActivityTimeout: 30000,
		concurrency: 2,
		customLaunchers: customLaunchers,
		sauceLabs: {
			testName: pkg.name,
			recordScreenshots: false,
			username: process.env.SAUCE_USERNAME,
			accessKey: process.env.SAUCE_ACCESS_KEY
		}
	});

	if (process.env.CI) {
		Object.assign(config.sauceLabs, {
			build: `travis #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`,
			tags: [
				`${pkg.name}_${pkg.version}`,
				`travis@${process.env.TRAVIS_JOB_NUMBER}`,
				`${process.env.SAUCE_USERNAME}@${process.env.TRAVIS_BRANCH}`
			],
			tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
		});
	} else { // Local
		Object.assign(config.sauceLabs, {
			tags: [
				`${pkg.name}@${pkg.version}`,
				`${process.env.SAUCE_USERNAME}@local`
			],
			tunnelIdentifier: Date.now()
		});
	}
};
