const Numesis = require('./mod')
const n = new Numesis();
let ts = Date.now();
let de = [];
let dp = [];
for(let i = 999999999; i < 1000001999; i++){
    const e = n.e(i);
    if (de.includes(e)) dp.push(e);
    de.push(e);
}
let te = Date.now();
console.log(`\n===========================================`);
console.log("Generated ID's \t\t\t:", de.length);
console.log("Duplicated ID's \t\t:", dp.length);
console.log("Elapsed time \t\t\t:", (te - ts) / 1000, "s");