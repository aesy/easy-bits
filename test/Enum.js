const { describe, it } = global;
import { expect } from 'chai';
import Enum from '../src/Enum';
import EnumConstant from '../src/EnumConstant';

describe('Enum', () => {
	const flagArray = ['ONE', 'TWO', 'THREE', 'FOUR'];
	const flags = new Enum(...flagArray);

	it('should not accept duplicate constant names', () => {
		expect(() => {
			new Enum('ONE', 'ONE');
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
			Enum.deserialize(input);
		}).to.not.throw(Error);

		for (let value of [null, 42, '', 'ENUM,', undefined, {}]) {
			expect(() => {
				Enum.deserialize(value);
			}).to.throw(Error);
		}
	});

	describe('.fromArray()', () => {
		it('should be possible to create an Enum from an array', () => {
			const input = ['A', 'B', 'C'];
			const flags = Enum.fromArray(input);

			expect(flags.length).to.equal(3);
			expect(flags.values().map(constant => constant.name)).to.deep.equal(input);
		});
	});

	describe('#length', () => {
		it('should return the number of flags', () => {
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
