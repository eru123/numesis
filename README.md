[![DeepScan grade](https://deepscan.io/api/teams/18125/projects/21443/branches/616385/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=18125&pid=21443&bid=616385)
[![CodeFactor](https://www.codefactor.io/repository/github/eru123/numesis/badge)](https://www.codefactor.io/repository/github/eru123/numesis)
# numesis
A Custom Number System, allows you to define your own number system by changing the base of the number system and design your own characters set

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

## Usage
### With deno
```js
import Numesis from 'https://deno.land/x/numesis/mod.ts'
const num = new Numesis(Numesis.DEFAULT); 

const encoded = num.encode(999); // P7Ct
```
### With nodejs
```js
const Numesis = require('numesis')
const num = new Numesis(Numesis.DEFAULT); 

const encoded = num.encode(999); // P7Ct
```

### Examples
```js
// Presets
const hex = new Numesis(Numesis.HEX); // 0123456789ABCDEF
const dec = new Numesis(Numesis.DEC); // 0123456789
const bin = new Numesis(Numesis.BIN); // 01
const oct = new Numesis(Numesis.OCT); // 01234567
const def = new Numesis(Numesis.DEFAULT); // abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789

// Create custom charset
const custom = new Numesis('abcdef');

// Basic Encoding Examples
console.log(`Hex value of 255 is ${hex.encode(255)}`); // Hex value of 255 is FF
console.log(`Oct value of 255 is ${oct.encode(255)}`); // Oct value of 255 is 377
console.log(`Dec value of 255 is ${dec.encode(255)}`); // Dec value of 255 is 255
console.log(`Bin value of 255 is ${bin.encode(255)}`); // Bin value of 255 is 11111111

// Basic Decoding Examples
console.log(`Hex value of FF is ${hex.decode("FF")}`); // Hex value of FF is 255
console.log(`Oct value of 377 is ${oct.decode("377")}`); // Oct value of 377 is 255
console.log(`Dec value of 255 is ${dec.decode("255")}`); // Dec value of 255 is 255
console.log(`Bin value of 11111111 is ${bin.decode("11111111")}`); // Bin value of 11111111 is 255

// Convert RGB Color
console.log(`Convert RGB(255,255,255) to HEX is ${hex.encode(255,255,255)}`); // Covert RGB(255,255,255) to HEX is FFFFFF

// Trailing Zeroes
const bin_len = 4;
console.log(`Bin value of 2 is ${bin.encode(2)}`); // Bin value of 2 is 10
console.log(`Bin value of 2 with trailing is ${bin.trail(bin_len, 2)}`); // Bin value of 2 is 0010
console.log(`Decoded bin value of 0010 is ${bin.decode("0010")}`); // Decoded bin value of 0010 is 2

// Block Encoding
const delimiter = "-";
console.log(`Bin value of 50 is ${bin.encode(50)}`); // Bin value of 50 is 110010
console.log(`Bin value of 50 with block is ${bin.block(bin_len, delimiter, 50)}`); // Bin value of 50 with block is 0011-0010
console.log(`Decoded bin value of 0011-0010 is ${bin.decode("0011-0010", delimiter)}`); // Decoded bin value of 0011-0010 is 50

```
