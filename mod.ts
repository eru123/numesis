class Numesis {
    public readonly charset;
    constructor(chartset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
        this.charset = Array.from(new Set(chartset.split("")))
    }
    private encode_process(number: number | string, current = ""): string {
        number = parseInt("" + number)                      
        const length: number = this.charset.length          
        const lastIndex: number = length - 1                
        const set: Array<string> = this.charset             
        if (number <= lastIndex) return "" + (set[number] + current); 
        const m: number = number % length;                  
        current = m > 0 && m <= length ? set[m] + current : set[0] + current 
        const d: number = parseInt((number / length) + ""); 
        return this.encode_process(d, current)              
    }
    ep: Function = this.encode_process
    encode(...args){
        return args
            .map((n) => {
                const str = String(n)                    
                if (/\./i.test(str)) {                   
                    const st = str.split(".")            
                    
                    return `${this.encode_process(+st[0] || 0)}.${this.encode_process(+st[1] || 0)}`
                }

                return this.encode_process(n)
            })
            .join("")
    }
    e: Function = this.encode.bind(this)
}

export default Numesis;