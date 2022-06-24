const Numesis = require('./mod')

async function test(s) {
    const n = new Numesis();
    return new Promise((resolve) => {
        let te;
        const ts = Date.now();
        const de = [];
        let i = 0;
        while (true) {
            de.push(n.e(i++));
            te = Date.now();
            if (te - ts >= s * 1000) return resolve({
                start: ts,
                end: te,
                id: de
            });
        }
    });
}
async function average(s) {
    const id = [];
    const dup = [];
    for (let i = 0; i < s; i++) {
        await test(1).then(({ id: e }) => {
            id.push(e.length);
            dup.push(e.length - new Set(e).size);
        });
    }
    const avg = id.reduce((a, b) => a + b, 0) / id.length;
    const avgDup = dup.reduce((a, b) => a + b, 0) / dup.length;
    console.log(`\n=====================================================`);
    console.log("Average ID's:", ~~avg, "/s");
    console.log(`Average duplicated ID's: ${~~avgDup}/s`);
    console.log(`Elapsed time: ${s}s`);
}
test(1).then((e) => {
    console.log(`\n=====================================================`);
    console.log("Average Generated ID's \t\t\t:", e?.id?.length);
    console.log("Average Duplicated ID's \t\t:", e?.id?.length - new Set(e?.id).size);
    console.log("Elapsed time \t\t\t\t:", (e?.end - e?.start) / 1000, "s");
    return 0;
});
average(10);