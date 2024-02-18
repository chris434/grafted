<script lang="ts">
import TreeBar from "../components/treeBar.svelte";
import TreeFilter from "../components/treeFilter.svelte";
import {getTrees}from '../contexts/treeContext'
import { printDate } from "../utils/date";
import { sortTrees } from "../utils/trees";

const trees=getTrees()
let filterValue=''
    
type SelectDateCategorys='today'|'yesterday'|'earlier'
function selectDateCategory(key:SelectDateCategorys,date:number,i:number){
const previousTree=$trees[i-1]
const DATE_CATEGORYs={
	today:!i&& printDate({date})===printDate(),
	yesterday:printDate({day:-1})===printDate({date})&&previousTree&&printDate({date:previousTree.createdDate}) !==printDate({date})||!i,
	earlier:printDate({day:-1})> printDate({date})&&printDate()!==printDate({date})&&previousTree&&printDate({date:previousTree.createdDate})===printDate({day:-1}||!i) 
}
return DATE_CATEGORYs[key]
	}

	
</script>
<main class="h-[calc(100%-72px)] overflow-scroll">
<TreeFilter bind:filterValue={filterValue}/>
<ul  class="p-5">
	{#each sortTrees(filterValue,$trees) as {id,name,createdDate},i}
	{#if selectDateCategory('today',createdDate,i)}
	<div class="text-xl">Today</div>
	{:else if selectDateCategory('yesterday',createdDate,i)}
	<div class="text-xl">Yesterday</div>
	{:else if selectDateCategory('earlier',createdDate,i)} 
	<div class="text-xl">Earlier</div>
	{/if}
    <TreeBar {id} {name} date={createdDate} filter={filterValue==='A-Z'?'created':filterValue}/>
	<hr class='border-1 border-black'/>
	{/each}
</ul>
</main>
