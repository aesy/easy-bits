import EnumBase from './EnumBase';
import EnumValue from './EnumValue';

class BitFlags extends EnumBase {
	/**
	 * @constructor
	 * @throws TODO
	 * @param {...String} keys
	 */
	constructor(...keys) {
		super();

		if (keys.length > 31) {
			throw new Error('BitFlags is limited to 31 flags.');
		}

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

			bitValue <<= 1;
			this.length++;
		}

		Object.freeze(this);
	}
}

export default BitFlags;
