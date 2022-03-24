export type Bit = 0 | 1 | false | true;
export type BitSetLike = BitSet | number;

export interface BitSet<T extends BitSetLike = BitSetLike> {
	readonly length: number;
	count(): number;
	intersect(...masks: T[]): this;
	intersects(...masks: T[]): boolean;
	get(index: number): boolean;
	getRange(from: number, to: number): BitSet<T>;
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
	copy(bitset: T): this;
	valueOf(): number;
	serialize(): string;
	clone(): BitSet<T>;
	equals(other: T): boolean;
	toArray(): boolean[];
	toString(): string;
}

interface BitArray<T extends BitSetLike = BitSetLike> extends BitSet<T> {
	getRange(from: number, to: number): BitArray<T>;
	clone(): BitArray<T>;
}

interface BitArrayConstructor {
	new <T extends BitSetLike = BitSetLike>(minLength?: number): BitArray<T>;
	fromArray<T extends BitSetLike = BitSetLike>(array: any[]): BitArray<T>;
	deserialize<T extends BitSetLike = BitSetLike>(input: string): BitArray<T>;
}

export declare const BitArray: BitArrayConstructor;

interface BitField<T extends BitSetLike = BitSetLike> extends BitSet<T> {
	getRange(from: number, to: number): BitField<T>;
	clone(): BitField<T>;
}

interface BitFieldConstructor {
	new <T extends BitSetLike = BitSetLike>(minLength?: number): BitField<T>;
	fromArray<T extends BitSetLike = BitSetLike>(array: any[]): BitField<T>;
	deserialize<T extends BitSetLike = BitSetLike>(input: string): BitField<T>;
}

export declare const BitField: BitFieldConstructor;
