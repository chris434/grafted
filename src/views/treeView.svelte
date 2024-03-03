<script lang='ts'>
	import ActionBar from "../components/actionBar.svelte";
	import TextForm from "../components/textForm.svelte";
	import ToolBar from "../components/toolBar.svelte";
	import TreeNode from "../components/treeNode.svelte";
	import {getTrees}from '../contexts/treeContext'
	import { getTreeIndex } from "../contexts/treeIndexContext";
	const trees=getTrees()
	const {updateName}=trees
	const treeIndex=getTreeIndex()

	$: tree=$trees[treeIndex]
	$: value =tree?.name
	$: root=tree?.root
	function updateNameHandler(value:string){
		const hasName=updateName(value,treeIndex)
		if(hasName) return 'name is already taken'
		return ''
	}
</script>



<ToolBar>
<TextForm submitCb={updateNameHandler} nullHandler='fallback' placeholder="name" {value}/>
</ToolBar>


<div class="flex justify-center w-full h-[80%]">
 <main class="lg:w-6/12 md:w-8/12 sm:w-9/12 w-full  border-2 border-green-500 m-5">
<ActionBar/>
{#if root}
<ul>
<TreeNode node={root}/>
</ul>
{/if}
</main>
</div>


