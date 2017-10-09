# Easy Bits

[![npm](https://img.shields.io/npm/v/easy-bits.svg)](https://www.npmjs.com/package/easy-bits)
[![Travis](https://img.shields.io/travis/aesy/Easy-Bits.svg)](https://travis-ci.org/aesy/Easy-Bits)
[![Code Climate](https://img.shields.io/codeclimate/github/aesy/Easy-Bits.svg)](https://codeclimate.com/github/aesy/Easy-Bits)
[![Coverage Status](https://coveralls.io/repos/github/aesy/Easy-Bits/badge.svg?branch=master)](https://coveralls.io/github/aesy/Easy-Bits?branch=master)
[![xo code style](https://img.shields.io/badge/code%20style-%20XO-67d5c5.svg)](https://github.com/sindresorhus/xo)
[![MIT license](https://img.shields.io/github/license/aesy/Easy-Bits.svg)](https://github.com/aesy/Easy-Bits/blob/master/LICENSE)

Enums, BitFlags, BitFields, BitMasks and BitArrays for JavaScript & TypeScript.

### [API Reference](https://aesy.github.io/Easy-Bits/)

## Usage
#### BitFlags + BitField:
```js
const options = new BitFlags('OPTION1', 'OPTION2', 'OPTION3');
const configuration = options.createBitField();

configuration.on(options.OPTION1 | options.OPTION3); // Set option1 & option3 bits to true
configuration.on(options.OPTION1, options.OPTION3);  // Same as the above

configuration.test(options.OPTION1); // true
configuration.test(options.OPTION2); // false
configuration.test(options.OPTION3); // true
configuration.testAny(options.OPTION1 | options.OPTION2); // true
configuration.testAll(options.OPTION1 | options.OPTION2); // false

configuration.count(); // 2
configuration.flipAll();
configuration.count(); // 1
configuration.test(options.OPTION2); // true

const clone = configuration.clone();

// Serialize
const string = configuration.serialize();
// Deserialize
const copy = BitFlags.deserialize(string);
```
BitFields and BitArrays are interchangeable, their APIs are identical. 
The only difference between them is how many flags they support (BitField is limited to 31 flags) and their performance 
(BitField is about 25% faster than BitArray). This is due to how they internally store the data.

#### Enums:
```js
const Day = new Enum('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

console.log(Day.MONDAY);         // EnumConstant('MONDAY':0)
console.log(Day.MONDAY.name);    // 'MONDAY'
console.log(String(Day.MONDAY)); // 'MONDAY'
console.log(Day.FRIDAY.ordinal); // 4
console.log(Number(Day.FRIDAY)); // 4

// Enums are immutable
Day.MY_OWN_DAY = 1337;
console.log(Day.MY_OWN_DAY); // still undefined
Day.MONDAY = 42;
console.log(Day.MONDAY);     // still EnumConstant('MONDAY':0)

// Enums are iterable
console.log(Object.keys(Day)); // ['MONDAY', 'TUESDAY' 'WEDNESDAY', 'THURSDAY', ...]
console.log(Day.values());     // [EnumConstant('MONDAY':0), EnumConstant('TUESDAY':1), ...]
for (let value of Day) {}
Day.forEach((value, name) => {});

// Enums are easy to use
switch (value) {
  case Day.MONDAY:
    break;
  case Day.TUESDAY:
    break;
}

console.log(Day.MONDAY.equals(Day.FRIDAY));     // false
console.log(Day.MONDAY === OtherEnum.CONSTANT); // false
console.log(Day.MONDAY == OtherEnum.CONSTANT);  // true, if their ordinal values are the same
```

Note that the examples above uses ECMAScript 2015 features.

#### TypeScript
```ts
// Typings for the Enum class is not provided, use TypeScripts' enum instead!
enum Direction { NORTH, SOUTH, EAST, WEST }

// No typings for BitFlags either. Again, use TypeScripts' enum!
enum FontStyle {
  NORMAL      = 0,
  BOLD        = 1 << 1,
  ITALICS     = 1 << 2,
  UNDERSCORED = 1 << 3,
  UPPERCASE   = 1 << 4,
  MY_FAVORITE = BOLD | ITALICS
}

const configuration = new BitField<FontStyle>();
configuration.on(FontStyle.BOLD | FontStyle.UPPERCASE);
configuration.off(Direction.NORTH); // ERROR: argument type Direction is not assignable to parameter type FontStyle
```

## Installation
From NPM: run `npm install easy-bits --save`.

From source: download `easy-bits.min.js` in the `dist` folder.

#### and then import
ES2015 style: `import { Enum } from 'easy-bits';`.

or link in HTML: `<script src="easy-bits.min.js"></script>`.

## Support
Easy-Bits uses polyfills that doesn't pollute the global namespace in order to support the following environments
(including `NodeJS 4+`): 

[![Cross Browser Build Status](https://saucelabs.com/browser-matrix/easy-bits.svg)](https://saucelabs.com/u/easy-bits)

## Contribute
Use the [issue tracker](https://github.com/aesy/Easy-Bits/issues) to report bugs or make feature requests. 
Pull requests are welcome, just make sure compiliation still works (`npm run build:prod`), 
linting pass without errors (`npm run lint`) and all tests still pass (`npm run test:node`) beforehand. 
Check the list of issues and todos below if you want to contribute but don't know where to start!

## Issues
* Accessing nonexistant EnumConstant properties does not throw an error. This is possible to solve with 
[Proxies](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
but a polyfill for that would make lookups slow {{citation needed}}.
* EnumConstants should interpolate as a string. For example, this fails:
```js
const constant = new EnumConstant('name', 42);
expect('' + constant + '').to.equal(constant.toString()); // Expected: 'EnumConstant(name:42)', Actual: '42'
expect(`${constant}`).to.equal(constant.toString());      // Expected: 'EnumConstant(name:42)', Actual: '42'
```

## Todo
* All configuration files should reside in the `config/` folder.
* Get rid of duplicate unit tests.

## License
MIT, see [LICENSE](/LICENSE) file.
