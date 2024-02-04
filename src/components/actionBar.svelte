<script>
	import IconButton from "./iconButton.svelte";

    const ICONS=['add','edit','trash']

</script>
<section class="bg-gray-100 p-2 w-full flex shadow-md items-center gap-3">
  {#each ICONS as icon}
    <IconButton {icon}/>
  {/each}
</section>