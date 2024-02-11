<script>
	import Fab from "../components/fab.svelte";
	import {getTrees}from '../contexts/treeContext'

	const {createTree}=getTrees()

	
</script>
<Fab click={createTree} classes='bottom-10 left-10'>create new tree</Fab>
