const { describe, it } = global;
import { expect } from 'chai';
import BitField from '../src/BitField';

describe('BitField', () => {
	const length = 10;
	const value = 0b0110001101;
	const filler = '0'.repeat(length - value.toString(2).length);
	const valueString = filler + value.toString(2);
	const valueArray = valueString.split('').map(Number);
	const valueArrayReversed = valueArray.slice(0).reverse();
	const field = new BitField(length).on(value);

	it('should throw an error if working with >=32 bit values', () => {
		expect(() => {
			new BitField(32);
		}).to.throw(Error);
	});

	describe('.fromArray()', () => {
		it('should be initialize from an array, no matter what objects are in it', () => {
			const fieldFromArray = BitField.fromArray([1, 0, [], {}, 'a', '', undefined, null, true, false]);
			expect(fieldFromArray.value).to.equal(0b1011100010);
		});
	});

	describe('#copy()', () => {
		it('should return a copy (clone) of the provided BitField', () => {
			const copy1 = new BitField().copy(field);
			const copy2 = BitField.copy(value);

			expect(copy1.valueOf()).to.equal(field.valueOf());
			expect(copy1).to.be.an.instanceof(BitField);
			expect(field).not.to.equal(copy1);
			expect(copy1.valueOf()).to.equal(copy2.valueOf());
		});
	});

	describe('#clone()', () => {
		it('should return a copy (clone) of this', () => {
			const copy = field.clone();

			expect(copy.valueOf()).to.equal(field.valueOf());
			expect(copy).to.be.an.instanceof(BitField);
			expect(field).not.to.equal(copy);
		});
	});

	describe('#toString()', () => {
		it('should return a string', () => {
			expect(field.toString()).to.be.a('string');
		});
	});

	describe('#toArray()', () => {
		it('should return an array of 0s and/or 1s', () => {
			expect(field.toArray()).to.deep.equal(valueArray);
		});
	});

	describe('#equals()', () => {
		it('should compare number/BitFields alike', () => {
			const identicalField = new BitField(length).on(value);

			expect(field.equals(0)).to.equal(false);
			expect(field.equals(value)).to.equal(true);
			expect(field.equals(identicalField)).to.equal(true);
			expect(field.equals(new BitField())).to.equal(false);
		});
	});

	describe('#length', () => {
		it('should return the number the max bit amount if set, or the current used bits if not set', () => {
			const dynamicField = new BitField().on(0b01100);

			expect(field.length).to.be.a('number');
			expect(field.length).to.equal(length);
			expect(new BitField().length).to.equal(1);
			expect(dynamicField.length).to.equal(4);
		});
	});

	describe('#count()', () => {
		it('should return the number of bits set to 1', () => {
			const ones = valueArray.filter(number => Boolean(number)).length;

			expect(field.count()).to.be.a('number');
			expect(field.count()).to.equal(ones);
		});
	});

	describe('#intersects()', () => {
		it('should return a boolean indicating whether any bit from input BitField is also set to 1 by this', () => {
			const otherField = field.clone();
			otherField.flipAll();

			expect(field.intersects(0)).to.be.a('boolean');
			expect(field.intersects(otherField)).to.equal(false);
			expect(field.intersects(0b1010)).to.equal(true);
		});
	});

	describe('#get()', () => {
		it('should return bit at index', () => {
			valueArrayReversed.forEach((bit, index) => {
				expect(field.get(index)).to.equal(bit);
			});
		});
	});

	describe('#getRange()', () => {
		it('should return bits within a specific range', () => {
			const val = valueArrayReversed.slice(2, 5).reverse().join('');

			expect(field.getRange(2, 5).equals(parseInt(val, 2))).to.equal(true);
		});
	});

	describe('#test()', () => {
		it('should represent the and operation to test if ALL bits of a bitmask are set to 1', () => {
			const mask = 0b110101011;
			const maskArray = mask.toString(2).split('').map(Number);
			const isTrue = maskArray.reverse().reduce((prev, curr, i) => {
				if (Boolean(curr)) {
					return prev && Boolean(field.get(i));
				}

				return prev;
			}, false);

			expect(field.test(mask)).to.equal(isTrue);
			expect(field.test(value)).to.equal(true);
			expect(field.testAny(0)).to.equal(false);
		});
	});

	describe('#testAny()', () => {
		it('should represent the and operation to test if ANY bits of a bitmask are set to 1', () => {
			const mask = 0b110101011;
			const maskArray = mask.toString(2).split('').map(Number);
			const isTrue = maskArray.reverse().reduce((prev, curr, i) => {
				if (Boolean(curr)) {
					return prev || Boolean(field.get(i));
				}

				return prev;
			}, false);

			expect(field.testAny(mask)).to.equal(isTrue);
			expect(field.testAny(value)).to.equal(true);
			expect(field.testAny(0)).to.equal(false);
		});
	});

	describe('#testAt()', () => {
		it('should represent the and operation to test if a bit at a specific index is set to a specific value', () => {
			valueArrayReversed.forEach((bit, index) => {
				const isTrue = Boolean(bit);

				expect(field.testAt(1, index)).to.equal(isTrue);
				expect(field.testAt(0, index)).to.equal(!isTrue);
			});
		});
	});

	describe('#testAll()', () => {
		it('should represent the and operation to test if ALL bits of BitField is set to a specific value', () => {
			const falseField = new BitField(3).on(0b11);
			const trueField = new BitField().on(0b111);

			expect(falseField.testAll(1)).to.equal(false);
			expect(trueField.testAll(1)).to.equal(true);
			expect(new BitField().testAll(0)).to.equal(true);
			expect(field.testAll(1)).to.equal(valueArray.every(val => val === 1));
			expect(field.testAll(0)).to.equal(valueArray.every(val => val === 0));
		});
	});

	describe('#on()', () => {
		it('should set bits to 1 based on a bitmask', () => {
			const bitField = new BitField();

			bitField.on(0b0010);
			expect(bitField.valueOf()).to.equal(0b10);

			bitField.on(0b1010);
			expect(bitField.valueOf()).to.equal(0b1010);
		});
	});

	describe('#off()', () => {
		it('should set bits to 0 based on a bitmask', () => {
			const bitField = new BitField();
			bitField.on(0b1010);

			bitField.off(0b1000);
			expect(bitField.valueOf()).to.equal(0b10);

			bitField.off(0b0001);
			expect(bitField.valueOf()).to.equal(0b10);
		});
	});

	describe('#set()', () => {
		it('should set bits to a specific value based on a bitmask', () => {
			// TODO
		});
	});

	describe('#setAll()', () => {
		it('should set all bits to a specific value', () => {
			// TODO
		});
	});

	describe('#setAt()', () => {
		it('should set bit to a specific value at a specific index', () => {
			// TODO
		});
	});

	describe('#setRange()', () => {
		it('should set bits to a specific value within a specific range', () => {
			// TODO
		});
	});

	describe('#flip() | #toggle()', () => {
		it('should flip bits based on a bitmask', () => {
			// TODO
		});
	});

	describe('#flipAll()', () => {
		it('should flip all bits of this with its\' length in consideration (if not dynamic)', () => {
			// TODO
		});
	});

	describe('#flipAt()', () => {
		it('should flip bit at a specific index', () => {
			// TODO
		});
	});

	describe('#flipRange()', () => {
		it('should flip bits within a specific range', () => {
			// TODO
		});
	});

	it('should be serializable', () => {
		const input = '01101';
		const output = new BitField(5).copy(0b1101).serialize();

		expect(output).to.equal(input);

		expect(() => {
			BitField.deserialize(input);
		}).to.not.throw(Error);

		expect(() => {
			BitField.deserialize('invalid');
		}).to.throw(Error);
	});
});
