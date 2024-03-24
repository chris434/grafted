import { writable } from 'svelte/store'
import { goto } from '$app/navigation';
import { v4 as uuid } from 'uuid';
import type {Tree,Node} from '../types/treeTypes'
import {type UpdateCbReturn,  findNode, getNextChildId, getNextNameNumber } from '../utils/trees'
import { getTodaysDate } from '../utils/date';
import { browser } from '$app/environment';
import { getLocalStorage,setLocalStorage } from '../utils/localStorage';
import { findDoubleValue } from '../utils/array';

type NodeHandlerOptions = {
    returnNode?: Node|null
    passParentNode?: boolean
}

function TreesStore() {
    const { subscribe, update, set } = writable<Tree[]>([])

    if (browser) {
        set(getLocalStorage('trees', []))
    }
    let trees: Tree[] = []
    subscribe((currentTrees) => {
        trees = currentTrees
    })
    function createTree() {
        let id: string = ''
        update((trees) => {
            id = uuid()
            const nameNumber = getNextNameNumber(trees)
            const name = `untitled_${nameNumber}`
            const todaysDate = getTodaysDate()
            const createdDate = todaysDate
            const openedDate = todaysDate

            trees.unshift({ id, name, createdDate, openedDate, root: null })
            console.log(trees)
            setLocalStorage('trees', trees)
            return trees
        })
        goto(`/${id}`)
    }
    function createNode(label: string, treeIndex: number, nodeId: string) {
        let returnNode: Node | null = null
        let root = trees[treeIndex]?.root
        let error=false

        if (!root) returnNode = { id: 'root', label, open: true, children: [] }
        nodeHandler(nodeId, treeIndex, (node,parentNode) => {
            const { children } = node
            const id = getNextChildId(node, nodeId)
            console.log(parentNode)
             error =  findDoubleValue(node.children, 'label', label) 
            console.log(error )
            returnNode = { id, label, open: true, children: [] }
            return {node:{ ...node, open: true, children: [...children, returnNode] },error}
        },{returnNode})
        return {node: returnNode,error }
    }
    function toggleNode(nodeId: string, treeIndex: number) {
        nodeHandler(nodeId, treeIndex, (node) => {
            const { open } = node
            return { node: { ...node, open: !open } }
        })
    }
    function editLabel(label: string, treeIndex: number, nodeId: string) {
        let error = false
        let newNode:Node|null=null
        nodeHandler(nodeId, treeIndex, (node,parentNode) => {
            console.log(parentNode)
            error =parentNode? findDoubleValue(parentNode.children, 'label', label):false
            newNode={...node, label}
            return {node:newNode,error}
        },{passParentNode:true})
        return {error,node:newNode}
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
     function nodeHandler(nodeId:string,treeIndex:number,updateCb:(node:Node,parentNode:Node|null) =>UpdateCbReturn,options?:NodeHandlerOptions) {
         let root = trees[treeIndex]?.root
         const returnNode = options?.returnNode
         const passParentNode = options?.passParentNode||false
         let newRoot= returnNode
         
        
        if (root && nodeId&& !returnNode) {
            findNode(root, nodeId, (node,parentNode) => {
             return  updateCb(node,parentNode||null)
            }, (node) => {
                newRoot = node
            },passParentNode)
         }
        if(newRoot)updateTrees(treeIndex, newRoot)
    }
    return { subscribe, update, set, createTree, updateDate,createNode,updateName,editLabel,toggleNode }
   
}


export type TreeStoreType = ReturnType<typeof TreesStore>



export const createTreesStore =TreesStore()