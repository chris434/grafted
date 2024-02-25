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
            const createdDate = todaysDate
            const openedDate= todaysDate

            trees.unshift({ id, name, createdDate, openedDate, root: null })
            console.log(trees)
           setLocalStorage('trees',trees)
            return trees
        })
        goto(`/${id}`)
    }
      function createNode(label: string,treeId:string) {
     update(trees => {
            return trees.map(tree => {
                if (tree.id === treeId) return { ...tree, root: { label, children: [] } }
                return tree
            }) 
            
        })
}
    function updateDate(dateField: string, treeId: string) {
        const todaysDate = getTodaysDate()
        console.log('kj')
        update(trees => {
            return trees.map(tree => {
                if (tree.id === treeId) return { ...tree, [dateField]: todaysDate }
                return tree
            }) 
            
        })
       
    }
    return { subscribe, update, set, createTree, updateDate,createNode }
   
}


export type TreeStoreType = ReturnType<typeof TreesStore>



export const createTreesStore =TreesStore()