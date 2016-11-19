## Work in Progress, ignore for the time being. And possibly in the future too, there ain't much use to all of this.

# BitFlags

[![Travis](https://img.shields.io/travis/easyfuckingpeasy/BitFlags.svg)](https://travis-ci.org/easyfuckingpeasy/BitFlags)
[![bitHound Overall Score](https://www.bithound.io/github/easyfuckingpeasy/BitFlags/badges/score.svg)](https://www.bithound.io/github/easyfuckingpeasy/LiveCoding.tv-Notifier)
[![dependencies](https://david-dm.org/easyfuckingpeasy/BitFlags.svg)](https://david-dm.org/easyfuckingpeasy/BitFlags)
[![devDependencies](https://david-dm.org/easyfuckingpeasy/BitFlags/dev-status.svg)](https://david-dm.org/easyfuckingpeasy/BitFlags)
[![xo code style](https://img.shields.io/badge/code%20style-%20XO-67d5c5.svg)](https://github.com/sindresorhus/xo)
[![MIT license](https://img.shields.io/github/license/easyfuckingpeasy/BitFlags.svg)](https://github.com/easyfuckingpeasy/BitFlags/blob/master/LICENSE)

Enums, BitFlags, BitFields and BitArrays for JavaScript.

## API Reference
See [Documentation.md](/Docs.md).

## Examples
#### BitFlags + BitField:
```js
var options = new BitFlags('OPTION1', 'OPTION2', 'OPTION3');
var configuration = new BitField();

configuration.on(options.OPTION1 | options.OPTION3); // set option1 & option3 bits to true
configuration.on(options.OPTION1, options.OPTION3); // same as the above

configuration.test(options.OPTION1); // true
configuration.test(options.OPTION2); // false
configuration.test(options.OPTION2); // true
configuration.testAny(options.OPTION1 | options.OPTION2); // true
configuration.testAll(options.OPTION1 | options.OPTION2); // false
```
BitFields and BitArray are interchangeable, the only difference between them is how they store the data.

#### Enums:
```js
var day = new Enum('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

day.MONDAY.name // 'MONDAY'
String(day.MONDAY) // 'MONDAY'
day.FRIDAY.value // 6
Number(day.FRIDAY) // 6

// Enums are immutable
day.MY_OWN_DAY = 1337; // TypeError

var notDefined = day.HAPPY_DAY; // Error

// Enums are iterable
Object.keys(day) // ['MONDAY', 'TUESDAY', 'WEDNESDAY' ...]
for (var value in day) {}
day.forEach(function(name, value) {});

// Enums are "typesafe", but only if strictly compared
day.MONDAY == otherEnum.OTHER_VALUE // true
day.MONDAY === otherEnum.OTHER_VALUE // false
day.MONDAY.equals(day.FRIDAY) // false
```

## Installation
From npm: run `npm install xxxx --save`

From source: download `xxxx.min.js` in the `dist` folder

#### and then import
ES6 style: `import { Enum } from 'xxxx';`

or link in HTML: `<script src="xxxx.min.js"></script>`

## Browser Support
???

## Contribute
Pull requests are welcome, but please test and lint before by running `npm test` and `npm lint`.

## License
See [LICENSE](/LICENSE) file
