
/**
 * @abstract
 */
class EnumBase {
	constructor() {
		Object.defineProperty(this, 'length', {
			value: 0,
			writable: true
		});
	}

	static fromArray(array) {
		return new this(...array);
	}

	toString() {
		return `BitFlags(length:${this.length})`;
	}

	toJSON() {}

	forEach(callback) {
		[...this].forEach(callback);
	}

	*[Symbol.iterator]() {
		for (const value of Object.values(this)) {
			yield value;
		}
	}

	[Symbol.hasInstance](instance) {
		return [...this].includes(instance);
	}
}

export default EnumBase;
