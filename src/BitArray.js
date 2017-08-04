/**
 * A {@link BitSet} implementation with no limit due to bits being stored in an array. This implementation will never
 * throw out of bounds errors.
 *
 * @public
 * @class
 * @implements {BitSet}
 */
class BitArray {
	/**
	 * @private
	 * @member {Array<Boolean>}
	 */
	array;

	constructor(minLength) {
		this.array = [];
	}

	get length() {
		// TODO
		return this.array.length;
	}

	/**
	 * Gets a BitField copy of this BitArray instance.
	 *
	 * @public
	 * @throws Error if length >= 31, hence making a conversion impossible.
	 * @returns {BitField}
	 */
	toBitField() {
		throw new Error('Not yet implemented.');
	}
}

export default BitArray;
