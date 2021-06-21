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
}

module.exports = Numesis;