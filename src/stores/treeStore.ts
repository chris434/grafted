import { writable } from 'svelte/store'
import { goto } from '$app/navigation';
import { v4 as uuid } from 'uuid';
import type {Tree,Node} from '../types/treeTypes'
import { findNode, getNextChildId, getNextNameNumber } from '../utils/trees'
import { getTodaysDate } from '../utils/date';
import { browser } from '$app/environment';
import { getLocalStorage,setLocalStorage } from '../utils/localStorage';

function TreesStore() {
    const { subscribe, update, set } = writable<Tree[]>([])

    if (browser) {
        set(getLocalStorage('trees',[]))
    }
    let trees: Tree[] = []
    subscribe((currentTrees) => {
        trees=currentTrees
    })
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
    function createNode(label: string, treeIndex: number, nodeId: string ) {
        let returnId = ''
        let root = trees[treeIndex]?.root
        let newRoot: Node | null = null

        if (!root)  newRoot = { id: 'root', label, open: true, children: [] }
        nodeHandler(nodeId, treeIndex, (node) => {
              const { children } = node
               returnId=getNextChildId(node,nodeId)
            return { ...node, open: true, children: [...children, { id:returnId, label, open: true, children: [] }] }
        },newRoot)
        return returnId
    }
    function toggleNode(nodeId: string,treeIndex:number) {
        nodeHandler(nodeId, treeIndex, (node) => {
             const {open}=node
            return {...node,open:!open}
        })
    }

    function updateDate(dateField: string, treeId: string) {
        const todaysDate = getTodaysDate()
        update(trees => {
            return trees.map(tree => {
                if (tree.id === treeId) return { ...tree, [dateField]: todaysDate }
                return tree
            }) 
            
        })
       
    }
    function updateName(name: string, i: number) {
        if (trees[i].name === name) return false
        
        const hasName = trees.some(tree => tree.name === name);
        if (hasName) return true
        trees[i].name = name
        set(trees)
    }
    function updateTrees(treeIndex:number,newRoot:Node) {
    update(trees => {
        trees[treeIndex] = { ...trees[treeIndex], root: newRoot } 
        return trees
    })
       
    }
     function nodeHandler(nodeId:string,treeIndex:number,updateCb:(node:Node) => Node,newRoot:Node|null=null) {
        let root = trees[treeIndex]?.root
        
        if (root && nodeId) {
         findNode(root, nodeId, (node) => {
            return updateCb(node)
            }, (node) => {
                newRoot = node
            })
         }
         if (newRoot) updateTrees(treeIndex, newRoot)
    }
    return { subscribe, update, set, createTree, updateDate,createNode,updateName,toggleNode }
   
}


export type TreeStoreType = ReturnType<typeof TreesStore>



export const createTreesStore =TreesStore()