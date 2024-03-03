<script lang="ts">
	import type {Node } from "../types/treeTypes";

    export let node:Node
   export let selected=false
    const ICONS={'false':'chevron-up','true':'chevron-down'} as const

    function selectNode(){
        selected =!selected
    }
</script>

<li>
<button on:click={selectNode} class="p-3 w-full text-2xl flex gap-3 items-center {selected?'bg-green-400 text-white':''}">
 <iconify-icon icon="mdi:{ICONS[`${selected}`]}"></iconify-icon>
    <div>{node.label}</div>  
</button>
</li>