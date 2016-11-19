const { describe, it } = global;
import { expect } from 'chai';
import BitFlags from '../src/BitFlags';
import EnumValue from '../src/EnumValue';

describe('BitFlags', () => {
	const flagArray = ['ONE', 'TWO', 'THREE', 'FOUR'];
	const flags = new BitFlags(...flagArray);

	// shouldn't accept duplicate keys/values

	it('should only allow less than 32 flags', () => {
		expect(() => {
			new BitFlags(...'flag '.repeat(32).split(' '));
		}).to.throw(Error);
	});

	it('should only contain flag values that are a power of 2', () => {
		for (const flag of flagArray) {
			const value = flags[flag];
			expect(value & (value - 1)).to.equal(0);
		}
	});

	describe('#length', () => {
		it('should return the number of flags, not including NONE', () => {
			expect(flags.length).to.be.a('number');
			expect(flags.length).to.equal(flagArray.length);
			// TODO not including NONE
		});
	});

	describe('#toString()', () => {
		it('should return a string', () => {
			expect(flags.toString()).to.be.a('string');
		});
	});

	describe('#has()', () => {
		it('should return a boolean', () => {
			expect(flags.has(0)).to.be.a('boolean');
		});

		it('should indicate whether input flag belong to this', () => {
			expect(flags.has(new EnumValue('name', 1))).to.equal(false);
			expect(flags.has(flags[flagArray[0]])).to.equal(true);
		});
	});

	describe('#fromArray()', () => {
	});
	describe('#fromJSON()', () => {
	});
	describe('#toJSON()', () => {
	});

	describe('#forEach()', () => {
		it('should iterate every value-key pair but where value is 0', () => {
			let i = 0;

			flags.forEach((value, key, obj) => {
				expect(obj).to.equal(flags);
				expect(key).to.equal(flagArray[i]);
				expect(value).to.satisfy((val) => {
					return (typeof val === 'number') || (val instanceof EnumValue);
				});
				expect(Number(value)).to.not.equal(0);
				i++;
			});

			expect(i).to.equal(flagArray.length);
		});
	});

	it('should not allow properties to be changed, removed or added', () => {
		expect(() => {
			flags.flags.newProp = true;
		}).to.throw(TypeError);

		expect(() => {
			flags.newProp = true;
		}).to.throw(TypeError);

		expect(() => {
			flags[flagArray[0]]++;
		}).to.throw(TypeError);

		expect(() => {
			delete flags[flagArray[0]];
		}).to.throw(TypeError);
	});

	describe('should be iterable', () => {
		let i = 0;

		for (const flag in flags) {
			expect(flag).to.equal(flagArray[i]);
			i++;
		}

		expect(i).to.equal(flagArray.length);

		for (const value of flags) {
			expect(value).to.satisfy((val) => {
				return (typeof val === 'number') || (val instanceof EnumValue);
			});
			expect(Number(value)).to.not.equal(0);
		}
	});

	it('should recognize its\' flags as instances', () => {
		expect(flags[flagArray[0]] instanceof flags).to.equal(true);
	});
});
