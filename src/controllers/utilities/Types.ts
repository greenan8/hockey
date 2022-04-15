/**
 * Construct a type that results in a flattened OpenApi definition when extended
 */
export type Flat<T> = { [K in keyof T]: T[K] };
