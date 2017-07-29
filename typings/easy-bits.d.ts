
export type Bit = 0 | 1 | false | true;
type BitFieldType<T> = BitBase<T> | number;

class BitBase<T> {
	static valueOf(bitField: T): number;
	static lengthOf(bitField: T): number;
	readonly length: number;
	count(): number;
	intersects(bitField: T);
	get(index: number): number;
	getRange(from: number, to: number): number;
	test(...masks: T[]): boolean;
	testAny(...masks: T[]): boolean;
	testAt(value: Bit, index: number): boolean;
	testAll(value: Bit): boolean;
	on(...masks: T[]): this;
	off(...masks: T[]): this;
	toggle(...masks: T[]): this;
	set(value: Bit, ...masks: T[]): this;
	setAll(value: Bit): this;
	setAt(value: Bit, index: number): this;
	setRange(value: Bit, from: number, to: number): this;
	flip(...masks: T[]): this;
	flipAll(): this;
	flipRange(from: number, to: number): this;
	valueOf(): number;
	serialize(): string;
	equals(other: BitBase): boolean;
	toArray(): number[];
	toString(): string;
}

export class BitArray<T extends number = BitFieldType<T>> extends BitBase<T> {
	constructor(minLength: number = 0);
	static fromArray(array: any[]): BitArray<T>;
	static copy(bitField: T): BitArray<T>;
	static deserialize(input: string): BitArray<T>;
	copy(bitField: T): BitArray<T>;
	toBitField(): BitField;
}

export class BitField<T extends number = BitFieldType<T>> extends BitBase<T> {
	constructor(minLength: number = 0);
	static fromArray(array: any[]): BitField<T>;
	static copy(bitField: T): BitField<T>;
	static deserialize(input: string): BitField<T>;
	copy(bitField: T): BitField<T>;
	toBitArray(): BitArray;
}
