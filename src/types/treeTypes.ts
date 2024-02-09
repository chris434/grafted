export type Tree = {
    id: string;
    name: string
    createdDate: number
    updatedDate: number
    root:Node| null
}

export type Node = {
    label: string
    children: Node[]
}
