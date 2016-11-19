
/**
 * Class representing a bit field
 * Limited to 31 bits
 */
class BitField {

	/**
	 * @constructor
	 */
	constructor(length) {
		/**
		 * @field
		 * @public
		 */
		this.value = 0;
		/**
		 * @field
		 * @private
		 */
		this.maxLength = length;
	}

	/**
	 * @public
	 * @static
	 * @param {Array} array
	 * @return {BitField}
	 */
	static fromArray(array) {
		let length = 0;

		const bitMask = array.reduce((prev, curr) => {
			length++;
			// if (!first) {}
			prev <<= 1;

			if (curr) {
				prev++;
			}

			return prev;
		}, 0);

		const bitField = new BitField(length || 1);
		bitField.on(bitMask);

		return bitField;
	}

	/**
	 * @public
	 * @static
	 * @param {BitField} bitField
	 * @return {BitField}
	 */
	static copy(bitField) {
		return bitField.clone();
	}

	/**
	 * @private
	 * @static
	 * @param {(BitField | Number)} bitField
	 * @return {Number}
	 */
	static valueOf(bitField) {
		if (typeof bitField === 'object') {
			return bitField.value;
		}

		return bitField;
	}

	valueOf() {
		return this.value;
	}

	/**
	 * Produces a new BitField instance equal to this
	 * @public
	 * @return {BitField}
	 */
	clone() {
		return new BitField(this.value);
	}

	/**
	 * Returns a string representation of this BitField instance
	 * @public
	 * @return {String}
	 */
	toString() {
		return `BitField(${this.value.toString(2)})`;
	}

	/**
	 * Returns an array containing all the bits in this BitField instance
	 * @public
	 * @return {Array<Number>}
	 */
	toArray() {
		let value = this.value;
		let length = 0;
		let array = [];

		while (value > 0) {
			length++;
			array.push(value & 1);
			value >>= 1;
		}

		if (this.maxLength) {
			const filler = new Array(this.maxLength - (length || 1)).fill(0);
			array = array.concat(filler);
		}

		return array.reverse();
	}

	equals(bitField) {
		return this.value === BitField.valueOf(bitField);
	}

	get length() {
		if (this.maxLength) {
			return this.maxLength;
		}

		let value = this.value;
		let count = 0;

		while (value > 0) {
			count++;
			value >>= 1;
		}

		return count;
	}

	count() {
		let value = this.value;
		let count = 0;

		while (value > 0) {
			if (value & 1) {
				count++;
			}

			value >>= 1;
		}

		return count;
	}

	intersects(bitField) {
		return (this.value & BitField.valueOf(bitField)) !== 0;
	}

	get(index) {
		return (this.value >> index) & 1;
	}

	getRange(from, to) {
		const mask = (1 << (to - from)) - 1;
		const bitField = new BitField();
		bitField.on((this.value >> from) & mask);

		return bitField;
	}

	test(...masks) {
		const mask = masks.reduce((prev, curr) =>
			prev | curr
		);

		return (this.value & mask) === mask;
	}

	testAny(...masks) {
		const mask = masks.reduce((prev, curr) =>
			prev | curr
		);

		return (this.value & mask) !== 0;
	}

	testAt(value, position) {
		const bit = this.get(position);

		return bit === value;
	}

	testAll(value) {
		// TODO
		//if (this.length !== new BitField().on(value).length) {
		//	return false;
		//}

		return this.value === value;
	}

	on(...masks) {
		return this.set(1, ...masks);
	}

	off(...masks) {
		return this.set(0, ...masks);
	}

	toggle(...masks) {
		return this.flip(...masks);
	}

	// equivalent to a and operation
	set(value, ...masks) {
		const mask = masks.reduce((prev, curr) =>
			prev | curr
		);

		if (value) {
			this.value |= mask;
		} else {
			// TODO
			// masks[0] = ~masks[0];
			//
			// this.value &= masks.reduce((prev, curr) =>
			// 	prev & ~curr
			// );
		}

		return this;
	}

	setAll(value) {
		const mask = (1 << this.length()) - 1;

		return this.set(value, mask);
	}

	setAt(value, position) {
		const mask = 1 << position;

		return this.set(value, mask);
	}

	setRange(value, from, to) {
		const mask = (1 << (to - from)) - 1;

		return this.set(value, mask);
	}

	// equivalent to a xor operation
	flip(...masks) {
		this.value ^= masks.reduce((prev, curr) =>
			prev | curr
		);

		return this;
	}

	flipAll() {
		const mask = (1 << this.length) - 1;

		return this.flip(mask);
	}

	flipAt(position) {
		const mask = 1 << position;

		return this.flip(mask);
	}

	flipRange(from, to) {
		const mask = (1 << (to - from)) - 1;

		return this.flip(mask);
	}
}

export default BitField;
