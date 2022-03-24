/**
 * @typedef {BitSet|Number} BitSetLike
 */

/**
 * A data type to be used for bitwise operations.
 *
 * @typedef {BitSetLike} BitMask
 */

/**
 * A data structure that holds a sequence of bits and contains convenient methods for common bitwise operations.
 *
 * @interface BitSet
 */

/**
 * The index of the highest set bit plus one or the minimum set length, whichever is higher.
 *
 * @readonly
 * @member {Number}
 * @name BitSet#length
 */

/**
 * Gets the number of set bits (1's) in this bitset.
 * For the total number of bits, see BitSet#length.
 *
 * @function
 * @name BitSet#count
 * @returns {Number}
 */

/**
 * Intersects this bitset with one or more bitmasks, only affecting this instance.
 * Equivalent to a bitwise AND operation.
 *
 * @function
 * @name BitSet#intersect
 * @param {...BitMask} masks
 * @returns {this} This instance.
 */

/**
 * Checks whether this bitset intersects with one or more bitmasks. They intersect if any set bits in this bitset
 * are also set in any of the provided bitmasks.
 *
 * @function
 * @name BitSet#intersects
 * @param {...BitMask} masks
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
 * Tests whether all bits are set based on one or more bitmasks.
 * Only set bits in any of the provided bitmasks are tested.
 *
 * @function
 * @name BitSet#test
 * @param {...BitMask} masks
 * @returns {Boolean}
 */

/**
 * Tests whether any bits are set based on one or more bitmasks.
 * Only set bits in any of the provided bitmasks are tested.
 *
 * @function
 * @name BitSet#testAny
 * @param {...BitMask} masks
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
 * Tests whether all bits in this bitset has one specific value.
 *
 * @function
 * @name BitSet#testAll
 * @param {Bit} value
 * @returns {Boolean}
 */

/**
 * Sets bits to 1 based on one or more masks. Equivalent to a bitwise OR operation.
 * Only set bits in any of the provided bitmasks are affected.
 *
 * @function
 * @name BitSet#on
 * @param {...BitMask} masks
 * @returns {this} This instance.
 */

/**
 * Sets bits to 0 based on one or more masks. Equivalent to a bitwise AND NOT operation.
 * Only set bits in any of the provided bitmasks are affected.
 *
 * @function
 * @name BitSet#off
 * @param {...BitMask} masks
 * @returns {this} This instance.
 */

/**
 * Sets bits to a specific value based on one or more masks.
 * Only set bits in any of the provided bitmasks are affected.
 *
 * @function
 * @name BitSet#set
 * @param {Bit} value
 * @param {...BitMask} masks
 * @returns {this} This instance.
 */

/**
 * Sets all bits in this bitset to a specific value.
 *
 * @function
 * @name BitSet#setAll
 * @param {Bit} value
 * @returns {this} This instance.
 */

/**
 * Sets a bit at a specific index to a specific value.
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
 * Flips bits based on one or more masks. Equivalent to a bitwise XOR operation.
 * Only set bits in any of the provided bitmasks are affected.
 *
 * @function
 * @name BitSet#flip
 * @param {...BitMask} masks
 * @returns {this} This instance.
 */

/**
 * Flips all bits in this bitset.
 *
 * @function
 * @name BitSet#flipAll
 * @returns {this} This instance.
 */

/**
 * Flips a bit at a specific index.
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
 * Copies a bitsetlike value or instance. Minimum length is preserved.
 *
 * @function
 * @name BitSet#copy
 * @param {BitSetLike} bitset
 * @returns {this} This instance.
 */

/**
 * Gets the integer value of this bitset.
 *
 * @function
 * @name BitSet#valueOf
 * @returns {Number}
 */

/**
 * Serializes this bitset.
 *
 * @function
 * @name BitSet#serialize
 * @returns {String}
 */

/**
 * Produces a new bitset instance equal to this.
 *
 * @function
 * @name BitSet#clone
 * @returns {BitSet}
 */

/**
 * Checks whether this bitset is equal to another bitsetlike value or instance. They are equal if
 * if their set bits match up.
 *
 * @function
 * @name BitSet#equals
 * @param {BitSetLike} other
 * @returns {Boolean}
 */

/**
 * Gets an array containing all the bits in this bitset.
 *
 * @function
 * @name BitSet#toArray
 * @returns {Array<Boolean>}
 */

/**
 * Gets a string representation of this bitset.
 *
 * @function
 * @name BitSet#toString
 * @returns {String}
 */
