/**
 * @class Numesis
 * Create custom Number System
 * Compatible with:
 * - Deno
 * - NodeJS
 * - Browser
 * - Typescript
 * @author Jericho Aquino
 * @version 1.0.2
 * @license Apache-2.0
 * @see {@link https://github.com/eru123/numesis} Github Repository
 * @see {@link https://www.npmjs.com/package/numesis} NPM Package
 */
class Numesis {

    /**
     * Binary character set - 01
     */
    public static readonly BIN = '01';

    /**
     * Octal character set - 01234567
     */
    public static readonly OCT = '01234567';

    /**
     * Decimal character set - 0123456789
     */
    public static readonly DEC = '0123456789';

    /**
     * Hexadecimal character set - 0123456789ABCDEF
     */
    public static readonly HEX = '0123456789ABCDEF';

    /**
     * Default character set - abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
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
     * @param str Encoded string that will be decoded
     * @returns decoded number
     */
    private decode_process(str: string): number {
        var decoded = 0;
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
     * @param str Encoded string that will be decoded
     * @returns decoded number
     */
    public decode = (str: string): number => +str.split(".").map((n) => this.decode_process(n)).join(".")

    /**
     * Alias for decode
     */
    public d = this.decode;

    public encode_trail(len: number, ...args: Array<number | string>): string {
        const encoded = this.encode(...args);
        return encoded.length > len ? encoded : encoded.padStart(len, this.charset[0]);
    }

    public trail = this.encode_trail;
    public t = this.encode_trail;

    public encode_block(size: number, separator: string, ...args: Array<number | string>): string {
        var arr = this.encode(...args).split("").reverse();
        // if arr is not divisible by size, add charset[0] to the end until it is divisible by size
        while (arr.length % size !== 0) arr.push(this.charset[0]);
        var pre: string[] = arr.reverse();

        // group the array into blocks of size
        var blocks: string[] = []
        while (pre.length > 0) blocks.push(pre.splice(0, size).join(""));

        // return the blocks joined by the separator
        return blocks.join(separator);
    }

    public block = this.encode_block
    public b = this.encode_block
}

export default Numesis