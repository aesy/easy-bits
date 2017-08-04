/**
 * @private
 * @param {Boolean} expression
 * @param {String} message Error description.
 * @throws {Error} In case expression evaluates to false.
 */
export function assertTrue(expression, message) {
	if (!expression) {
		throw Error(message);
	}
}

/**
 * Checks whether the input value is a number. Anything that could be parsed as a number will yield false.
 * Example: The string '1' yields false.
 *
 * @private
 * @param value
 * @returns {Boolean}
 */
export function isNumber(value) {
	return typeof value === 'number';
}

/**
 * Checks whether the input value is a integer. Anything that could be parsed as a number will yield false.
 * Example: The string '1' yields false. The number '1.0' yields true. The number '1.1' yields false.
 *
 * @private
 * @param value
 * @returns {Boolean}
 */
export function isInteger(value) {
	return isNumber(value) && Math.floor(value) === value;
}

/**
 * Checks whether the input number is within a specific range.
 *
 * @private
 * @param {Number} number
 * @param {Number} from The inclusive lower bounds of the range.
 * @param {Number} to The inclusive upper bounds of the range.
 * @returns {Boolean}
 */
export function withinRange(number, from, to) {
	return number >= from && number <= to;
}
