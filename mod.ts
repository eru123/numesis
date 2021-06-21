class Numesis {
	public readonly c: {s:string,l:number,i:number,a: Array<string>};
	constructor(ch:string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"){
		this.c = {
			s: ch,
			l: ch.length,
			i: ch.length - 1,
			a: ch.split("")
		}
	}
	private ep(n:number, c = ""): string {
		n = Math.floor(n)
		const {l,i,a} = this.c
		if(n <= i) return a[n] + c;
		const m: number = n % l;
		c = m > 0 && m <= l ? a[m] + c : a[0] + c
		const d: number = Math.floor(n / l);
		return this.ep(d,c)
	}
	e(n:number): string {
		const str = String(n)
		if(str.includes(".")) {
			const st = str.split(".")
			return `${this.ep(Number(st[0]) || 0)}.${this.ep(Number(st[1]) || 0)}`
		}
		return this.ep(n)
	}
}

export default Numesis;