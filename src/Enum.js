import EnumBase from './EnumBase';
import EnumValue from './EnumValue';

class Enum extends EnumBase {
	/**
	 * @constructor
	 * @param {...String} keys
	 */
	constructor(...keys) {
		super();

		const flags = {};
		let bitValue = 1;

		for (const flag of keys) {
			flags[flag] = new EnumValue(flag, bitValue);

			Object.defineProperty(this, flag, {
				enumerable: true,
				get() {
					return flags[flag];
				}
			});

			bitValue++;
			this.length++;
		}

		Object.freeze(this);
	}

	// for (const flag of flags) {
	// 	if (flag instanceof Object) {
	// 		for (const [key, value] of flag.entries()) {
	// 			if (!(value instanceof Number)) {
	// 				throw new Error('');
	// 			} else if (value < bitValue) {
	// 				throw new Error('');
	// 			}
	//
	// 			bitValue = value;
	// 			this.flags[key] = new EnumValue(key, bitValue);
	// 			bitValue++;
	// 		}
	// 	} else {
	// 		this.flags[flag] = new EnumValue(flag, bitValue);
	// 		bitValue++;
	// 	}
	// }
}

export default Enum;
