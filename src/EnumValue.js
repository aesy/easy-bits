
class EnumValue {
	constructor(name, value) {
		this.name = name;
		this.value = value;

		Object.freeze(this);
	}

	toString() {
		return `EnumValue(${this.name}:${this.valueOf()})`;
	}

	valueOf() {
		return this.value;
	}

	equals(other) {
		return this === other;
	}
}

export default EnumValue;
