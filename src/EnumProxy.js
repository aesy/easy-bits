
const EnumProxy = {
	get(target, property, receiver) {
		if (target[property]) {
			return target[property];
		}

		if (target[property] === undefined) {
			const flag = target.flags[property];

			if (flag !== undefined) {
				return flag;
			}
		}

		throw new Error(`Cannot read property ${property} of ${target}.`);
	}
};

export default EnumProxy;
