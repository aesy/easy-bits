import { assertTrue, isInteger } from './util';

/**
 * A {@link BitSet} implementation with no limit due to bits being stored in an array. Also known as bit set, bit map
 * or bit vector. This implementation will never throw out of bounds errors.
 *
 * @public
 * @class
 * @implements {BitSet}
 */
class BitArray {
	/**
	 * An array containing each bit as a boolean value, starting from the rightmost bit.
	 *
	 * @private
	 * @member {Array<Boolean>}
	 */
	value;

	/**
	 * @public
	 * @constructor
	 * @param {Number} [minLength = 1] The minimum length of the bitArray.
	 * @throws {Error} In case 'minLength' is equals to or smaller than zero.
	 */
	constructor(minLength) {
		assertTrue(minLength === undefined || minLength > 0,
			'Illegal argument: parameter \'minLength\' must be larger than 0');

		minLength = minLength || 1;

		this.value = [];

		for (let i = 0; i < minLength; i++) {
			this.value.push(false);
		}
	}

	/**
	 * Combines masks. This is equivalent to a OR operation.
	 *
	 * @private
	 * @static
	 * @param {...BitMask} masks The masks to combine.
	 * @returns {BitArray} The resulting mask.
	 */
	static combineMasks(...masks) {
		const bitArray = new BitArray();
		const tempArray = new BitArray();

		for (const mask of masks) {
			tempArray.copy(mask);

			for (let i = 0; i < tempArray.length; i++) {
				const oldBit = bitArray.get(i);
				const newBit = tempArray.get(i);
				bitArray.setAt(oldBit || newBit, i);
			}
		}

		return bitArray;
	}

	/**
	 * Produces a new BitArray instance from a value. The value may contain anything, the resulting bitArray is based
	 * on the truthiness of the value contents.
	 * Example: [true, 0, {}] will yield 101.
	 *
	 * @public
	 * @static
	 * @param {Array<*>} array
	 * @returns {BitArray} A new BitArray instance.
	 */
	static fromArray(array) {
		const bitArray = new BitArray();

		bitArray.value = array.slice(0).reverse().map(Boolean);

		return bitArray;
	}

	get length() {
		return this.value.length;
	}

	count() {
		return this.value.filter(value => value).length;
	}

	intersect(...masks) {
		const bitArray = BitArray.combineMasks(...masks);
		const length = Math.max(bitArray.length, this.length);

		for (let i = 0; i < length; i++) {
			const thisBit = this.get(i);
			const otherBit = bitArray.get(i);

			this.setAt(thisBit && otherBit, i);
		}

		return this;
	}

	intersects(...masks) {
		const bitArray = BitArray.combineMasks(...masks);
		const length = Math.max(bitArray.length, this.length);

		for (let i = 0; i < length; i++) {
			const thisBit = this.get(i);
			const otherBit = bitArray.get(i);

			if (thisBit && otherBit) {
				return true;
			}
		}

		return false;
	}

	get(index) {
		assertTrue(isInteger(index), 'Illegal argument: parameter \'index\' is not an integer');

		return this.value[index] || false;
	}

	getRange(from, to) {
		assertTrue(isInteger(from), 'Illegal argument: parameter \'from\' is not an integer');
		assertTrue(isInteger(to), 'Illegal argument: parameter \'to\' is not an integer');
		assertTrue(to > from, 'Illegal argument: parameter \'to\' must be larger than parameter \'from\'');

		const length = to - from;
		const bitArray = new BitArray();
		bitArray.value = this.value.slice(from, to);

		while (bitArray.length < length) {
			bitArray.value.push(false);
		}

		return bitArray;
	}

	test(...masks) {
		const mask = BitArray.combineMasks(...masks);

		for (let i = 0; i < mask.length; i++) {
			const bit = mask.get(i);

			if (bit && !this.get(i)) {
				return false;
			}
		}

		return true;
	}

	testAny(...masks) {
		const mask = BitArray.combineMasks(...masks);

		for (let i = 0; i < mask.length; i++) {
			const bit = mask.get(i);

			if (bit && this.get(i)) {
				return true;
			}
		}

		return false;
	}

	testAt(value, index) {
		assertTrue(isInteger(index), 'Illegal argument: parameter \'index\' is not an integer');

		if (index > this.length) {
			return Boolean(value) === false;
		}

		return Boolean(value) === this.get(index);
	}

	testAll(value) {
		value = Boolean(value);

		return this.value.every(element => element === value);
	}

	on(...masks) {
		return this.set(1, ...masks);
	}

	off(...masks) {
		return this.set(0, ...masks);
	}

	set(value, ...masks) {
		const mask = BitArray.combineMasks(...masks);

		for (let i = 0; i < mask.length; i++) {
			const bit = mask.get(i);

			if (bit) {
				this.setAt(value, i);
			}
		}

		return this;
	}

	setAll(value) {
		this.value.fill(Boolean(value));

		return this;
	}

	setAt(value, index) {
		assertTrue(isInteger(index), 'Illegal argument: parameter \'index\' is not an integer');

		while (index >= this.length) {
			this.value.push(false);
		}

		this.value[index] = Boolean(value);

		return this;
	}

	setRange(value, from, to) {
		assertTrue(isInteger(from), 'Illegal argument: parameter \'from\' is not an integer');
		assertTrue(isInteger(to), 'Illegal argument: parameter \'to\' is not an integer');
		assertTrue(to > from, 'Illegal argument: parameter \'to\' must be larger than parameter \'from\'');

		for (let i = from; i < to; i++) {
			this.setAt(value, i);
		}

		return this;
	}

	flip(...masks) {
		const mask = BitArray.combineMasks(...masks);

		for (let i = 0; i < mask.length; i++) {
			const bit = mask.get(i);

			if (bit) {
				this.flipAt(i);
			}
		}

		return this;
	}

	flipAll() {
		for (let i = 0; i < this.length; i++) {
			this.flipAt(i);
		}

		return this;
	}

	flipAt(index) {
		assertTrue(isInteger(index), 'Illegal argument: parameter \'index\' is not an integer');

		while (index >= this.length) {
			this.value.push(false);
		}

		this.setAt(!this.get(index), index);

		return this;
	}

	flipRange(from, to) {
		assertTrue(isInteger(from), 'Illegal argument: parameter \'from\' is not an integer');
		assertTrue(isInteger(to), 'Illegal argument: parameter \'to\' is not an integer');
		assertTrue(to > from, 'Illegal argument: parameter \'to\' must be larger than parameter \'from\'');

		for (let i = from; i < to; i++) {
			this.flipAt(i);
		}

		return this;
	}

	copy(bitset) {
		this.value.fill(false);

		if (bitset instanceof Object) {
			const array = bitset.toArray().reverse();
			this.value.splice(0, array.count, ...array);
		} else {
			let index = 0;

			while (bitset > 0) {
				this.setAt(bitset & 1, index);
				bitset >>= 1;
				index++;
			}
		}

		return this;
	}

	/**
	 * Gets the integer value of this instance.
	 *
	 * @public
	 * @throws {Error} In case this instance cannot be represented by an integer (by exceeding 31 bits).
	 * @returns {Number}
	 */
	valueOf() {
		if (this.length > 31) {
			throw new Error('Number exceeds 31 bits');
		}

		return this.toArray().reduce((prev, curr) => {
			prev <<= 1;

			if (curr) {
				prev++;
			}

			return prev;
		}, 0);
	}

	serialize() {
		return this.toArray().map(Number).join('');
	}

	/**
	 * Deserializes a string and returns a new instance.
	 *
	 * @public
	 * @static
	 * @param {String} input
	 * @throws {Error} In case input could not be parsed.
	 * @returns {BitArray} A new instance.
	 */
	static deserialize(input) {
		const array = input.split('');

		if (array.some(isNaN)) {
			throw new Error('Failed to deserialize input');
		}

		return BitArray.fromArray(array.map(Number));
	}

	/**
	 * Produces a new BitArray instance equal to this.
	 *
	 * @public
	 * @returns {BitArray} A new BitArray instance.
	 */
	clone() {
		return new BitArray().copy(this);
	}

	equals(other) {
		const bitArray = new BitArray().copy(other);
		const length = Math.max(this.length, bitArray.length);

		for (let i = 0; i < length; i++) {
			if (this.get(i) !== bitArray.get(i)) {
				return false;
			}
		}

		return true;
	}

	toArray() {
		return this.value.slice(0).reverse();
	}

	toString() {
		return `BitArray(${this.serialize()})`;
	}
}

export default BitArray;
