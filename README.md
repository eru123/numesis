# numesis
Custom Number System

## Installation
### NPM or Yarn 
```bash
npm i numesis

# OR

yarn add numesis
```
### Deno
import numesis module on your project directly
```js
import Numesis from 'https://deno.land/x/numesis/mod.ts'
```
## Example
```js
const hex = new Numesis("0123456789ABCDEF");
const dec = new Numesis("0123456789");
const bin = new Numesis("01");
const oct = new Numesis("01234567");

console.log(`Hex value of 255 is ${hex.e(255)}`);
// Output: Hex value of 255 is FF

console.log(`Oct value of 255 is ${oct.e(255)}`);
// Output: Oct value of 255 is 377

console.log(`Dec value of 255 is ${dec.e(255)}`);
// Output: Dec value of 255 is 255

console.log(`Bin value of 255 is ${bin.e(255)}`);
// Output: Bin value of 255 is 11111111

// Convert RGB Color
console.log(`Convert RGB(255,255,255) to HEX is ${hex.e(255,255,255)}`); 
// Output: Covert RGB(255,255,255) to HEX is FFFFFFFF
```
## Usage
### With deno
```js
import Numesis from 'https://deno.land/x/numesis/mod.ts'

const n = new Numesis(); 

// Encode
const encoded = n.e(999); // output: P7Ct
```
### Basic
```js
const Numesis = require('numesis')

const n = new Numesis(); 

// Encode
const encoded = n.e(999); // output: P7Ct
```
### Custom
```js
const Numesis = require('numesis')

// Default charset
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const n = new Numesis(charset); 

// Encode
const encoded = n.e(999); // output: P7Ct
```