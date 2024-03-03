<script>
	import { browser } from '$app/environment';
	import {page} from '$app/stores';
	import { afterUpdate, beforeUpdate } from 'svelte';
	import { getTrees } from "../../contexts/treeContext";
	import { setLocalStorage } from '../../utils/localStorage';
	import TreeView from "../../views/treeView.svelte";
	const trees=getTrees()
	const {updateDate}=trees
	const {id}=$page.params
	let hasUpdated=false

	updateDate('openedDate',id)
	
	beforeUpdate(()=>{
		if(hasUpdated)updateDate('updatedDate',id)
		hasUpdated=true
	})

	afterUpdate(()=>{
	 browser&&setLocalStorage('trees',$trees)
	})
	
</script>

{#if $trees}
<TreeView/>
{/if}