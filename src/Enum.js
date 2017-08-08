// Polyfills
import freeze from 'core-js/library/fn/object/freeze';
import defineProperty from 'core-js/library/fn/object/define-property';

import EnumBase from './EnumBase';
import EnumConstant from './EnumConstant';

/**
 * An Enum consists of a set of prefedined constants. These constants are accessible directly on the instance.
 *
 * @public
 * @class
 */
class Enum extends EnumBase {
	/**
	 * @public
	 * @constructor
	 * @param {...String} constants
	 */
	constructor(...constants) {
		super();

		const flags = {};
		let bitValue = 1;

		for (const flag of constants) {
			flags[flag] = new EnumConstant(flag, bitValue);

			Object::defineProperty(this, flag, {
				enumerable: true,
				get() {
					return flags[flag];
				}
			});

			bitValue++;
			this.length++;
		}

		Object::freeze(this);
	}

	/**
	 * Produces a new instance from an array.
	 *
	 * @public
	 * @static
	 * @param {Array<String>} array
	 * @returns {Enum} A new instance.
	 */
	static fromArray(array) {
		return new this(...array);
	}

	toString() {
		return `Enum(length:${this.length})`;
	}
}

export default Enum;
