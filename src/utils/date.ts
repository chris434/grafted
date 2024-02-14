

export function getTodaysDate() {
    return Date.now()
}
function getFullDate(date?: number) {
    if(date)return new Date(date)
    return new Date()
}

function printDate(date?: number) {
     const fullDate = getFullDate(date)
    const day=fullDate.getDate()
    const month = fullDate.getMonth()
    const year = fullDate.getFullYear()
    return `${day}-${month}-${year}`
}


export function FormatData(date: number) {
    const todaysDate = printDate()
    const pastDate = printDate(date)
    const dateConfig= todaysDate===pastDate ?{timeStyle: 'short'}as const:{dateStyle: 'medium'} as const
    const formattedDate = new Intl.DateTimeFormat('en-GB', dateConfig).format(getFullDate(date))
    return formattedDate
}