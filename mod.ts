/**
 * @class Numesis
 * Create custom Number System
 * Compatible with:
 * - Deno
 * - NodeJS
 * - Browser
 * - Typescript
 * @author Jericho Aquino
 * @version 1.1.0
 * @license Apache-2.0
 * @see {@link https://github.com/eru123/numesis} Github Repository
 * @see {@link https://www.npmjs.com/package/numesis} NPM Package
 */
class Numesis {

    /**
     * Binary character set
     */
    public static readonly BIN = '01';

    /**
     * Octal character set
     */
    public static readonly OCT = '01234567';

    /**
     * Decimal character set
     */
    public static readonly DEC = '0123456789';

    /**
     * Hexadecimal character set
     */
    public static readonly HEX = '0123456789ABCDEF';

    /**
     * Default character set
     */
    public static readonly DEFAULT = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    /**
     * A non-duplicate character set, that will be use in creating new number system
     * @type {Set<string>}
     */
    public readonly charset: Array<string>;

    /**
     * @param {string} chartset A non-duplicate character set, that will be use in creating new number system
     */
    constructor(chartset: string = Numesis.DEFAULT) {
        // Recreate an array of characters without duplicates
        this.charset = Array.from(new Set(chartset.split("")))
    }

    /**
     * A recursive method that encodes the n variable to custom number system
     * @param {number|string} number    The number that will be decoded
     * @param {string} current    The current string in the recursion
     *
     * @return {string} encoded string
     */
    private encode_process(number: number | string, current = ""): string {
        number = parseInt("" + number)                      // Convert to integer
        const length: number = this.charset.length          // Get the length of the charset
        const lastIndex: number = length - 1                // Get the last index of the charset
        const set: Array<string> = this.charset             // Get the charset
        if (number <= lastIndex) return "" + (set[number] + current); // If the number is less than the length of the charset, return the character
        const m: number = number % length;                  // Get the remainder of the number
        current = m > 0 && m <= length ? set[m] + current : set[0] + current // If the remainder is greater than 0 and less than the length of the charset, return the character
        const d: number = parseInt((number / length) + ""); // Get the division of the number
        return this.encode_process(d, current)              // Recursive call
    }

    /**
     * A public method that encodes n paramenter to custom number system
     * @param {number|string} args numbers that will be decoded
     *
     * @return {string} encoded string
     */
    public encode(...args: Array<number | string>): string {
        return args
            // map each argument to the encode_process method
            .map((n) => {
                const str = String(n)                    // Convert to string
                if (/\./i.test(str)) {                   // If float
                    const st = str.split(".")            // Split the string
                    // return the encoded float
                    return `${this.encode_process(+st[0] || 0)}.${this.encode_process(+st[1] || 0)}`
                }

                return this.encode_process(n)
            })
            .join("")
    }

    /**
     * Alias for encode
     */
    public e = this.encode;

    /**
     * Decode the string to a number, not including float
     * @param {string} str Encoded string that will be decoded
     * @returns {number} decoded number
     */
    private decode_process(str: string): number {
        let decoded = 0;
        for (let i = 0; i < str.length; i++) {
            // Get the index of the character in the charset
            // Multiply the index by the power of the length of the charset
            // Add the result to the decoded variable
            decoded += this.charset.indexOf(str[i]) * Math.pow(this.charset.length, str.length - i - 1);
        }
        return decoded
    }

    /**
     * Decode the string to a number, including float
     * @param {string} str Encoded string that will be decoded
     * @param {string} delimiter The encoded string delimiter, commonly used in decoding result `Numesis.block`
     * @returns {number} decoded number
     */
    public decode = (str: string, delimiter: string = " "): number => +str.replaceAll(delimiter, '').split(".").map((n) => this.decode_process(n)).join(".");

    /**
     * Alias for decode
     */
    public d = this.decode;

    /**
     * Expects the length of the return value is equal to len parameter
     * if the length of the encoded string is less than the expected length, it will 
     * prefix with a character equivalent to the first character of the charset until 
     * the expected length is met, if the length of the encoded string is greater than
     * the expected length no trailing characters will be added
     * @param {number} len The expected length of the encoded string
     * @param {Array<number|string>} args The numbers that will be encoded
     * @returns {string} encoded string
     */
    public encode_trail(len: number, ...args: Array<number | string>): string {
        const encoded = this.encode(...args);
        return encoded.length > len ? encoded : encoded.padStart(len, this.charset[0]);
    }

    /**
     * Alias for encode_trail
     */
    public trail = this.encode_trail;

    /**
     * Alias for encode_trail
     */
    public t = this.encode_trail;

    /**
     * Return encoded message in a block of characters separated by a delimiter.
     * Encoded message must be a multiple of the length of the separator, if not,
     * the first block of characters will be prefix with a character equivalent to
     * the first character of the charset until the length of the encoded message is
     * a multiple of the length of the expected size per block.
     * @param {number} size The expected length of each block
     * @param {string} separator The separator between each block 
     * @param {Array<number|string>} args The numbers that will be encoded 
     * @returns encoded string
     */
    public encode_block(size: number, separator: string, ...args: Array<number | string>): string {
        const arr = this.encode(...args).split("").reverse();
        // if arr is not divisible by size, add charset[0] to the end until it is divisible by size
        while (arr.length % size !== 0) arr.push(this.charset[0]);
        const pre: string[] = arr.reverse();

        // group the array into blocks of size
        const  blocks: string[] = []
        while (pre.length > 0) blocks.push(pre.splice(0, size).join(""));

        // return the blocks joined by the separator
        return blocks.join(separator);
    }

    /**
     * Alias for encode_block
     */
    public block = this.encode_block

    /**
     * Alias for encode_block
     */
    public b = this.encode_block
}

export default Numesis