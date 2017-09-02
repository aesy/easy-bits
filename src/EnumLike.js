/**
 * An object with enum-like properties.
 *
 * @private
 * @interface EnumLike
 * @extends {Iterable}
 */

/**
 * @readonly
 * @member {Number}
 * @name EnumLike#length
 */

/**
 * Iterates through this instances' values with a callback method.
 *
 * @function
 * @name EnumLike#forEach
 * @param {EnumLikeIteratorCallback} callback
 * @see EnumLikeIteratorCallback
 */

/**
 * Callback used in EnumLike#forEach.
 *
 * @callback EnumLikeIteratorCallback
 * @param {EnumConstant} value
 * @param {String} name
 * @param {EnumLike} instance
 * @see EnumLike#forEach
 */

/**
 * Gets the values/constants of this instance.
 *
 * @function
 * @name EnumLike#values
 * @returns {Array<EnumConstant>} The values/constants of this instance.
 */

/**
 * Checks whether a value belongs to this instance.
 *
 * @function
 * @name EnumLike#has
 * @param {EnumConstant} value
 * @returns {Boolean}
 */

/**
 * Serializes this instance.
 *
 * @function
 * @name EnumLike#serialize
 * @returns {String}
 */

/**
 * Gets a string representation of this instance.
 *
 * @function
 * @name EnumLike#toString
 * @returns {String} A string representation of this instance.
 */
