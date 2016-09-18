import { expect } from 'chai';
const { describe, it } = global;
import BitFlags from '../src/BitFlags';

describe('BitFlags', () => {
	const flagArray = ['ONE', 'TWO', 'THREE', 'FOUR'];
	const flags = new BitFlags(...flagArray);

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
});
