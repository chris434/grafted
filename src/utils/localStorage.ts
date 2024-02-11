export function setLocalStorage(key: string, value:unknown) {
    localStorage.setItem(key,JSON.stringify(value))
}

export function getLocalStorage<T>(key: string,fallbackValue:unknown) {
    const data = localStorage.getItem(key)
    if (data) return JSON.parse(data)
    return fallbackValue
}