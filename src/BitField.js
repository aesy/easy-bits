// Polyfills
import fill from 'core-js/library/fn/array/virtual/fill';
import repeat from 'core-js/library/fn/string/virtual/repeat';

import BitArray from './BitArray';
import { assertTrue, isInteger, withinRange } from './util';

// TODO make sure all methods work with minLength
// TODO allow 'value' to be another 'BitSet'

/**
 * A {@link BitSet} implementation limited to 31 bits due to bits being stored in a Number type. Operations on this instance
 * using a BitSet that exceeds this limit will result in undefined behaviour.
 *
 * @public
 * @class
 * @implements {BitSet}
 */
class BitField {
	/**
	 * The bitfields' current value.
	 *
	 * @private
	 * @member {Number}
	 */
	value = 0;

	/**
	 * The bitfields' minimum length.
	 * Example: a bitfield with a value of 110 (base 2) and a minimum length of 4 makes it so that the value is treated
	 * as 0110. Thus the flipAll method will yield 1001, instead of 001, which would be the result without pre-assigned
	 * length.
	 *
	 * @private
	 * @readonly
	 * @member {Number}
	 */
	minLength;

	/**
	 * @public
	 * @constructor
	 * @param {Number} [minLength = 0] The minimum length of the bitfield.
     * @throws {Error} In case length exceeds 31 (Consider using BitArray instead if u reach this limit).
	 * @see The property documention.
	 */
	constructor(minLength) {
		this.minLength = minLength || 0;

		if (this.minLength > 31) {
			throw new Error('BitField is limited to 31 flags.');
		}
	}

	/**
	 * Produces a new bitfield instance from an array. The array may contain anything, the resulting bitfield is based
	 * on the truthiness of the array contents.
	 * Example: [true, 0, {}] will yield 101.
	 *
	 * @public
	 * @static
	 * @param {Array<any>} array
	 * @returns {BitField} A new BitField instance.
	 */
	static fromArray(array) {
		let length = 0;

		const bitMask = array.reduce((prev, curr) => {
			length++;
			prev <<= 1;

			if (curr) {
				prev++;
			}

			return prev;
		}, 0);

		return new BitField(length).on(bitMask);
	}

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

	get length() {
		const length = BitField.lengthOf(this.value);

		if (this.minLength && this.minLength > length) {
			return this.minLength;
		}

		return length;
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

	intersects(bitset) {
		return (this.value & BitField.valueOf(bitset)) !== 0;
	}

	get(index) {
		assertTrue(isInteger(index), 'Illegal argument: parameter \'index\' is not an integer');
		assertTrue(withinRange(index, 0, 31), 'Illegal argument: parameter \'index\' is out of bounds');

		return (this.value >> index) & 1;
	}

	getRange(from, to) {
		assertTrue(isInteger(from), 'Illegal argument: parameter \'from\' is not an integer');
		assertTrue(isInteger(to), 'Illegal argument: parameter \'to\' is not an integer');
		assertTrue(withinRange(from, 0, 31), 'Illegal argument: parameter \'from\' is out of bounds');
		assertTrue(withinRange(to, 0, 31), 'Illegal argument: parameter \'to\' is out of bounds');

		const mask = (1 << (to - from)) - 1;
		const bitField = new BitField();
		bitField.on((this.value >> from) & mask);

		return bitField;
	}

	test(...masks) {
		const mask = BitField.combineMasks(...masks);

		return (this.value & mask) === mask;
	}

	testAny(...masks) {
		const mask = BitField.combineMasks(...masks);

		return (this.value & mask) !== 0;
	}

	testAt(value, index) {
		assertTrue(isInteger(index), 'Illegal argument: parameter \'index\' is not an integer');
		assertTrue(withinRange(index, 0, 31), 'Illegal argument: parameter \'index\' is out of bounds');

		const bit = this.get(index);

		return bit === Number(value);
	}

	testAll(value) {
		let mask = 0;

		if (value > 0) {
			mask = (value << this.length) - 1;
		}

		return this.value === mask;
	}

	on(...masks) {
		return this.set(1, ...masks);
	}

	off(...masks) {
		return this.set(0, ...masks);
	}

	set(value, ...masks) {
		const mask = BitField.combineMasks(...masks);

		if (value > 0) {
			this.value |= mask;
		} else {
			this.value &= ~mask;
		}

		return this;
	}

	setAll(value) {
		const mask = (1 << this.length) - 1;

		return this.set(value, mask);
	}

	setAt(value, index) {
		assertTrue(isInteger(index), 'Illegal argument: parameter \'index\' is not an integer');
		assertTrue(withinRange(index, 0, 31), 'Illegal argument: parameter \'index\' is out of bounds');

		const mask = 1 << index;

		return this.set(value, mask);
	}

	setRange(value, from, to) {
		assertTrue(isInteger(from), 'Illegal argument: parameter \'from\' is not an integer');
		assertTrue(isInteger(to), 'Illegal argument: parameter \'to\' is not an integer');
		assertTrue(withinRange(from, 0, 31), 'Illegal argument: parameter \'from\' is out of bounds');
		assertTrue(withinRange(to, 0, 31), 'Illegal argument: parameter \'to\' is out of bounds');

		const mask = (1 << (to - from)) - 1;

		return this.set(value, mask);
	}

	flip(...masks) {
		this.value ^= BitField.combineMasks(...masks);

		return this;
	}

	flipAll() {
		const mask = (1 << this.length) - 1;

		return this.flip(mask);
	}

	flipAt(index) {
		assertTrue(isInteger(index), 'Illegal argument: parameter \'index\' is not an integer');
		assertTrue(withinRange(index, 0, 31), 'Illegal argument: parameter \'index\' is out of bounds');

		const mask = 1 << index;

		return this.flip(mask);
	}

	flipRange(from, to) {
		assertTrue(isInteger(from), 'Illegal argument: parameter \'from\' is not an integer');
		assertTrue(isInteger(to), 'Illegal argument: parameter \'to\' is not an integer');
		assertTrue(withinRange(from, 0, 31), 'Illegal argument: parameter \'from\' is out of bounds');
		assertTrue(withinRange(to, 0, 31), 'Illegal argument: parameter \'to\' is out of bounds');

		const mask = (1 << (to - from)) - 1;

		return this.flip(mask);
	}

	copy(bitset) {
		this.value = BitField.valueOf(bitset);

		return this;
	}

	valueOf() {
		return this.value;
	}

	serialize() {
		let output = this.value.toString(2);

		if (this.minLength && this.minLength > output.length) {
			output = '0'::repeat(this.minLength - output.length) + output;
		}

		return output;
	}

	/**
	 * Deserializes a string and returns a new instance.
	 *
	 * @public
	 * @static
	 * @param {String} input
	 * @throws {Error} In case input could not be parsed.
	 * @returns {BitField} A new instance.
	 */
	static deserialize(input) {
		if (isNaN(input)) {
			throw new Error('Failed to deserialize input.');
		}

		const length = input.length;
		let value = parseInt(input, 2);
		const extension = length - value.toString().length;

		if (extension > 0) {
			value = '0'::repeat(extension) + value;
		}

		return new BitField(length).copy(value);
	}

	/**
	 * Produces a new BitField instance equal to this.
	 *
	 * @public
	 * @returns {BitField} A new BitField instance.
	 */
	clone() {
		return new BitField().copy(this);
	}

	equals(other) {
		return this.value === BitField.valueOf(other);
	}

	toArray() {
		let value = this.value;
		let length = 0;
		let array = [];

		while (value > 0) {
			length++;
			array.push(Boolean(value & 1));
			value >>= 1;
		}

		if (this.minLength) {
			const filler = new Array(this.minLength - (length || 1))::fill(false);
			array = array.concat(filler);
		}

		return array.reverse();
	}

	/**
	 * Gets a BitArray copy of this BitField instance.
	 *
	 * @public
	 * @returns {BitArray}
	 */
	toBitArray() {
		throw new Error('Not yet implemented.');
	}

	toString() {
		return `BitField(${this.serialize()})`;
	}
}

export default BitField;
