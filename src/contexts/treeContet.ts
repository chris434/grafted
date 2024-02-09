import { getContext, setContext } from "svelte";
import { createTreesStore, type TreeStoreType} from "../stores/treeStore";

export function getTrees() {
    return getContext('trees')as TreeStoreType
}

export function setTrees() {
    setContext('trees',createTreesStore)
}