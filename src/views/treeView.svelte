<script lang='ts'>
	import ActionBar from "../components/actionBar.svelte";
	import TextField from "../components/textField.svelte";
	import TextForm from "../components/textForm.svelte";
	import ToolBar from "../components/toolBar.svelte";
	import {getTrees}from '../contexts/treeContext'
	import { getTreeIndex } from "../contexts/treeIndexContext";
	const trees=getTrees()
	const {updateName}=trees
	const treeIndex=getTreeIndex()

	let value =$trees[treeIndex]?.name
	function updateNameHandler(value:string){
		const hasName=updateName(value,treeIndex)
		if(hasName) return 'name is already taken'
		return ''
	}
</script>



<ToolBar>
<TextForm submitCb={updateNameHandler} nullHandler='fallback' placeholder="name" {value}/>
</ToolBar>

{#if $trees[0]}
<div class="flex justify-center w-full h-[80%]">
 <main class="lg:w-6/12 md:w-8/12 sm:w-9/12 w-full  border-2 border-green-500 m-5">
<ActionBar/>
</main>

</div>
{:else}
  <svg class="animate-spin h-6/12 w-6/12 rounded-full mr-3 bg-green-400" viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
{/if}

