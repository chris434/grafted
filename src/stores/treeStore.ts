import { writable } from 'svelte/store'
import { goto } from '$app/navigation';
import { v4 as uuid } from 'uuid';
import type {Tree} from '../types/treeTypes'
import { getNextNameNumber } from '../utils/trees'
import { getTodaysDate } from '../utils/date';
import { browser } from '$app/environment';
import { getLocalStorage,setLocalStorage } from '../utils/localStorage';

function TreesStore() {
    const { subscribe, update, set } = writable<Tree[]>([])

    if (browser) {
        set(getLocalStorage('trees',[]))
    }
    function createTree() {
        let id:string=''
        update((trees) => {
            id=uuid()
            const nameNumber = getNextNameNumber(trees)
            const name = `untitled_${nameNumber}`
            const todaysDate = getTodaysDate()
            const updatedDate = todaysDate
            const createdDate=todaysDate

            trees.push({ id, name, updatedDate, createdDate, root: null })
           setLocalStorage('trees',trees)
            return trees
        })
        goto(`/${id}`)
    }
    return { subscribe, update, set,createTree }
}
export type TreeStoreType = ReturnType<typeof TreesStore>



export const createTreesStore =TreesStore()