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
     * A non-duplicate character set, that will be use in creating new number system
     * @type {Set<string>}
     */
    public readonly charset: Array<string>;

    /**
     * @param {String} chartset A non-duplicate character set, that will be use in creating new number system
     */
    constructor(chartset: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
        // Recreate an array of characters without duplicates
        this.charset = Array.from(new Set(chartset.split("")))
    }

    /**
     * A recursive method that encodes the n variable to custom number system
     * @param {number|string} number    The number that will be decoded
     * @param {string} current    The current string in the recursion
     *
     * @return {String} encoded string
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
     * Alias for encode_process
     */
    ep: Function = this.encode_process

    /**
     * A public method that encodes n paramenter to custom number system
     * @param {number|string} args numbers that will be decoded
     *
     * @return {String} encoded string
     */
    encode(...args: Array<number | string>): string {
        return args
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
    e: Function = this.encode.bind(this)
}

export default Numesis