import { writable } from "svelte/store";
import  type  {Node} from '../types/treeTypes'

function createStore() {
    const { set, subscribe } = writable<Node|null>(null) 
    
    function setSelected(node:Node) {
        set(node)
    }

    return {subscribe,setSelected}
}
export type SelectedNodeReturn = ReturnType<typeof createStore>
export const selectedNode=createStore()




