<script>
import {page} from '$app/stores';
	import { getTrees } from "../contexts/treeContext";
import IconButton from "./iconButton.svelte";
	import TextField from "./textField.svelte";
const {id}=$page.params
const {createNode}=getTrees()
    const ICONS=['add','edit','trash']
    let addToggle =false
    let errorMessage=''
    let value =''

    function submit() {
    if(!value) return errorMessage='key is required'
    errorMessage=''
    createNode(value,id)
  }

  function toggleValue(){
     addToggle=!addToggle
     value=''
  }

</script>
<section class="bg-gray-100 p-2 w-full shadow-md">
  <div class="flex items-center gap-3">
     {#each ICONS as icon}
    <IconButton on:click={toggleValue} {icon}/>
  {/each}
  </div>
  {#if addToggle}
<form on:submit|preventDefault={submit}>
    <TextField bind:value bind:errorMessage selected placeholder="text"/>
</form>

  {/if}
</section>