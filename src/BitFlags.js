// Polyfills
import iterator from 'core-js/library/fn/array/virtual/iterator';
import freeze from 'core-js/library/fn/object/freeze';
import defineProperty from 'core-js/library/fn/object/define-property';

import BitArray from './BitArray';
import BitField from './BitField';
import EnumBase from './EnumBase';
import EnumConstant from './EnumConstant';

/**
 * A BitFlags instance consists of a set of predefined values, each representing a binary digit that acts as a flag
 * to enable or disable bits in a BitSet. These values are accessible directly on the instance.
 *
 * A NONE property is always available on the instance.
 *
 * @public
 * @class
 */
class BitFlags extends EnumBase {
	/**
	 * @public
	 * @readonly
	 * @member {EnumConstant}
	 */
	NONE;

	/**
	 * @public
	 * @constructor
	 * @param {...String} [constants]
	 */
	constructor(...constants) {
		super();

		const flags = {};
		let bitValue = 1;

		for (const flag of constants::iterator()) {
			flags[flag] = new EnumConstant(flag, bitValue);

			Object::defineProperty(this, flag, {
				enumerable: true,
				get() {
					return flags[flag];
				}
			});

			bitValue <<= 1;
			this.length++;
		}

		Object::defineProperty(this, 'NONE', {
			value: new EnumConstant('NONE', 0),
			enumerable: false
		});

		Object::freeze(this);
	}

	/**
	 * Produces a new instance from an array.
	 *
	 * @public
	 * @static
	 * @param {Array<String>} array
	 * @returns {BitFlags} A new instance.
	 */
	static fromArray(array) {
		return new this(...array);
	}

	/**
	 * Produces a BitField instance with a length based on the amount of constants in this BitFlags instance.
	 *
	 * @public
	 * @returns {BitField} A new instance.
	 */
	createBitField() {
		return new BitField(this.length);
	}

	/**
	 * Produces a BitArray instance with a length based on the amount of constants in this BitFlags instance.
	 *
	 * @public
	 * @returns {BitArray} A new instance.
	 */
	createBitArray() {
		return new BitArray(this.length);
	}

	toString() {
		return `BitFlags(length:${this.length})`;
	}
}

export default BitFlags;
