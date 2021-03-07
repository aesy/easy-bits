const { describe, it } = global;
import { expect } from 'chai';

import BitField from '../src/BitField';
import BitFlags from '../src/BitFlags';
import Enum from '../src/Enum';
import EnumConstant from '../src/EnumConstant';

// Tests to make sure that the readmes' usage instructions are correct

describe('Readme', () => {
	it('BitFlags + BitField', () => {
		const options = new BitFlags('OPTION1', 'OPTION2', 'OPTION3');
		const configuration = options.createBitField();

		configuration.on(options.OPTION1 | options.OPTION3);
		configuration.on(options.OPTION1, options.OPTION3);

		expect(configuration.test(options.OPTION1)).to.equal(true);
		expect(configuration.test(options.OPTION2)).to.equal(false);
		expect(configuration.test(options.OPTION3)).to.equal(true);
		expect(configuration.testAny(options.OPTION1 | options.OPTION2)).to.equal(true);
		expect(configuration.testAll(options.OPTION1 | options.OPTION2)).to.equal(false);

		expect(configuration.count()).to.equal(2);
		configuration.flipAll();
		expect(configuration.count()).to.equal(1);
		expect(configuration.test(options.OPTION2)).to.equal(true);

		const clone = configuration.clone();
		expect(clone.toArray()).to.deep.equal(configuration.toArray());

		const serializedOptions = options.serialize();
		const serializedBitfield = configuration.serialize();
		expect(serializedOptions).to.equal('OPTION1,OPTION2,OPTION3');
		expect(serializedBitfield).to.equal('010');

		const deserializedOptions = BitFlags.deserialize(serializedOptions);
		const deserializedBitfield = BitField.deserialize(serializedBitfield);
		expect(deserializedOptions.length).to.equal(options.length);
		expect(deserializedBitfield.length).to.equal(configuration.length);
	});

	it('Enums', () => {
		const Day = new Enum('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

		expect(Day.MONDAY).to.be.instanceOf(EnumConstant);
		expect(Day.MONDAY.name).to.equal('MONDAY');
		expect(String(Day.MONDAY)).to.equal('EnumConstant(MONDAY:0)');
		expect(Day.FRIDAY.ordinal).to.equal(4);
		expect(Number(Day.FRIDAY)).to.equal(4);

		expect(() => {
			Day.MY_OWN_DAY = 1337;
		}).to.throw(TypeError);
		expect(() => {
			Day.MONDAY = 42;
		}).to.throw(TypeError);

		expect(Object.keys(Day)).to.deep.equal(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']);

		const OtherEnum = new Enum('CONSTANT');
		expect(Day.MONDAY.equals(Day.FRIDAY)).to.equal(false);
		expect(Day.MONDAY === OtherEnum.CONSTANT).to.equal(false);
		expect(Day.MONDAY == OtherEnum.CONSTANT).to.equal(false);
	});
});
