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
    charset;
    /**
     * @param {String} chartset A non-duplicate character set, that will be use in creating new number system
     */
    constructor(chartset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"){
        this.charset = Array.from(new Set(chartset.split("")));
    }
    /**
     * A recursive method that encodes the n variable to custom number system
     * @param {number|string} number    The number that will be decoded
     * @param {string} current    The current string in the recursion
     *
     * @return {String} encoded string
     */
    encode_process(number, current = "") {
        number = parseInt("" + number);
        const length = this.charset.length;
        const lastIndex = length - 1;
        const set = this.charset;
        if (number <= lastIndex) return "" + (set[number] + current);
        const m = number % length;
        current = m > 0 && m <= length ? set[m] + current : set[0] + current;
        const d = parseInt(number / length + "");
        return this.encode_process(d, current);
    }
    /**
     * Alias for encode_process
     */
    ep = this.encode_process;
    /**
     * A public method that encodes n paramenter to custom number system
     * @param {number|string} args numbers that will be decoded
     *
     * @return {String} encoded string
     */
    encode(...args) {
        return args.map((n)=>{
            const str = String(n);
            if (/\./i.test(str)) {
                const st = str.split(".");
                return `${this.encode_process(+st[0] || 0)}.${this.encode_process(+st[1] || 0)}`;
            }
            return this.encode_process(n);
        }).join("");
    }
    /**
     * Alias for encode
     */
    e = this.encode.bind(this);
}
module.exports = Numesis;
