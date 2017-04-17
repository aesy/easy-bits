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
	 * The amount of values/constants in this Enum-like instance.
	 *
	 * @public
	 * @readonly
	 * @field
	 * @type {Number}
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
	 * Produces a new Enum-like instance from an array.
	 *
	 * @public
	 * @static
	 * @param {Array<String>} array The array of string constants to base the new instance on.
	 * @returns {EnumBase} A new instance.
	 */
	static fromArray(array) {
		return new this(...array);
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
	 * @returns {EnumConstant} The values/constants of this Enum-like instance.
	 */
	values() {
		return Object::values(this);
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
		// TODO value ordering has to be guaranteed
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
			throw new Error("Failed to deserialize input");
		}

		return new this(...input.split(','));
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
					done: index <= arr.length
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

}

export default EnumBase;
