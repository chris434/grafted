import { writable } from 'svelte/store'
import type {Tree} from '../types/treeTypes'

function TreesStore() {
    const { subscribe, update, set } = writable<Tree[]>([])
    return { subscribe, update, set }
}
export type TreeStoreType = ReturnType<typeof TreesStore>



export const createTreesStore =TreesStore()