// Polyfills
import Symbol from 'core-js/library/es6/symbol';
import includes from 'core-js/library/fn/array/virtual/includes';
import defineProperty from 'core-js/library/fn/object/define-property';
import values from 'core-js/library/fn/object/values';

/**
 * The base class for Enum and BitFlags.
 *
 * @private
 * @abstract
 * @class
 */
class EnumBase {
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
	 */
	constructor() {
		Object::defineProperty(this, 'length', {
			value: 0,
			writable: true,
			enumerable: false
		});
	}

	/**
	 * Callback used in EnumBase#forEach.
	 *
	 * @callback EnumBaseCallback
	 * @param {EnumConstant} value
	 * @param {String} name
	 * @param {EnumBase} instance
	 * @see EnumBase#forEach
	 */

	/**
	 * Iterates through this instances' values with a callback method.
	 *
	 * @public
	 * @param {EnumBaseCallback} callback
	 * @see EnumBaseCallback
	 */
	forEach(callback) {
		this.values().forEach(value => {
			callback(value, value.name, this);
		});
	}

	/**
	 * Gets the values/constants of this instance.
	 *
	 * @public
	 * @returns {Array<EnumConstant>} The values/constants of this Enum-like instance.
	 */
	values() {
		return Object::values(this)
			.sort((a, b) => a.ordinal - b.ordinal);
	}

	/**
	 * Checks whether a value belongs to this Enum-like instance.
	 *
	 * @public
	 * @param {EnumConstant} value
	 * @returns {Boolean}
	 */
	has(value) {
		return this.values()::includes(value);
	}

	/**
	 * Serializes this instance.
	 *
	 * @public
	 * @returns {String}
	 */
	serialize() {
		return this.values()
			.map(constant => constant.name)
			.toString();
	}

	/**
	 * Deserializes a string and returns a new instance.
	 *
	 * @public
	 * @static
	 * @param {String} input
	 * @throws {Error} In case input could not be parsed.
	 * @returns {EnumBase} A new instance.
	 */
	static deserialize(input) {
		if (typeof input !== 'string') {
			throw new Error('Failed to deserialize input.');
		}

		const values = input.split(',').map(value => value.trim());

		if (values::includes('')) {
			throw new Error('Failed to deserialize input. Invalid enum <<empty>> found.');
		}

		return new this(...values);
	}

	/**
	 * Iterates through this Enum-like instances' value/constants.
	 *
	 * @public
	 * @returns {Iterator}
	 */
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
	 * Checks whether a value/constant belongs to this Enum-like instance. This is equivalent to EnumBase#has.
	 *
	 * @public
	 * @param {EnumConstant} value
	 * @returns {Boolean}
	 */
	[Symbol.hasInstance](value) {
		return this.has(value);
	}

	/**
	 * Gets a string representation of this instance.
	 *
	 * @public
	 * @abstract
	 * @returns {String} A string representation of this instance.
	 */
	toString() {}
}

export default EnumBase;
