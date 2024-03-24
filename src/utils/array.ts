export function findDoubleValue<T>(arr:T[],key:string,checkValue:string) {
    return arr.some(value =>   value[key] === checkValue)
}