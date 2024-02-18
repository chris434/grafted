export type Tree = {
    id: string;
    name: string
    createdDate: number
    updatedDate: number
    openedDate: number
    root:Node| null
}

export type Node = {
    label: string
    children: Node[]
}

export type TreeFilters ='created'|'last opened'|'last updated'|'a-z'