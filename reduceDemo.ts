function reduceDemo<T, R>(arr : Array<T>, cb : (argo : R, arg1 : T) => R, initialValue : R) : R {
    let result = initialValue 
    for (let a of arr) {
        result = cb(result, a)
    }
    return result 
}

console.log(reduceDemo<number, string>([1, 2, 3, 4, 5], (prev : string, n : number) : string => `${prev}${prev !== "" ? "+++++++" : ""}${n}`, ''))
