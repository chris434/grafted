


export function getTodaysDate() {
    return Date.now()
}
function getFullDate(date?: number) {
    if(date)return new Date(date)
    return new Date()
}

export function printDate(dateOptions?:{date?: number,day?: number,month?: number,year?: number}) {
    const fullDate = getFullDate(dateOptions?.date)
    const day=fullDate.getDate()+(dateOptions?.day||0)
    const month = fullDate.getMonth()+(dateOptions?.month||0)
    const year = fullDate.getFullYear() + (dateOptions?.year || 0)
    return `${day}-${month}-${year}`
}


export function FormatData(date: number) {
    const todaysDate = printDate()
    const pastDate = printDate({ date })
    const dateConfig= todaysDate===pastDate ?{timeStyle: 'short'}as const:{dateStyle: 'medium'} as const
    const formattedDate = new Intl.DateTimeFormat('en-GB', dateConfig).format(getFullDate(date))
    return formattedDate
}