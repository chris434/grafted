<script lang="ts">
import { browser } from "$app/environment";
import Button from "../components/button.svelte";
import Select from "../components/select.svelte";
import ToolBar from "../components/toolBar.svelte";
import { TREE_FILTERS } from "../data/filters";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

    let defaultFilterValue=''

    if(browser)defaultFilterValue=getLocalStorage<string>('filter','')
   export let filterValue=''
   $:(filterValue= defaultFilterValue?defaultFilterValue:TREE_FILTERS[0])



</script>

<ToolBar>
    <Select bind:value={filterValue}  componentLabel={true} label="filter" options={[...TREE_FILTERS]}>
      <iconify-icon class="text-2xl" icon="mdi:filter-variant"></iconify-icon>
    </Select>
    <Button click={()=>setLocalStorage('filter',filterValue)}>set default</Button>
</ToolBar>
