const { describe, it } = global;
import { expect } from 'chai';

import BitField from '../src/BitField';

describe('BitField', () => {
	it('should throw an error if working with >=32 bit values', () => {
		expect(() => {
			new BitField(32);
		}).to.throw(Error);
	});

	describe('.fromArray()', () => {
		it('should be initializable from an array, no matter what objects are in it', () => {
			const array = [1, 0, [], {}, 'a', '', undefined, null, true, false];
			const bitField = BitField.fromArray(array);

			expect(bitField.toArray()).to.deep.equal(array.map(Boolean));
		});
	});

	describe('#copy()', () => {
		it('should return a copy (clone) of the provided BitField', () => {
			const bitField = new BitField(10).copy(0b0110001101);
			const copy = new BitField().copy(bitField);

			expect(copy).to.be.an.instanceof(BitField);
			expect(copy.valueOf()).to.equal(bitField.valueOf());
			expect(bitField).not.to.equal(copy);
		});
	});

	describe('#clone()', () => {
		it('should return a copy (clone) of this', () => {
			const bitField = new BitField(10).copy(0b0110001101);
			const copy = bitField.clone();

			expect(copy).to.be.an.instanceof(BitField);
			expect(copy.valueOf()).to.equal(bitField.valueOf());
			expect(bitField).not.to.equal(copy);
		});
	});

	describe('#toString()', () => {
		it('should return a string', () => {
			const bitField = new BitField(10).copy(0b0110001101);

			expect(bitField.toString()).to.be.a('string');
		});
	});

	describe('#toArray()', () => {
		it('should return an array of booleans', () => {
			const bitField = new BitField(5).copy(0b1001);
			const asArray = [false, true, false, false, true];

			expect(bitField.toArray()).to.deep.equal(asArray);
		});
	});

	describe('#equals()', () => {
		it('should compare number/BitFields alike', () => {
			const bitField = new BitField(10).copy(0b0110001101);
			const copy = new BitField(10).copy(0b0110001101);

			expect(bitField.equals(0)).to.equal(false);
			expect(bitField.equals(0b0110001101)).to.equal(true);
			expect(bitField.equals(copy)).to.equal(true);
			expect(bitField.equals(new BitField())).to.equal(false);
		});
	});

	describe('#length', () => {
		it('should return the number the max bit amount if set, or the current used bits if not set', () => {
			const bitField = new BitField(10).copy(0b0110001101);

			expect(bitField.length).to.be.a('number');
			expect(bitField.length).to.equal(10);
			expect(new BitField().length).to.equal(1);
			expect(new BitField(10).length).to.equal(10);
		});
	});

	describe('#count()', () => {
		it('should return the number of bits set to 1', () => {
			const bitField = new BitField(10).copy(0b0110001101);
			const ones = bitField.toArray().filter(element => element).length;

			expect(bitField.count()).to.be.a('number');
			expect(bitField.count()).to.equal(ones);
			expect(new BitField(10).count()).to.equal(0);
		});
	});

	describe('#intersect()', () => {
		it('should intersect this with a bitmask', () => {
			const value = 0b0110001101;
			const opposite = 0b1001110010;
			const bitField = new BitField(10);

			bitField.copy(value);
			bitField.intersect(0);
			expect(bitField.valueOf()).to.equal(0);

			bitField.copy(value);
			bitField.intersect(opposite);
			expect(bitField.valueOf()).to.equal(0);

			bitField.copy(value);
			bitField.intersect(0b1010);
			expect(bitField.valueOf()).to.equal(0b1000);
		});
	});

	describe('#intersects()', () => {
		it('should return a boolean indicating whether any bit from input BitField is also set to 1 by this', () => {
			const bitField = new BitField(10).copy(0b0110001101);
			const opposite = bitField.clone().flipAll();

			expect(bitField.intersects(0)).to.be.a('boolean');
			expect(bitField.intersects(opposite)).to.equal(false);
			expect(bitField.intersects(0b1010)).to.equal(true);
		});
	});

	describe('#get()', () => {
		it('should return bit at index', () => {
			const bitField = new BitField(10).copy(0b0110001101);

			bitField.toArray().reverse().forEach((bit, index) => {
				expect(bitField.get(index)).to.equal(bit);
			});
		});

		it('should throw if index is out of bounds', () => {
			const bitField = new BitField();

			expect(() => {
				bitField.flipAt(32);
			}).to.throw(Error);
		});
	});

	describe('#getRange()', () => {
		it('should return bits within a specific range', () => {
			const bitField = new BitField(5).copy(0b1101);
			const range = bitField.getRange(2, 6);

			expect(range.length).to.equal(4);
			expect(range.toArray()).to.deep.equal([false, false, true, true]);
		});

		it('should throw if any index is out of bounds', () => {
			const bitField = new BitField();

			expect(() => {
				bitField.slice(32, 33);
			}).to.throw(Error);

			expect(() => {
				bitField.slice(0, 32);
			}).to.throw(Error);
		});
	});

	describe('#test()', () => {
		it('should test if ALL bits of a bitmask are set to 1', () => {
			const bitField = new BitField(10).copy(0b0110001101);

			expect(bitField.test(0)).to.equal(true);
			expect(bitField.test(1)).to.equal(true);
			expect(bitField.test(0b11)).to.equal(false);
			expect(bitField.test(0b101)).to.equal(true);
			expect(bitField.test(0b0110001101)).to.equal(true);
		});
	});

	describe('#testAny()', () => {
		it('should test if ANY bits of a bitmask are set to 1', () => {
			const bitField = new BitField(10).copy(0b0110001101);

			expect(bitField.testAny(0)).to.equal(false);
			expect(bitField.testAny(1)).to.equal(true);
			expect(bitField.testAny(0b11)).to.equal(true);
			expect(bitField.testAny(0b10)).to.equal(false);
			expect(bitField.testAny(0b0110001101)).to.equal(true);
		});
	});

	describe('#testAt()', () => {
		it('should test if a bit at a specific index is set to a specific value', () => {
			const bitField = new BitField(10).copy(0b0110001101);

			bitField.toArray().reverse().forEach((bit, index) => {
				expect(bitField.testAt(0, index)).to.equal(bit === false);
				expect(bitField.testAt(1, index)).to.equal(bit === true);
			});

			expect(bitField.testAt(0, bitField.length + 1)).to.equal(true);
			expect(bitField.testAt(1, bitField.length + 1)).to.equal(false);
		});

		it('should throw if index is out of bounds', () => {
			const bitField = new BitField();

			expect(() => {
				bitField.flipAt(32);
			}).to.throw(Error);
		});
	});

	describe('#testAll()', () => {
		it('should test if ALL bits of BitField is set to a specific value', () => {
			const bitField1 = new BitField(3);
			const bitField2 = new BitField(3).on(0b11);
			const bitField3 = new BitField().on(0b111);

			expect(bitField1.testAll(0)).to.equal(true);
			expect(bitField1.testAll(1)).to.equal(false);
			expect(bitField2.testAll(0)).to.equal(false);
			expect(bitField2.testAll(1)).to.equal(false);
			expect(bitField3.testAll(0)).to.equal(false);
			expect(bitField3.testAll(1)).to.equal(true);
		});
	});

	describe('#on()', () => {
		it('should set bits to 1 based on a bitmask', () => {
			const bitField = new BitField();

			bitField.on(0b1010);
			expect(bitField.valueOf()).to.equal(0b1010);

			bitField.on(0b11);
			expect(bitField.valueOf()).to.equal(0b1011);
		});
	});

	describe('#off()', () => {
		it('should set bits to 0 based on a bitmask', () => {
			const bitField = new BitField().on(0b1010);

			bitField.off(0b1000);
			expect(bitField.valueOf()).to.equal(0b10);

			bitField.off(0b0001);
			expect(bitField.valueOf()).to.equal(0b10);
		});
	});

	describe('#set()', () => {
		it('should set bits to a specific value based on a bitmask', () => {
			const bitField = new BitField().copy(0b100);

			bitField.set(1, 0b1010);
			expect(bitField.valueOf()).to.equal(0b1110);

			bitField.set(0, 0b1100);
			expect(bitField.valueOf()).to.equal(0b10);
		});
	});

	describe('#setAll()', () => {
		it('should set all bits to a specific value', () => {
			const bitField = new BitField(3);

			bitField.setAll(1);
			expect(bitField.valueOf()).to.equal(0b111);

			bitField.setAll(0);
			expect(bitField.valueOf()).to.equal(0);
		});
	});

	describe('#setAt()', () => {
		it('should set bit to a specific value at a specific index', () => {
			const bitField = new BitField();

			bitField.setAt(1, 3);
			expect(bitField.valueOf()).to.equal(0b1000);

			bitField.setAt(0, 3);
			expect(bitField.valueOf()).to.equal(0);
		});

		it('should throw if index is out of bounds', () => {
			const bitField = new BitField();

			expect(() => {
				bitField.flipAt(32);
			}).to.throw(Error);
		});
	});

	describe('#setRange()', () => {
		it('should set bits to a specific value within a specific range', () => {
			const bitField = new BitField();

			bitField.setRange(1, 1, 4);
			expect(bitField.valueOf()).to.equal(0b1110);

			bitField.setRange(0, 0, 3);
			expect(bitField.valueOf()).to.equal(0b1000);
		});

		it('should throw if any index is out of bounds', () => {
			const bitField = new BitField();

			expect(() => {
				bitField.setRange(32, 33);
			}).to.throw(Error);

			expect(() => {
				bitField.setRange(0, 32);
			}).to.throw(Error);
		});
	});

	describe('#flip()', () => {
		it('should flip bits based on a bitmask', () => {
			const bitField = new BitField();

			bitField.flip(0b11011);
			expect(bitField.valueOf()).to.equal(0b11011);

			bitField.flip(0b1010);
			expect(bitField.valueOf()).to.equal(0b10001);
		});
	});

	describe('#flipAll()', () => {
		it('should flip all bits of this with its\' length in consideration (if not dynamic)', () => {
			const bitField = new BitField();

			bitField.flipAll();
			expect(bitField.valueOf()).to.equal(1);

			bitField.copy(0b1100).flipAll();
			expect(bitField.valueOf()).to.equal(0b11);

			const bitField2 = new BitField(4).flipAll();

			expect(bitField2.valueOf()).to.equal(0b1111);
		});
	});

	describe('#flipAt()', () => {
		it('should flip bit at a specific index', () => {
			const bitField = new BitField();

			bitField.flipAt(3);
			expect(bitField.valueOf()).to.equal(0b1000);

			bitField.flipAt(3);
			expect(bitField.valueOf()).to.equal(0);
		});

		it('should throw if index is out of bounds', () => {
			const bitField = new BitField();

			expect(() => {
				bitField.flipAt(32);
			}).to.throw(Error);
		});
	});

	describe('#flipRange()', () => {
		it('should flip bits within a specific range', () => {
			const bitField = new BitField();

			bitField.flipRange(1, 4);
			expect(bitField.valueOf()).to.equal(0b1110);

			bitField.flipRange(0, 3);
			expect(bitField.valueOf()).to.equal(0b1001);
		});

		it('should throw if any index is out of bounds', () => {
			const bitField = new BitField();

			expect(() => {
				bitField.flipRange(32, 33);
			}).to.throw(Error);

			expect(() => {
				bitField.flipRange(0, 32);
			}).to.throw(Error);
		});
	});

	it('should be serializable', () => {
		const input1 = '01101';
		const output1 = new BitField(5).copy(0b1101).serialize();
		const input2 = '1101';
		const output2 = new BitField().copy(0b1101).serialize();

		expect(output1).to.equal(input1);
		expect(output2).to.equal(input2);

		expect(() => {
			BitField.deserialize(input1);
		}).to.not.throw(Error);

		expect(() => {
			BitField.deserialize('invalid');
		}).to.throw(Error);

		const bitField1 = BitField.deserialize(input1);
		const bitField2 = BitField.deserialize(input2);

		expect(bitField1.length).to.equal(5);
		expect(bitField1.valueOf()).to.equal(0b1101);
		expect(bitField2.length).to.equal(4);
		expect(bitField2.valueOf()).to.equal(0b1101);
	});
});
