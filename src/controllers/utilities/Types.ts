/**
 * Construct a type that results in a flattened OpenApi definition when extended
 */
export type Flat<T> = { [K in keyof T]: T[K] };

/**
 * A `number` type that resolves as an integer in OpenApi
 * @isInt
 */
export type integer = number;

/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type uuid = string;
