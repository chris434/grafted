<script lang="ts">
import TreeBar from "../components/treeBar.svelte";
import TreeFilter from "../components/treeFilter.svelte";
import {getTrees}from '../contexts/treeContext'
import { printDate } from "../utils/date";
import { sortTrees } from "../utils/trees";
import type { TreeFilters } from "../data/filters";

const trees=getTrees()
let filterValue:TreeFilters|''=''


    
type SelectDateCategorys='today'|'yesterday'|'earlier'
function selectDateCategory(key:SelectDateCategorys,date:number,i:number){
const previousTree=$trees[i-1]
const DATE_MAP={
	created:'createdDate',
	'A-Z':'',
	opened:'openedDate',
	updated:'updatedDate'

}as const

if(!filterValue|| filterValue==='A-Z'||filterValue==='updated'&&!$trees[i].updatedDate) return false


const dateField=  DATE_MAP[filterValue]
const DATE_CATEGORYs={
	today:!i&& printDate({date})===printDate(),
	yesterday:printDate({day:-1})===printDate({date})&&previousTree&&printDate({date:previousTree[dateField]}) !==printDate({date}||!i),
	earlier:printDate({day:-1})> printDate({date})&&printDate()!==printDate({date})&&previousTree&&printDate({date:previousTree[dateField]})>=printDate({day:-2}||!i) 
}
return DATE_CATEGORYs[key]
	}

	
</script>
<main class="h-[calc(100%-72px)] overflow-scroll">
<TreeFilter bind:filterValue/>
<ul  class="p-5">
	{#each sortTrees(filterValue,$trees) as {id,name,createdDate,openedDate,updatedDate},i}
    {@const date= filterValue==='opened'?openedDate:filterValue==='updated'?updatedDate:createdDate}
	{#if filterValue!=='A-Z'&& date}
	{#if selectDateCategory('today',date,i)}
	<div class="text-xl">Today</div>
	{:else if selectDateCategory('yesterday',date,i)}
	<div class="text-xl">Yesterday</div>
	{:else if selectDateCategory('earlier',date,i)} 
	<div class="text-xl">Earlier</div>
	{/if}
	{/if}

	{#if date}
    <TreeBar {id} {name} {date}filter={filterValue==='A-Z'?'created':filterValue}/>
	<hr class='border-1 border-black'/>
	{/if}
	{/each}
</ul>
</main>
