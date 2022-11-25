function map<T,R>(array : Array<T>, cb : (T) => R) : Array<R> {
    const result : Array<R> = []
    for (let i = 0; i < array.length; i++) {
        result.push(cb(array[i]))
    }
    return result 
}

console.log(map<number, string>([1, 2, 3, 4, 5], (a : number) : string  => `Hello ${a}`))