<script>
	import Fab from "../components/fab.svelte";
	import TreeBar from "../components/treeBar.svelte";
	import {getTrees}from '../contexts/treeContext'

	const trees=getTrees()
	const {createTree}=trees

	
</script>
<Fab click={createTree} classes='bottom-10 left-10'>create new tree</Fab>
<ul class="p-5">
	{#each $trees as {id,name,createdDate}}
    <TreeBar {id} {name} date={createdDate} filter="created"/>
	<hr class='border-1 border-black'/>
	{/each}
</ul>
