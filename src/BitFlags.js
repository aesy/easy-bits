import BitArray from './BitArray';
import BitField from './BitField';
import EnumConstant from './EnumConstant';

/**
 * A BitFlags instance consists of a set of predefined values, each representing a binary digit that acts as a flag
 * to enable or disable bits in a BitSet. These values are accessible directly on the instance.
 *
 * A NONE property is always available on the instance.
 *
 * @public
 * @class
 * @implements {EnumLike}
 */
class BitFlags {
	/**
	 * @public
	 * @readonly
	 * @member {EnumConstant}
	 */
	NONE;

	/**
	 * The amount of values/constants in this instance, not including 'NONE'.
	 *
	 * @public
	 * @readonly
	 * @member {Number}
	 */
	length;

	/**
	 * @public
	 * @constructor
	 * @param {...String} [constants]
	 */
	constructor(...constants) {
		const flags = {};
		let bitValue = 1;
		let length = 0;

		for (const flag of constants) {
			flags[flag] = new EnumConstant(flag, bitValue);

			Object.defineProperty(this, flag, {
				enumerable: true,
				get() {
					return flags[flag];
				}
			});

			bitValue <<= 1;
			length++;
		}

		Object.defineProperty(this, 'NONE', {
			value: new EnumConstant('NONE', 0),
			enumerable: false
		});

		Object.defineProperty(this, 'length', {
			value: length,
			writable: false,
			enumerable: false
		});

		Object.freeze(this);
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
	 * Deserializes a string and returns a new instance.
	 *
	 * @public
	 * @static
	 * @param {String} input
	 * @throws {Error} In case input could not be parsed.
	 * @returns {BitFlags} A new instance.
	 */
	static deserialize(input) {
		if (typeof input !== 'string') {
			throw new Error('Failed to deserialize input');
		}

		const values = input.split(',').map(value => value.trim());

		if (values.includes('')) {
			throw new Error('Failed to deserialize input - invalid enum <<empty>> found');
		}

		return new BitFlags(...values);
	}

	forEach(callback) {
		this.values().forEach(value => {
			callback(value, value.name, this);
		});
	}

	values() {
		return Object.values(this)
			.sort((a, b) => a.ordinal - b.ordinal);
	}

	has(value) {
		return this.values().includes(value);
	}

	serialize() {
		return this.values()
			.map(constant => constant.name)
			.toString();
	}

	[Symbol.iterator]() {
		const arr = this.values();
		let index = 0;

		return {
			next() {
				const value = arr[index];
				index++;

				return {
					value,
					done: index > arr.length
				};
			}
		};
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
