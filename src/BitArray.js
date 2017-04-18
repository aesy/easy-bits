
class BitArray {

	array;

	constructor(size) {
		this.array = new Uint8Array(size);
	}

	/**
	 * Gets the length of this BitArray.
	 *
	 * @public
	 * @returns {Number} The length of this BitArray.
	 */
	get length() {
		// TODO
		return this.array.length;
	}

}

export default BitArray;
