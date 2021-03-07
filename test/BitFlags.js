const { describe, it } = global;
import { expect } from 'chai';
import BitArray from '../src/BitArray';
import BitField from '../src/BitField';
import BitFlags from '../src/BitFlags';
import EnumConstant from '../src/EnumConstant';

describe('BitFlags', () => {
	const flagArray = ['ONE', 'TWO', 'THREE', 'FOUR'];
	const flags = new BitFlags(...flagArray);

	it('should only contain flag values that are a power of 2', () => {
		for (const flag of flagArray) {
			const value = flags[flag];
			expect(value & (value - 1)).to.equal(0);
		}
	});

	it('should have a NONE property', () => {
		expect(flags.NONE).to.be.an.instanceof(EnumConstant);
		expect(flags.NONE.valueOf()).to.equal(0);
	});

	it('should not accept duplicate constant names', () => {
		expect(() => {
			new BitFlags('ONE', 'ONE');
		}).to.throw(Error);
	});

	it('should not allow properties to be changed, removed or added', () => {
		expect(() => {
			flags.flags.newProp = true;

			expect(flags.flags.newProp).to.equal(undefined);
			throw new TypeError('Failed silently');
		}).to.throw(TypeError);

		expect(() => {
			flags.newProp = true;

			expect(flags.newProp).to.equal(undefined);
			throw new TypeError('Failed silently');
		}).to.throw(TypeError);

		expect(() => {
			const temp = flags[flagArray[0]];
			flags[flagArray[0]]++;

			expect(flags[flagArray[0]]).to.equal(temp);
			throw new TypeError('Failed silently');
		}).to.throw(TypeError);

		expect(() => {
			delete flags[flagArray[0]];

			expect(flags[flagArray[0]]).to.not.equal(undefined);
			throw new TypeError('Failed silently');
		}).to.throw(TypeError);
	});

	it('should be iterable', () => {
		let i = 0;
		for (const flag in flags) {
			expect(flag).to.be.a('string');
			expect(flag).to.equal(flagArray[i]);
			i++;
		}

		expect(i).to.equal(flagArray.length);

		let j = 0;
		for (const flag of flags) {
			expect(flag).to.be.an.instanceof(EnumConstant);
			expect(Number(flag)).to.not.equal(0);
			j++;
		}

		expect(j).to.equal(flagArray.length);
	});

	it('should be serializable', () => {
		const input = 'ONE,TWO,THREE,FOUR';
		const output = flags.serialize();

		expect(output).to.equal(input);

		expect(() => {
			BitFlags.deserialize(input);
		}).to.not.throw(Error);

		for (let value of [null, 42, '', 'BITFLAG,', undefined, {}]) {
			expect(() => {
				BitFlags.deserialize(value);
			}).to.throw(Error);
		}
	});

	describe('.fromArray()', () => {
		it('should be possible to create a BitFlag instance from an array', () => {
			const input = ['A', 'B', 'C'];
			const flags = BitFlags.fromArray(input);

			expect(flags.length).to.equal(3);
			expect(flags.values().map(constant => constant.name)).to.deep.equal(input);

			let bit = 1;
			for (const flag of flags) {
				expect(Number(flag)).to.equal(bit);
				bit <<= 1;
			}
		});
	});

	describe('#createBitField', () => {
		it('should return a new BitField of the same length', () => {
			const field = flags.createBitField();

			expect(field).to.be.an.instanceof(BitField);
			expect(field.length).to.equal(flags.length);
		});
	});

	describe('#createBitArray', () => {
		it('should return a new BitArray of the same length', () => {
			const array = flags.createBitArray();

			expect(array).to.be.an.instanceof(BitArray);
			expect(array.length).to.equal(flags.length);
		});
	});

	describe('#length', () => {
		it('should return the number of flags, not including NONE', () => {
			expect(flags.length).to.be.a('number');
			expect(flags.length).to.equal(flagArray.length);
		});
	});

	describe('#toString()', () => {
		it('should return a string', () => {
			expect(flags.toString()).to.be.a('string');
		});
	});

	describe('#has()', () => {
		const constant = new EnumConstant('name', 1);

		it('should return a boolean', () => {
			expect(flags.has(constant)).to.be.a('boolean');
		});

		it('should indicate whether input flag belong to this', () => {
			expect(flags.has(constant)).to.equal(false);
			expect(flags.has(flags[flagArray[0]])).to.equal(true);
		});
	});

	describe('#forEach()', () => {
		it('should iterate every value-key pair but where value is 0', () => {
			let i = 0;

			flags.forEach((value, key, obj) => {
				expect(obj).to.equal(flags);
				expect(key).to.equal(flagArray[i]);
				expect(value).to.satisfy((val) => {
					return (typeof val === 'number') || (val instanceof EnumConstant);
				});
				expect(Number(value)).to.not.equal(0);
				i++;
			});

			expect(i).to.equal(flagArray.length);
		});
	});
});
