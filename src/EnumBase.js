
/**
 * @abstract
 */
class EnumBase {
	constructor() {
		this.flags = {};
	}

	get length() {
		return Object.keys(this.flags).length;
	}

	toString() {
		return `BitFlags(length:${this.length})`;
	}

	toJSON() {}

	forEach(callback) {
		for (const flag of this) {
			callback(flag, this[flag]);
		}
	}

	*[Symbol.iterator]() {
		for (const flag of Object.keys(this.flags)) {
			yield flag;
		}
	}

	[Symbol.hasInstance](instance) {
		return Object.values(this.flags).includes(instance);
	}
}

export default EnumBase;
