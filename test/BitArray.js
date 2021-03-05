const { describe, it } = global;
import { expect } from 'chai';

import BitArray from '../src/BitArray';

describe('BitArray', () => {
	it('should be able to work with >=32 bit values', () => {
		expect(() => {
			new BitArray(32);
		}).to.not.throw(Error);

		const bitArray = new BitArray(32).flipAll();

		expect(bitArray.toArray()).to.deep.equal(new Array(32).fill(true));

		expect(() => {
			bitArray.valueOf();
		}).to.throw(Error);
	});

	describe('.fromArray()', () => {
		it('should be initializable from an array, no matter what objects are in it', () => {
			const array = [1, 0, [], {}, 'a', '', undefined, null, true, false];
			const bitArray = BitArray.fromArray(array);

			expect(bitArray.toArray()).to.deep.equal(array.map(Boolean));
		});
	});

	describe('#copy()', () => {
		it('should return a copy (clone) of the provided BitArray', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);
			const copy = new BitArray().copy(bitArray);

			expect(copy).to.be.an.instanceof(BitArray);
			expect(copy.valueOf()).to.equal(bitArray.valueOf());
			expect(bitArray).not.to.equal(copy);
		});
	});

	describe('#clone()', () => {
		it('should return a copy (clone) of this', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);
			const copy = bitArray.clone();

			expect(copy).to.be.an.instanceof(BitArray);
			expect(copy.valueOf()).to.equal(bitArray.valueOf());
			expect(bitArray).not.to.equal(copy);
		});
	});

	describe('#toString()', () => {
		it('should return a string', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);

			expect(bitArray.toString()).to.be.a('string');
		});
	});

	describe('#toArray()', () => {
		it('should return an array of booleans', () => {
			const bitArray = new BitArray(5).copy(0b1001);
			const asArray = [false, true, false, false, true];

			expect(bitArray.toArray()).to.deep.equal(asArray);
		});
	});

	describe('#equals()', () => {
		it('should compare number/BitArrays alike', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);
			const copy = new BitArray(10).copy(0b0110001101);

			expect(bitArray.equals(0)).to.equal(false);
			expect(bitArray.equals(0b0110001101)).to.equal(true);
			expect(bitArray.equals(copy)).to.equal(true);
			expect(bitArray.equals(new BitArray())).to.equal(false);
		});
	});

	describe('#length', () => {
		it('should return the number the max bit amount if set, or the current used bits if not set', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);

			expect(bitArray.length).to.be.a('number');
			expect(bitArray.length).to.equal(10);
			expect(new BitArray().length).to.equal(1);
			expect(new BitArray(10).length).to.equal(10);
		});
	});

	describe('#count()', () => {
		it('should return the number of bits set to 1', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);
			const ones = bitArray.toArray().filter(element => element).length;

			expect(bitArray.count()).to.be.a('number');
			expect(bitArray.count()).to.equal(ones);
			expect(new BitArray(10).count()).to.equal(0);
		});
	});

	describe('#intersect()', () => {
		it('should intersect this with a bitmask', () => {
			const value = 0b0110001101;
			const opposite = 0b1001110010;
			const bitArray = new BitArray(10);

			bitArray.copy(value);
			bitArray.intersect(0);
			expect(bitArray.valueOf()).to.equal(0);

			bitArray.copy(value);
			bitArray.intersect(opposite);
			expect(bitArray.valueOf()).to.equal(0);

			bitArray.copy(value);
			bitArray.intersect(0b1010);
			expect(bitArray.valueOf()).to.equal(0b1000);
		});
	});

	describe('#intersects()', () => {
		it('should return a boolean indicating whether any bit from input BitArray is also set to 1 by this', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);
			const opposite = bitArray.clone().flipAll();

			expect(bitArray.intersects(0)).to.be.a('boolean');
			expect(bitArray.intersects(opposite)).to.equal(false);
			expect(bitArray.intersects(0b1010)).to.equal(true);
		});
	});

	describe('#get()', () => {
		it('should return bit at index', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);

			bitArray.toArray().reverse().forEach((bit, index) => {
				expect(bitArray.get(index)).to.equal(bit);
			});
		});
	});

	describe('#getRange()', () => {
		it('should return bits within a specific range', () => {
			const bitArray = new BitArray(5).copy(0b1101);
			const range = bitArray.getRange(2, 6);

			expect(range.length).to.equal(4);
			expect(range.toArray()).to.deep.equal([false, false, true, true]);
		});
	});

	describe('#test()', () => {
		it('should represent the and operation to test if ALL bits of a bitmask are set to 1', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);

			expect(bitArray.test(0)).to.equal(true);
			expect(bitArray.test(1)).to.equal(true);
			expect(bitArray.test(0b11)).to.equal(false);
			expect(bitArray.test(0b101)).to.equal(true);
			expect(bitArray.test(0b0110001101)).to.equal(true);
		});
	});

	describe('#testAny()', () => {
		it('should represent the and operation to test if ANY bits of a bitmask are set to 1', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);

			expect(bitArray.testAny(0)).to.equal(false);
			expect(bitArray.testAny(1)).to.equal(true);
			expect(bitArray.testAny(0b11)).to.equal(true);
			expect(bitArray.testAny(0b10)).to.equal(false);
			expect(bitArray.testAny(0b0110001101)).to.equal(true);
		});
	});

	describe('#testAt()', () => {
		it('should represent the and operation to test if a bit at a specific index is set to a specific value', () => {
			const bitArray = new BitArray(10).copy(0b0110001101);

			bitArray.toArray().reverse().forEach((bit, index) => {
				expect(bitArray.testAt(0, index)).to.equal(bit === false);
				expect(bitArray.testAt(1, index)).to.equal(bit === true);
			});

			expect(bitArray.testAt(0, bitArray.length + 1)).to.equal(true);
			expect(bitArray.testAt(1, bitArray.length + 1)).to.equal(false);
		});
	});

	describe('#testAll()', () => {
		it('should represent the and operation to test if ALL bits of BitArray is set to a specific value', () => {
			const bitArray1 = new BitArray(3);
			const bitArray2 = new BitArray(3).on(0b11);
			const bitArray3 = new BitArray().on(0b111);

			expect(bitArray1.testAll(0)).to.equal(true);
			expect(bitArray1.testAll(1)).to.equal(false);
			expect(bitArray2.testAll(0)).to.equal(false);
			expect(bitArray2.testAll(1)).to.equal(false);
			expect(bitArray3.testAll(0)).to.equal(false);
			expect(bitArray3.testAll(1)).to.equal(true);
		});
	});

	describe('#on()', () => {
		it('should set bits to 1 based on a bitmask', () => {
			const bitArray = new BitArray();

			bitArray.on(0b1010);
			expect(bitArray.valueOf()).to.equal(0b1010);

			bitArray.on(0b11);
			expect(bitArray.valueOf()).to.equal(0b1011);
		});
	});

	describe('#off()', () => {
		it('should set bits to 0 based on a bitmask', () => {
			const bitArray = new BitArray().on(0b1010);

			bitArray.off(0b1000);
			expect(bitArray.valueOf()).to.equal(0b10);

			bitArray.off(0b0001);
			expect(bitArray.valueOf()).to.equal(0b10);
		});
	});

	describe('#set()', () => {
		it('should set bits to a specific value based on a bitmask', () => {
			const bitArray = new BitArray().copy(0b100);

			bitArray.set(1, 0b1010);
			expect(bitArray.valueOf()).to.equal(0b1110);

			bitArray.set(0, 0b1100);
			expect(bitArray.valueOf()).to.equal(0b10);
		});
	});

	describe('#setAll()', () => {
		it('should set all bits to a specific value', () => {
			const bitArray = new BitArray(3);

			bitArray.setAll(1);
			expect(bitArray.valueOf()).to.equal(0b111);

			bitArray.setAll(0);
			expect(bitArray.valueOf()).to.equal(0);
		});
	});

	describe('#setAt()', () => {
		it('should set bit to a specific value at a specific index', () => {
			const bitArray = new BitArray();

			bitArray.setAt(1, 3);
			expect(bitArray.valueOf()).to.equal(0b1000);

			bitArray.setAt(0, 3);
			expect(bitArray.valueOf()).to.equal(0);
		});
	});

	describe('#setRange()', () => {
		it('should set bits to a specific value within a specific range', () => {
			const bitArray = new BitArray();

			bitArray.setRange(1, 1, 4);
			expect(bitArray.valueOf()).to.equal(0b1110);

			bitArray.setRange(0, 0, 3);
			expect(bitArray.valueOf()).to.equal(0b1000);
		});
	});

	describe('#flip()', () => {
		it('should flip bits based on a bitmask', () => {
			const bitArray = new BitArray();

			bitArray.flip(0b11011);
			expect(bitArray.valueOf()).to.equal(0b11011);

			bitArray.flip(0b1010);
			expect(bitArray.valueOf()).to.equal(0b10001);
		});
	});

	describe('#flipAll()', () => {
		it('should flip all bits of this with its\' length in consideration (if not dynamic)', () => {
			const bitArray = new BitArray();

			bitArray.flipAll();
			expect(bitArray.valueOf()).to.equal(1);

			bitArray.copy(0b1100).flipAll();
			expect(bitArray.valueOf()).to.equal(0b11);

			const bitArray2 = new BitArray(4).flipAll();

			expect(bitArray2.valueOf()).to.equal(0b1111);
		});
	});

	describe('#flipAt()', () => {
		it('should flip bit at a specific index', () => {
			const bitArray = new BitArray();

			bitArray.flipAt(3);
			expect(bitArray.valueOf()).to.equal(0b1000);

			bitArray.flipAt(3);
			expect(bitArray.valueOf()).to.equal(0);
		});
	});

	describe('#flipRange()', () => {
		it('should flip bits within a specific range', () => {
			const bitArray = new BitArray();

			bitArray.flipRange(1, 4);
			expect(bitArray.valueOf()).to.equal(0b1110);

			bitArray.flipRange(0, 3);
			expect(bitArray.valueOf()).to.equal(0b1001);
		});
	});

	it('should be serializable', () => {
		const input1 = '01101';
		const output1 = new BitArray(5).copy(0b1101).serialize();
		const input2 = '1101';
		const output2 = new BitArray().copy(0b1101).serialize();

		expect(output1).to.equal(input1);
		expect(output2).to.equal(input2);

		expect(() => {
			BitArray.deserialize(input1);
		}).to.not.throw(Error);

		expect(() => {
			BitArray.deserialize('invalid');
		}).to.throw(Error);

		const bitArray1 = BitArray.deserialize(input1);
		const bitArray2 = BitArray.deserialize(input2);

		expect(bitArray1.length).to.equal(5);
		expect(bitArray1.valueOf()).to.equal(0b1101);
		expect(bitArray2.length).to.equal(4);
		expect(bitArray2.valueOf()).to.equal(0b1101);
	});
});
