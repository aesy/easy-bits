import { expect } from 'chai';
const { describe, it } = global;
import Enum from '../src/Enum';

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

		for (const value of flags) {
			expect(value).to.not.be.a('string');
		}
	});

	it('should recognize its\' flags as instances', () => {
		expect(flags[flagArray[0]] instanceof flags).to.equal(true);
	});
});
