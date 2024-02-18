<script lang="ts">
	import TreeBar from "../components/treeBar.svelte";
	import {getTrees}from '../contexts/treeContext'
	import { printDate } from "../utils/date";

	const trees=getTrees()

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
<ul class="p-5">
	{#each $trees as {id,name,createdDate},i}
	{#if selectDateCategory('today',createdDate,i)}
	<div class="text-xl">Today</div>
	{:else if selectDateCategory('yesterday',createdDate,i)}
	<div class="text-xl">Yesterday</div>
	{:else if selectDateCategory('earlier',createdDate,i)} 
	<div class="text-xl">Earlier</div>
	{/if}
    <TreeBar {id} {name} date={createdDate} filter="created"/>
	<hr class='border-1 border-black'/>
	{/each}
</ul>