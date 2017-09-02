/**
 * @private
 * @class
 */
class EnumConstant {
	/**
	 * The name of this instance.
	 *
	 * @public
	 * @readonly
	 * @member {String}
	 */
	name;

	/**
	 * The ordinal value of this instance.
	 *
	 * @public
	 * @readonly
	 * @member {Number}
	 */
	ordinal;

	/**
	 * @public
	 * @constructor
	 * @param {String} name The name of the constant.
	 * @param {Number} ordinal The ordinal value of the constant.
	 */
	constructor(name, ordinal) {
		this.name = name;
		this.ordinal = ordinal;

		Object.freeze(this);
	}

	/**
	 * Gets a string representation of this EnumConstant instance.
	 *
	 * @public
	 * @returns {String} A string representation of this EnumConstant instance.
	 */
	toString() {
		return `EnumConstant(${this.name}:${this.valueOf()})`;
	}

	/**
	 * Gets the ordinal value of this constant.
	 *
	 * @public
	 * @returns {Number} The value.
	 */
	valueOf() {
		return this.ordinal;
	}

	/**
	 * Checks whether this BitField instance is equal to another constant. Two instances are considered equal
	 * if they both refer to the same instance.
	 *
	 * @public
	 * @param {EnumConstant} other The other constant to compare with.
	 * @returns {Boolean}
	 */
	equals(other) {
		return this === other;
	}
}

export default EnumConstant;
