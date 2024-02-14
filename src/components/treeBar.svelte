<script lang="ts">
	import IconButton from "./iconButton.svelte";
	import IconWithText from "./iconWithText.svelte";
    import type {ExtendedMouseEvent}from '../types/eventTypes'
	import { FormatData } from "../utils/date";
	import type { TreeFilters } from "../types/treeTypes";

    export let name:string
    export let date:number
    export let filter:TreeFilters
    export let id:String
    let disableLink:boolean

    function linkHandler(e:ExtendedMouseEvent<HTMLAnchorElement>){
         if(disableLink)e.preventDefault()
        disableLink = false
    }

</script>

<li>
    <a on:click={linkHandler} href="/{id}" class="w-full p-1 pl-5 pr-5 flex relative hover:text-white items-center rounded-3xl gap-3 hover:bg-green-400">
    <div class="w-full flex justify-between flex-col gap-4 sm:flex-row">
     <IconWithText text={name} icon='format-text'/>
    <IconWithText text="{filter}: {FormatData(date)}" icon='date-range'/>
    </div>
   <IconButton className="absolute sm:static top-0 right-0" on:click={() => disableLink=true }   hover="hover:bg-green-300" icon="dots-vertical"/>
    </a>
</li>