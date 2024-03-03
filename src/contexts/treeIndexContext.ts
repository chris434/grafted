import { page} from '$app/stores';
import {get} from 'svelte/store'
import { getContext, setContext } from "svelte";
import { createTreesStore } from "../stores/treeStore";


export function getTreeIndex() {
    return getContext('treeIndex')as number
}

export function setTreeIndex() {
    const trees = get(createTreesStore)
    const { id } = get(page).params
    
    const index = trees.findIndex(tree => tree.id === id)
    
    setContext('treeIndex',index)
}