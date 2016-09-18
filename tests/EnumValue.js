import { expect } from 'chai';
const { describe, it } = global;
import EnumValue from '../src/EnumValue';

describe('EnumValue', () => {
	const name = 'enumName';
	const value = 5;
	const enumValue = new EnumValue(name, value);

	it('should not allow properties to be changed or added', () => {
		expect(() => {
			enumValue.newProp = true;
		}).to.throw(TypeError);

		expect(() => {
			enumValue.value++;
		}).to.throw(TypeError);
	});

	describe('#Symbol', () => {
		it('should strictly compare only as a reference', () => {
			const ref = enumValue;
			const enumValue2 = new EnumValue(name, value);

			expect(enumValue === ref).to.equal(true);
			expect(enumValue === enumValue2).to.equal(false);
			expect(enumValue === value).to.equal(false);
		});

		it('should loosely compare as a number or reference', () => {
			const ref = enumValue;
			const enumValue2 = new EnumValue(name, value);

			expect(enumValue == ref).to.equal(true);
			expect(enumValue == enumValue2).to.equal(false);
			expect(enumValue == value).to.equal(true);
		});

		it('should interpolate as a string', () => {
			// TODO: is it even possible?
			expect('' + enumValue + '').to.equal(enumValue.toString());
			expect(`${enumValue}`).to.equal(enumValue.toString());
			expect(String(enumValue)).to.equal(enumValue.toString());
		});

		it('should operate as a number', () => {
			const mask = 3;

			expect(enumValue | mask).to.equal(value | mask);
			expect(enumValue + mask).to.equal(value + mask);
			expect(Number(enumValue)).to.equal(value);
		});
	});

	describe('#toString()', () => {
		it('should return a string', () => {
			expect(enumValue.toString()).to.be.a('string');
		});
	});

	describe('#valueOf()', () => {
		it('should return the proper number', () => {
			expect(enumValue.valueOf()).to.be.a('number');
			expect(enumValue.valueOf()).to.equal(value);
		});
	});

	describe('#equals()', () => {
		it('should only equal its\' reference', () => {
			expect(enumValue.equals(enumValue)).to.equal(true);
			expect(enumValue.equals(new EnumValue(name, value))).to.equal(false);
		});
	});

	describe('#name', () => {
		it('should be the proper name', () => {
			expect(enumValue.name).to.be.a('string');
			expect(enumValue.name).to.equal(name);
		})
	});

	describe('#value', () => {
		it('should be the proper value', () => {
			expect(enumValue.value).to.be.a('number');
			expect(enumValue.value).to.equal(value);
			expect(enumValue.value).to.equal(enumValue.valueOf());
		});
	});
});
