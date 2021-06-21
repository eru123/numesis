# numesis
Custom Number System

## Installation
```bash
npm i numesis

# OR

yarn add numesis
```
## Usage
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