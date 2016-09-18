import EnumBase from './EnumBase';
import EnumValue from './EnumValue';
import EnumProxy from './EnumProxy';

class Enum extends EnumBase {
	/**
	 * @constructor
	 * @param {...String} [flags]
	 */
	constructor(...flags) {
		super();

		let value = 1;

		for (const flag of flags) {
			this.flags[flag] = new EnumValue(flag, value);
			value++;
		}

		Object.freeze(this.flags);
		Object.freeze(this);
		return new Proxy(this, EnumProxy);
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

	static fromArray(array) {
		return new Enum(...array);
	}
}

export default Enum;
