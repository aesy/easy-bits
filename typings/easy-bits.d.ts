export type Bit = 0 | 1 | false | true;

export interface BitSet<T extends number> {
	readonly length: number;
	count(): number;
	intersects(bitset: T): boolean;
	get(index: number): boolean;
	getRange(from: number, to: number): this;
	test(...masks: T[]): boolean;
	testAny(...masks: T[]): boolean;
	testAt(value: Bit, index: number): boolean;
	testAll(value: Bit): boolean;
	on(...masks: T[]): this;
	off(...masks: T[]): this;
	set(value: Bit, ...masks: T[]): this;
	setAll(value: Bit): this;
	setAt(value: Bit, index: number): this;
	setRange(value: Bit, from: number, to: number): this;
	flip(...masks: T[]): this;
	flipAll(): this;
	flipAt(index: number): this;
	flipRange(from: number, to: number): this;
	valueOf(): number;
	serialize(): string;
	toArray(): boolean[];
	toString(): string;
}

interface BitArray<T extends number> extends BitSet<T> {
	copy(bitset: T): BitArray<T>;
	equals(other: BitArray<T>): boolean;
}

interface BitArrayConstructor {
	new <T extends number>(minLength?: number): BitArray<T>;
	fromArray<T extends number>(array: any[]): BitArray<T>;
	deserialize<T extends number>(input: string): BitArray<T>;
}

export declare const BitArray: BitArrayConstructor;

interface BitField<T extends number> extends BitSet<T> {
	copy(bitset: T): BitField<T>;
	equals(other: BitField<T>): boolean;
}

interface BitFieldConstructor {
	new <T extends number>(minLength?: number): BitField<T>;
	fromArray<T extends number>(array: any[]): BitField<T>;
	deserialize<T extends number>(input: string): BitField<T>;
}

export declare const BitField: BitFieldConstructor;