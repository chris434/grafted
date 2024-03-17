<script lang="ts">
	import { getSelectedNode } from "../contexts/selectedNodeContext";
	import { getTrees } from "../contexts/treeContext";
	import { getTreeIndex } from "../contexts/treeIndexContext";
	import type {Node } from "../types/treeTypes";
    import type {ExtendedMouseEvent } from "../types/eventTypes";
	import IconButton from "./iconButton.svelte";

    export let node:Node
   export let selected=false
   export let offset:number
   
    const ICONS={'false':'chevron-up','true':'chevron-down'} as const
    const treeIndex=getTreeIndex()
    const {toggleNode}=getTrees()
    const selectedId=getSelectedNode()
    const {setSelected}= selectedId
    let toggleClicked=false

    $:isSelected=$selectedId===node.id

    function updateNode(){
        toggleNode(node.id,treeIndex)
        setSelected(node.id)
    }

    function selectHandler(){

console.log(2)
    if(!toggleClicked){
        if(node.open &&!isSelected ){
        setSelected(node.id)
        }else{
        updateNode()
        }
   
    }
    toggleClicked=false
    }

    function toggleNodeHandler(e:CustomEvent){
        toggleClicked=true
        e.stopPropagation()
       updateNode()
      }

</script>
<ul  class="list-none w-full">
<li>
<button  style:padding-left="{offset}rem" id='node' on:click={selectHandler} class="p-3 w-full {!isSelected?'hover:bg-green-200':''}  text-2xl flex gap-3 items-center {isSelected?'bg-green-400 text-white':''}">
 {#if node.children.length}
 <IconButton hover={"hover:bg-green-300"} icon={ICONS[`${node.open}`]} on:click={toggleNodeHandler}/>
 {/if}
    <div>{node.label}</div>  
</button>
{#if node.open}

{#each node.children as child }
    <svelte:self node={child} offset={offset+1}/>
{/each}
{/if}
</li>
</ul>