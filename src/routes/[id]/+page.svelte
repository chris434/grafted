<script>
	import { browser } from '$app/environment';
	import {page} from '$app/stores';
	import { getTrees } from "../../contexts/treeContext";
	import { setLocalStorage } from '../../utils/localStorage';
	import TreeView from "../../views/treeView.svelte";
	const trees=getTrees()
	const {updateDate}=trees
	const {id}=$page.params
	updateDate('openedDate',id)
	$:$trees,(
	browser&&setLocalStorage('trees',$trees)
	)
</script>
<TreeView/>