import { writable } from "svelte/store";

function createStore() {
    const { set, subscribe } = writable('') 
    
    function setSelected(id: string) {
        set(id)
    }

    return {subscribe,setSelected}
}
export type SelectedNode = ReturnType<typeof createStore>
export const selectedNode=createStore()




