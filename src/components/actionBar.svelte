<script lang="ts">
	import { getTrees } from "../contexts/treeContext";
import IconButton from "./iconButton.svelte";
	import TextField from "./textField.svelte";
  import type {Node} from '../types/treeTypes'
	import { getTreeIndex } from '../contexts/treeIndexContext';
	import { getSelectedNode } from "../contexts/selectedNodeContext";
  export let root:Node|null
  let selected=getSelectedNode()
  const {setSelected}=selected
  let nodesToDelete=[]
const {createNode}=getTrees()
const treeIndex=getTreeIndex()

    let addToggle =false
    let errorMessage=''
    let value =''

    function submit() {
    if(!value) return errorMessage='key is required'
    errorMessage=''
   const id= createNode(value,treeIndex,$selected)
   setSelected(id)
    addToggle=false
  }

  $:if(!$selected) addToggle=false

  function toggleValue(){
     addToggle=!addToggle
     value=''
  }
  

</script>
<section class="bg-gray-100 p-2 w-full shadow-md">
  <div class="flex items-center gap-3 h-[48px]">
    {#if !root||$selected}
      <IconButton  on:click={toggleValue} icon="add"/>
    {/if}
    {#if $selected}
    <IconButton icon="edit"/>
    {/if}
    {#if nodesToDelete.length}
    <IconButton icon="trash"/>
    {/if}
  </div>
  {#if addToggle}
<form on:submit|preventDefault={submit}>
    <TextField bind:value bind:errorMessage selected placeholder="text"/>
</form>

  {/if}
</section>