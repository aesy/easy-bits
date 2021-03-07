import { assertTrue, isInteger, withinRange } from './util';

/**
 * A {@link BitSet} implementation limited to 31 bits due to bits being stored in a Number type.
 * This implementation is about 25% faster than a BitArray.
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
	 * @param {Number} [minLength = 1] The minimum length of the bitfield.
	 * @throws {Error} In case length exceeds 31 (consider using BitArray instead if u may reach this limit).
	 * @throws {Error} In case 'minLength' is equals to or smaller than zero.
	 */
	constructor(minLength) {
		assertTrue(minLength === undefined || minLength > 0,
			'Illegal argument: parameter \'minLength\' must be larger than 0');

		this.minLength = minLength || 1;

		if (this.minLength > 31) {
			throw new Error('BitField is limited to 31 flags');
		}
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
		if (value instanceof Object) {
			return value.valueOf();
		}

		return value;
	}

	/**
	 * Combines masks. This is equivalent to a OR operation.
	 *
	 * @private
	 * @static
	 * @param {...BitMask} masks The masks to combine.
	 * @returns {Number} The resulting mask.
	 */
	static combineMasks(...masks) {
		return masks.reduce((prev, curr) => prev | curr, 0);
	}

	/**
	 * Produces a new BitField instance from an array. The value may contain anything, the resulting bitfield is based
	 * on the truthiness of the value contents.
	 * Example: [true, 0, {}] will yield 101.
	 *
	 * @public
	 * @static
	 * @param {Array<*>} array
	 * @throws {Error} In case length exceeds 31 (consider using BitArray instead if u may reach this limit).
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

	get length() {
		let { value } = this;
		let length = 0;

		while (value > 0) {
			length++;
			value >>= 1;
		}

		return Math.max(this.minLength, length);
	}

	count() {
		let { value } = this;
		let count = 0;

		while (value > 0) {
			if (value & 1) {
				count++;
			}

			value >>= 1;
		}

		return count;
	}

	intersect(...masks) {
		this.value &= BitField.combineMasks(...masks);

		return this;
	}

	intersects(...masks) {
		const mask = BitField.combineMasks(...masks);

		return (this.value & mask) !== 0;
	}

	get(index) {
		assertTrue(isInteger(index), 'Illegal argument: parameter \'index\' is not an integer');
		assertTrue(withinRange(index, 0, 31), 'Illegal argument: parameter \'index\' is out of bounds');

		return Boolean((this.value >> index) & 1);
	}

	getRange(from, to) {
		assertTrue(isInteger(from), 'Illegal argument: parameter \'from\' is not an integer');
		assertTrue(isInteger(to), 'Illegal argument: parameter \'to\' is not an integer');
		assertTrue(withinRange(from, 0, 31), 'Illegal argument: parameter \'from\' is out of bounds');
		assertTrue(withinRange(to, 0, 31), 'Illegal argument: parameter \'to\' is out of bounds');
		assertTrue(to > from, 'Illegal argument: parameter \'to\' must be larger than parameter \'from\'');

		const length = to - from;
		const mask = (1 << length) - 1;
		const bitField = new BitField(length);
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

		return this.get(index) === Boolean(value);
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
		assertTrue(to > from, 'Illegal argument: parameter \'to\' must be larger than parameter \'from\'');

		let mask = (1 << (to - from)) - 1;

		if (from > 0) {
			mask *= 2 * from;
		}

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
		assertTrue(to > from, 'Illegal argument: parameter \'to\' must be larger than parameter \'from\'');

		let mask = (1 << (to - from)) - 1;

		if (from > 0) {
			mask *= 2 * from;
		}

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

		if (this.minLength > output.length) {
			output = '0'.repeat(this.minLength - output.length) + output;
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
		if (isNaN(Number(input))) {
			throw new Error('Failed to deserialize input');
		}

		const array = input.split('');

		return BitField.fromArray(array.map(Number));
	}

	/**
	 * Produces a new BitField instance equal to this.
	 *
	 * @public
	 * @returns {BitField} A new BitField instance.
	 */
	clone() {
		return new BitField(this.minLength).copy(this);
	}

	equals(other) {
		return this.value === BitField.valueOf(other);
	}

	toArray() {
		const array = [];
		let { value } = this;
		let length = 0;

		while (value > 0) {
			length++;
			array.push(Boolean(value & 1));
			value >>= 1;
		}

		if (this.minLength > length) {
			const filler = new Array(this.minLength - length).fill(false);

			array.push(...filler);
		}

		return array.reverse();
	}

	toString() {
		return `BitField(${this.serialize()})`;
	}
}

export default BitField;
