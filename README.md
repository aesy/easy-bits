<img align="left" width="80" height="80" src="./img/icon.svg">

# Easy Bits

[![npm][npm-image]][npm-url]
[![Build Status][github-actions-image]][github-actions-url]
[![Quality Status][code-climate-image]][code-climate-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Code Style][code-style-image]][code-style-url]
[![License][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/easy-bits?style=flat-square 
[npm-url]: https://www.npmjs.com/package/easy-bits

[github-actions-image]: https://img.shields.io/github/workflow/status/aesy/Easy-Bits/Continous%20Integration?style=flat-square
[github-actions-url]: https://github.com/aesy/Easy-Bits/actions

[code-climate-image]: https://img.shields.io/codeclimate/maintainability-percentage/aesy/Easy-Bits?style=flat-square
[code-climate-url]: https://codeclimate.com/github/aesy/Easy-Bits

[coveralls-image]: https://img.shields.io/coveralls/github/aesy/Easy-Bits?style=flat-square
[coveralls-url]: https://coveralls.io/github/aesy/Easy-Bits?branch=master

[code-style-image]: https://img.shields.io/badge/code%20style-%20XO-67d5c5?style=flat-square
[code-style-url]: https://github.com/sindresorhus/xo 

[license-image]: https://img.shields.io/github/license/aesy/Easy-Bits?style=flat-square
[license-url]: https://github.com/aesy/Easy-Bits/blob/master/LICENSE

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

const configuration: BitSet<FontStyle> = new BitField<FontStyle>();
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
Easy-Bits uses polyfills that doesn't pollute the global namespace in order to support the following environments:

| Environment       | Supported Version   |
| ----------------- | -------------------:|
| Node              |            8 and up |
| Chrome            |           26 and up |
| Firefox           |            4 and up |
| Edge              |           13 and up |
| Internet Explorer |           10 and up |
| Safari            |            7 and up |

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
