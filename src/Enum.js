// Polyfills
import freeze from 'core-js/library/fn/object/freeze';
import defineProperty from 'core-js/library/fn/object/define-property';

import EnumBase from './EnumBase';
import EnumConstant from './EnumConstant';

/**
 * @public
 * @class
 */
class Enum extends EnumBase {

	/**
	 * @public
	 * @constructor
	 * @param {...String?} [constants]
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
	 * Gets a string representation of this Enum instance.
	 *
	 * @public
	 * @returns {String} A string representation of this Enum instance.
	 */
	toString() {
		return `Enum(length:${this.length})`;
	}

}

export default Enum;
