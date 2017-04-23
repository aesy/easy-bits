# Easy Bits

[![Travis](https://img.shields.io/travis/easyfuckingpeasy/Easy-Bits.svg)](https://travis-ci.org/easyfuckingpeasy/Easy-Bits)
[![bitHound Overall Score](https://www.bithound.io/github/easyfuckingpeasy/Easy-Bits/badges/score.svg)](https://www.bithound.io/github/easyfuckingpeasy/Easy-Bits)
[![Coverage Status](https://coveralls.io/repos/github/easyfuckingpeasy/Easy-Bits/badge.svg?branch=master)](https://coveralls.io/github/easyfuckingpeasy/Easy-Bits?branch=master)
[![xo code style](https://img.shields.io/badge/code%20style-%20XO-67d5c5.svg)](https://github.com/sindresorhus/xo)
[![MIT license](https://img.shields.io/github/license/easyfuckingpeasy/Easy-Bits.svg)](https://github.com/easyfuckingpeasy/Easy-Bits/blob/master/LICENSE)

Easy to use Enums, BitFlags, BitFields, BitMasks and BitArrays for JavaScript.

## Usage
#### BitFlags + BitField:
```js
const options = new BitFlags('OPTION1', 'OPTION2', 'OPTION3');
const configuration = options.createBitField();

configuration.on(options.OPTION1 | options.OPTION3); // Set option1 & option3 bits to true
configuration.on(options.OPTION1, options.OPTION3);  // Same as the above

configuration.test(options.OPTION1); // true
configuration.test(options.OPTION2); // false
configuration.test(options.OPTION2); // true
configuration.testAny(options.OPTION1 | options.OPTION2); // true
configuration.testAll(options.OPTION1 | options.OPTION2); // false

// Serialize
const string = configuration.serialize();
// Deserialize
const config2 = configuration.deserialize(string);
```
BitFields and BitArray are interchangeable, their APIs are identical (excluding conversion methods like 
`BitArray#toBitField`). The only difference between them is how many flags they support (BitField is limited to 31 
flags). This is due to how they internally store the data.

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
Day.MONDAY = 42;
console.log(Day.MY_OWN_DAY); // undefined
console.log(Day.MONDAY);     // EnumConstant('MONDAY':0)

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
console.log(Day.MONDAY instanceof Day);         // true
console.log(Day.MONDAY === OtherEnum.CONSTANT); // false
console.log(Day.MONDAY == OtherEnum.CONSTANT);  // true, if their ordinal values are the same
```

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
configuration.off(OtherEnum.CONSTANT); // ERROR: argument type OtherEnum is not assignable to parameter type FontStyle
```

## API Reference
See the JSDoc comments in the source files.

## Installation
From npm: run `npm install easy-bits --save` (as soon as it is published)

From source: download `easy-bits.min.js` in the `dist` folder

#### and then import
ES6 style: `import { Enum } from 'easy-bits';`

or link in HTML: `<script src="easy-bits.min.js"></script>`

## Support
This library uses polyfills that doesn't pollute the global namespace. It has not been thoroughly tested in various 
environments. However, these are the environments that is targetted to work:

`Chrome 26+` `Firefox 4+` `Safari 5+` `Opera 12+` `Internet Explorer 8+` `Edge` `NodeJS 1+`

## Contribute
Use the issue tracker to report bugs or add feature requests. Pull requests are more than welcome, just make sure 
compiliation still works (`npm run build:prod`), linting pass without errors (`npm run lint`) and all tests still pass 
(`npm run test`) beforehand. Check the list of issues below if you want to contribute but don't know where to start!

## Issues
* No API reference. This should be auto-generated from the JSDoc comments in the source.
* No performance tests.
* No thorough environment tests.
* Accessing nonexistant EnumConstant properties does not throw an error. This is possible to solve with 
[Proxies](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
but a polyfill for that would make lookups slow {{citation needed}}.
* No auto-completion for Enum/BitFlag constants.
* EnumConstants should interpolate as a string. For example, this fails:
```js
const constant = new EnumConstant('name', 42);
expect('' + constant + '').to.equal(constant.toString()); // Expected: 'EnumConstant(name:42)', Actual: '42'
expect(`${constant}`).to.equal(constant.toString());      // Expected: 'EnumConstant(name:42)', Actual: '42'
```

## License
MIT, see [LICENSE](/LICENSE) file.
