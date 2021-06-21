class Numesis {
    c;
    constructor(ch = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"){
        this.c = {
            s: ch,
            l: ch.length,
            i: ch.length - 1,
            a: ch.split("")
        };
    }
    ep(n, c = "") {
        n = Math.floor(n);
        const { l , i , a  } = this.c;
        if (n <= i) return a[n] + c;
        const m = n % l;
        c = m > 0 && m <= l ? a[m] + c : a[0] + c;
        const d = Math.floor(n / l);
        return this.ep(d, c);
    }
    e(n) {
        const str = String(n);
        if (str.includes(".")) {
            const st = str.split(".");
            return `${this.ep(Number(st[0]) || 0)}.${this.ep(Number(st[1]) || 0)}`;
        }
        return this.ep(n);
    }
    dp(e) {
        if (e.length == 0) return NaN;
        let d = 0;
        const y = e.split("");
        const yl = y.length;
        const { a , l  } = this.c;
        const find = (l1)=>a.findIndex((e)=>e == l1
            )
        ;
        const zeros = (z)=>{
            let zr = "";
            for(let zi = 0; zi < z; zi++)zr += "0";
            return Number("1" + zr);
        };
        for(let i = 0; i < yl; i++)d += i == yl - 1 ? find(y[i]) : find(y[i]) * (l * zeros(yl - i - 2));
        return d;
    }
    d(e) {
        if (e.includes(".")) {
            const st = e.split(".");
            return Number(`${this.dp(st[0] || "")}.${this.dp(st[1] || "")}`);
        }
        return this.dp(e);
    }
}

module.exports = Numesis;