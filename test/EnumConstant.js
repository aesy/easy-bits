const { describe, it } = global;
import { expect } from 'chai';
import EnumConstant from '../src/EnumConstant';

describe('EnumConstant', () => {
	const name = 'enumName';
	const value = 5;
	const constant = new EnumConstant(name, value);

	it('should not allow properties to be changed or added', () => {
		expect(() => {
			constant.newProp = true;

			expect(constant.newProp).to.equal(undefined);
			throw new TypeError('Failed silently');
		}).to.throw(TypeError);

		expect(() => {
			constant.value++;

			expect(constant.value).to.equal(value);
			throw new TypeError('Failed silently');
		}).to.throw(TypeError);
	});

	it('should strictly compare only as a reference', () => {
		const reference = constant;
		const copy = new EnumConstant(name, value);

		expect(constant === reference).to.equal(true);
		expect(constant === copy).to.equal(false);
		expect(constant === value).to.equal(false);
	});

	it('should loosely compare as a number or reference', () => {
		const reference = constant;
		const copy = new EnumConstant(name, value);

		expect(constant == reference).to.equal(true);
		expect(constant == copy).to.equal(false);
		expect(constant == value).to.equal(true);
	});

	it('should interpolate as a string', () => {
		// Is this even possible?
		// expect('' + constant + '').to.equal(constant.toString());
		// expect(`${constant}`).to.equal(constant.toString());

		expect(String(constant)).to.equal(constant.toString());
	});

	it('should operate as a number', () => {
		const mask = 3;

		expect(constant | mask).to.equal(value | mask);
		expect(constant + mask).to.equal(value + mask);
		expect(Number(constant)).to.equal(value);
	});

	describe('#name', () => {
		it('should be the name of the constant', () => {
			expect(constant.name).to.be.a('string');
			expect(constant.name).to.equal(name);
		})
	});

	describe('#ordinal', () => {
		it('should equal the ordinal value of the constant', () => {
			expect(constant.ordinal).to.be.a('number');
			expect(constant.ordinal).to.equal(value);
			expect(constant.ordinal).to.equal(constant.valueOf());
		});
	});

	describe('#toString()', () => {
		it('should return a string', () => {
			expect(constant.toString()).to.be.a('string');
		});
	});

	describe('#valueOf()', () => {
		it('should return the ordinal value of the constant', () => {
			expect(constant.valueOf()).to.be.a('number');
			expect(constant.valueOf()).to.equal(value);
		});
	});

	describe('#equals()', () => {
		it('should only equal itself', () => {
			expect(constant.equals(constant)).to.equal(true);
			expect(constant.equals(new EnumConstant(name, value))).to.equal(false);
		});
	});
});
