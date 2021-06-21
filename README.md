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