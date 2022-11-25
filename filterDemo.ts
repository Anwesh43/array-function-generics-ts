function filter<T>(arr : Array<T>, cb : (T) => boolean) : Array<T> {
    const result : Array<T> = []
    for (let a of arr) {
        if (cb(a)) {
            result.push(a)
        }
    }
    return result 
}

console.log(filter<number>([1, 2, 3, 4, 5, 6, 7, 8, 9], (i : number) : boolean => i % 3 == 0))
