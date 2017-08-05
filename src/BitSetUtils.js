/**
 * @typedef {BitSet|Number} BitSetLike
 */

/**
 * @private
 * @class
 * @abstract
 */
class BitSetUtils {
	/**
	 * Gets the integer value of a bitsetlike value or instance.
	 *
	 * @private
	 * @static
	 * @param {BitSetLike} value
	 * @returns {Number} The value.
	 */
	static valueOf(value) {
		if (typeof value === 'object') {
			return value.valueOf();
		}

		return value;
	}

	/**
	 * Gets the length of a bitsetlike value or instance.
	 *
	 * @private
	 * @static
	 * @param {BitSetLike} value
	 * @returns {Number} The length. Is never less than 1.
	 */
	static lengthOf(value) {
		if (typeof value === 'object') {
			return value.length;
		}

		let count = 0;

		while (value > 0) {
			count++;
			value >>= 1;
		}

		if (count > 0) {
			return count;
		}

		return 1;
	}

	/**
	 * Combines masks. This is equivalent to a OR operation.
	 *
	 * @private
	 * @static
	 * @param {...BitSetLike} masks The masks to combine.
	 * @returns {Number} The resulting mask.
	 */
	static combineMasks(...masks) {
		return masks.reduce((prev, curr) =>
			prev | curr
		);
	}
}

export default BitSetUtils;
