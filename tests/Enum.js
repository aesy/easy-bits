const { describe, it } = global;
import { expect } from 'chai';
import Enum from '../src/Enum';
import EnumValue from '../src/EnumValue';

describe('Enum', () => {
	const flagArray = ['ONE', 'TWO', 'THREE', 'FOUR'];
	const flags = new Enum(...flagArray);

	// shouldn't accept duplicate keys/values

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

	// TODO
	describe('#fromArray()', () => {});
	describe('#fromJSON()', () => {});
	describe('#toJSON()', () => {});

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

	it('should not allow accessing nonexistant properties', () => {
		expect(() => {
			const notDefined = flags.DOESNT_EXIST;
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
