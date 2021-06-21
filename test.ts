import Numesis from './mod.ts'

const n = new Numesis();
const countStart = 999999999
const countEnd = 1000001999

let ts = Date.now()
let de: string[] = []
let dp: string[] = []

for(let i = countStart;i < countEnd;i++){
	const e = n.e(i)
	if(de.includes(e)) dp.push(e)
	de.push(e)
}
let te = Date.now()
console.log(`\n===========================================`)
console.log("Generated ID's \t\t\t:",de.length)
console.log("Duplicated ID's \t\t:",dp.length) // should be 0 to pass
console.log("Elapsed time \t\t\t:", (te - ts)/1000,"s")