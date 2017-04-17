// Polyfills
import freeze from 'core-js/library/fn/object/freeze';
import defineProperty from 'core-js/library/fn/object/define-property';

import BitArray from './BitArray';
import BitField from './BitField';
import EnumBase from './EnumBase';
import EnumConstant from './EnumConstant';

/**
 * @public
 * @class
 */
class BitFlags extends EnumBase {

	/**
	 * @public
	 * @readonly
	 * @field
	 * @type {EnumConstant}
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

		for (const flag of constants) {
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

	/**
	 * Gets a string representation of this BitFlags instance.
	 *
	 * @public
	 * @returns {String} A string representation of this BitFlags instance.
	 */
	toString() {
		return `BitFlags(length:${this.length})`;
	}

}

export default BitFlags;
