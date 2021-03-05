import EnumConstant from './EnumConstant';

/**
 * An Enum consists of a set of prefedined constants. These constants are accessible directly on the instance.
 *
 * @public
 * @class
 * @implements {EnumLike}
 */
class Enum {
	/**
	 * The amount of values/constants in this instance.
	 *
	 * @public
	 * @readonly
	 * @member {Number}
	 */
	length;

	/**
	 * @public
	 * @constructor
	 * @param {...String} constants
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

			bitValue++;
			length++;
		}

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
	 * @returns {Enum} A new instance.
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
	 * @returns {Enum} A new instance.
	 */
	static deserialize(input) {
		if (typeof input !== 'string') {
			throw new Error('Failed to deserialize input');
		}

		const values = input.split(',').map(value => value.trim());

		if (values.includes('')) {
			throw new Error('Failed to deserialize input - invalid enum <<empty>> found');
		}

		return new Enum(...values);
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

	toString() {
		return `Enum(length:${this.length})`;
	}
}

export default Enum;
