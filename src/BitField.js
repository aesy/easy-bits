// Polyfills
import fill from 'core-js/library/fn/array/virtual/fill';
import repeat from 'core-js/library/fn/string/virtual/repeat';

import BitArray from './BitArray';

// TODO make sure all methods work with minLength

/**
 * Class representing a bit field.
 * Limited to 31 bits.
 *
 * @public
 * @class
 */
class BitField {

	/**
	 * The bitfields' current value.
	 *
	 * @private
	 * @field
	 * @type {Number}
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
	 * @field
	 * @type {Number}
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
	 * @param {Array<any>} array The array to base the bitfield on.
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
	 * Produces a copy of the provided bitfield.
	 *
	 * @public
	 * @static
	 * @param {BitField|Number} bitField BitField instance to copy.
	 * @returns {BitField} A new BitField instance.
	 */
	static copy(bitField) {
		return new BitField().copy(bitField);
	}

	/**
	 * Gets the integer value of a bitfield.
	 *
	 * @public
	 * @static
	 * @param {BitField|Number} bitField The bitfield.
	 * @returns {Number} The value.
	 */
	static valueOf(bitField) {
		if (typeof bitField === 'object') {
			return bitField.valueOf();
		}

		return bitField;
	}

	/**
	 * Gets the length of a bitfield.
	 *
	 * @public
	 * @static
	 * @param {BitField|Number} bitField The bitfield.
	 * @returns {Number} The length. Is never less than 1.
	 */
	static lengthOf(bitField) {
		if (typeof bitField === 'object') {
			return bitField.length;
		}

		let value = bitField;
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
	 * @param {BitField|Number} masks The masks to combine.
	 * @returns {Number} The resulting mask.
	 */
	static combineMasks(...masks) {
		return masks.reduce((prev, curr) =>
			prev | curr
		);
	}

	/**
	 * Gets the length of this BitField.
	 *
	 * @public
	 * @returns {Number} The length of this BitField.
	 */
	get length() {
		const length = BitField.lengthOf(this.value);

		if (this.minLength && this.minLength > length) {
			return this.minLength;
		}

		return length;
	}

	/**
	 * Gets the count of 1s in this bitfield.
	 *
	 * @public
	 * @returns {Number} The number of 1s in this bitfield.
	 */
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

	/**
	 * Checks whether this instance intersects with another bitfield.
	 *
	 * @public
	 * @param {BitField|Number} bitField The bitfield to compare with.
	 * @returns {Boolean} Does intersect.
	 */
	intersects(bitField) {
		return (this.value & BitField.valueOf(bitField)) !== 0;
	}

	/**
	 * Gets the bit at a specific index.
	 * Example: 001 at index 0 yields 1.
	 *
	 * @public
	 * @param {Number} index The index.
	 * @returns {Number} The bit at the specified index.
	 */
	get(index) {
		return (this.value >> index) & 1;
	}

	/**
	 * Gets the bits within a specific index range.
	 * Example: 011 from 0 to 2 yields 11.
	 *
	 * @public
	 * @param {Number} from The inclusive lower bounds of the range.
	 * @param {Number} to The exclusive upper bounds of the range.
	 * @returns {BitField} The Resulting BitField.
	 */
	getRange(from, to) {
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

	testAt(value, position) {
		const bit = this.get(position);

		return bit === value;
	}

	testAll(value) {
		let mask = 0;

		if (value) {
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

	toggle(...masks) {
		return this.flip(...masks);
	}

	set(value, ...masks) {
		const mask = BitField.combineMasks(...masks);

		if (value) {
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

	setAt(value, position) {
		const mask = 1 << position;

		return this.set(value, mask);
	}

	setRange(value, from, to) {
		const mask = (1 << (to - from)) - 1;

		return this.set(value, mask);
	}

	// Equivalent to a xor operation
	flip(...masks) {
		this.value ^= BitField.combineMasks(...masks);

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

	/**
	 * Copies the values of a bitfield into this bitfield.
	 *
	 * @public
	 * @param {BitField|Number} bitField The bitfield to copy.
	 * @returns {BitField} This instance.
	 */
	copy(bitField) {
		this.value = BitField.valueOf(bitField);

		return this;
	}

	/**
	 * Gets the integer value of this bitfield.
	 *
	 * @public
	 * @returns {Number} The value.
	 */
	valueOf() {
		return this.value;
	}

	/**
	 * Serializes this instance.
	 *
	 * @public
	 * @returns {String}
	 */
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
			throw new Error('Failed to deserialize input');
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
		return BitField.copy(this);
	}

	/**
	 * Checks whether this BitField instance is equal to another bitfield.
	 *
	 * @public
	 * @param {BitField|Number} other The other bitfield to compare with.
	 * @returns {Boolean} Are equal.
	 */
	equals(other) {
		return this.value === BitField.valueOf(other);
	}

	/**
	 * Gets an array containing all the bits in this BitField instance.
	 *
	 * @public
	 * @returns {Array<Number>} An array representation of this BitField instance.
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

		if (this.minLength) {
			const filler = new Array(this.minLength - (length || 1))::fill(0);
			array = array.concat(filler);
		}

		return array.reverse();
	}

	/**
	 * Gets a BitArray copy of this BitField instance.
	 * @public
	 * @returns {BitArray}
	 */
	toBitArray() {
		throw new Error('Not yet implemented');
	}

	/**
	 * Gets a string representation of this BitField instance.
	 *
	 * @public
	 * @returns {String} A string representation of this BitField instance.
	 */
	toString() {
		return `BitField(${this.serialize()})`;
	}

}

export default BitField;
