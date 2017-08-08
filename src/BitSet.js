/**
 * @typedef {BitSet|Number} BitSetLike
 */

/**
 * A BitSet holds a sequence of bits and contains convenient methods for common bit operations.
 *
 * @interface BitSet
 */

/**
 * @member {Number}
 * @name BitSet#length
 */

/**
 * Gets the current amount of '1's.
 *
 * @function
 * @name BitSet#count
 * @returns {Number}
 */

/**
 * Checks whether this instance intersects with another bitsetlike value or instance.
 *
 * @function
 * @name BitSet#intersects
 * @param {BitSetLike} bitset The bitset to compare with.
 * @returns {Boolean}
 */

/**
 * Gets the bit at a specific index.
 * Example: 001 at index 0 yields 1.
 *
 * @function
 * @name BitSet#get
 * @param {Number} index
 * @returns {Boolean}
 */

/**
 * Gets the bits within a specific index range.
 * Example: 011 from 0 to 2 yields 11.
 *
 * @function
 * @name BitSet#getRange
 * @param {Number} from The inclusive lower bounds of the range.
 * @param {Number} to The exclusive upper bounds of the range.
 * @returns {BitSet} The Resulting BitSet.
 */

/**
 * Tests whether one or more bits are on.
 *
 * @function
 * @name BitSet#test
 * @param {...BitSetLike} masks
 * @returns {Boolean}
 */

/**
 * Tests whether any of one or more bits are on.
 *
 * @function
 * @name BitSet#testAny
 * @param {...BitSetLike} masks
 * @returns {Boolean}
 */

/**
 * Tests whether a bit at a specific index is equal to a specific value.
 *
 * @function
 * @name BitSet#testAt
 * @param {Bit} value
 * @param {Number} index Starting at 0, from the rightmost bit.
 * @throws {Error} In case 'index' is not an integer or out of bounds.
 * @returns {Boolean}
 */

/**
 * Tests whether all bits in this instance has a specific value.
 *
 * @function
 * @name BitSet#testAll
 * @param {Bit} value
 * @returns {Boolean}
 */

/**
 * Sets bits to 1 based on one or more masks.
 *
 * @function
 * @name BitSet#on
 * @param {...BitSetLike} masks
 * @returns {this} This instance.
 */

/**
 * Sets bits to 0 based on one or more masks.
 *
 * @function
 * @name BitSet#off
 * @param {...BitSetLike} masks
 * @returns {this} This instance.
 */

/**
 * Sets bits to a specific value based on one or more masks.
 *
 * @function
 * @name BitSet#set
 * @param {Bit} value
 * @param {...BitSetLike} masks
 * @returns {this} This instance.
 */

/**
 * Sets all bits to a specific value.
 *
 * @function
 * @name BitSet#setAll
 * @param {Bit} value
 * @returns {this} This instance.
 */

/**
 * Sets one bit at a specific index to a specific value.
 *
 * @function
 * @name BitSet#setAt
 * @param {Bit} value
 * @param {Number} index Starting at 0, from the rightmost bit.
 * @throws {Error} In case 'index' is not an integer or out of bounds.
 * @returns {this} This instance.
 */

/**
 * Sets all bits within a specific range to a specific value.
 *
 * @function
 * @name BitSet#setRange
 * @param value {Bit} value
 * @param {Number} from Starting index, from the rightmost bit.
 * @param {Number} to The exclusive ending index.
 * @returns {this} This instance.
 */

/**
 * Flips bits based on one or more masks.
 *
 * @function
 * @name BitSet#flip
 * @param {...BitSetLike} masks
 * @returns {this} This instance.
 */

/**
 * Flips all bits.
 *
 * @function
 * @name BitSet#flipAll
 * @returns {this} This instance.
 */

/**
 * Flips bits at a specific index.
 *
 * @function
 * @name BitSet#flipAt
 * @param {Number} index Starting at 0, from the rightmost bit.
 * @throws {Error} In case 'index' is not an integer or out of bounds.
 * @returns {this} This instance.
 */

/**
 * Flips all bits within a specific range.
 *
 * @function
 * @name BitSet#flipRange
 * @param {Number} from Starting index, from the rightmost bit.
 * @param {Number} to The exclusive ending index.
 * @returns {this} This instance.
 */

/**
 * Copies a bitsetlike value or instance. Minimum length will be preserved.
 *
 * @function
 * @name BitSet#copy
 * @param {BitSetLike} bitset
 * @returns {this} This instance.
 */

/**
 * Gets the integer value of this bitsetlike value or instance.
 *
 * @function
 * @name BitSet#valueOf
 * @returns {Number}
 */

/**
 * Serializes this instance.
 *
 * @function
 * @name BitSet#serialize
 * @returns {String}
 */

/**
 * Checks whether this instance is equal to another bitsetlike value or instance.
 *
 * @function
 * @name BitSet#equals
 * @param {BitSetLike} other
 * @returns {Boolean}
 */

/**
 * Gets an array containing all the bits in this instance.
 *
 * @function
 * @name BitSet#toArray
 * @returns {Array<Boolean>}
 */

/**
 * Gets a string representation of this instance.
 *
 * @function
 * @name BitSet#toString
 * @returns {String}
 */
