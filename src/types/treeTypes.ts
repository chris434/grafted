export type Tree = {
    id: string;
    name: string
    createdDate: number
    updatedDate?: number
    openedDate: number
    root:Node| null
}

export type TreeWithUpdatedDateNumber = Omit<Tree,'updatedDate'>&{updatedDate:number}
export type TreeDateFields= keyof Pick<Tree,'createdDate'|'openedDate'|'updatedDate'>

export type Node = {
    id:string;
    label: string
    open:boolean
    children: Node[]
}

export type TreeFilters ='created'|'last opened'|'last updated'|'a-z'