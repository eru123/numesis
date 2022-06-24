// Deno compatible only
import Numesis from './mod.ts'

async function test(s: number): Promise<{
	id: string[],
	start: number,
	end: number,
}> {
	const n = new Numesis();
	return new Promise((resolve) => {
		const ts = Date.now()
		let te = +ts;
        const de: string[] = []
        let i = 0;
        while (te - ts < s * 1000) {
            de.push(n.e(i++))
            te = Date.now()
        }
		return resolve({ start: ts, end: te, id: de })
	})
}

async function average(s: number) {
	const id: number[] = []
	const dup: number[] = []
	for (let i = 0; i < s; i++) {
		await test(1)
			.then(({ id: e }) => {
				id.push(e.length)
				dup.push(e.length - (new Set(e)).size)
			})
	}
	const avg = id.reduce((a, b) => a + b, 0) / id.length
	const avgDup = dup.reduce((a, b) => a + b, 0) / dup.length
	console.log(`\n=====================================================`)
	console.log("Average ID's:", ~~avg, "/s")
	console.log(`Average duplicated ID's: ${~~avgDup}/s`)
	console.log(`Elapsed time: ${s}s`)
}

test(1)
	.then((e) => {
		console.log(`\n=====================================================`)
		console.log("Average Generated ID's \t\t\t:", e?.id?.length)
		console.log("Average Duplicated ID's \t\t:", e?.id?.length - (new Set(e?.id)).size)
		console.log("Elapsed time \t\t\t\t:", (e?.end - e?.start) / 1000, "s")
		return 0;
	})

average(10)

