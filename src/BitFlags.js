import EnumBase from './EnumBase';
import EnumValue from './EnumValue';
import EnumProxy from './EnumProxy';

class BitFlags extends EnumBase {
	/**
	 * @constructor
	 * @throws TODO
	 * @param {...String} [flags]
	 */
	constructor(...flags) {
		super();

		if (flags.length > 31) {
			throw new Error('BitFlags is limited to 31 flags.');
		}

		let value = 1;

		for (const flag of flags) {
			this.flags[flag] = new EnumValue(flag, value);
			value <<= 1;
		}

		Object.freeze(this);
		Object.freeze(this.flags);
		return new Proxy(this, EnumProxy);
	}

	static fromArray(array) {
		return new BitFlags(...array);
	}
}

export default BitFlags;
