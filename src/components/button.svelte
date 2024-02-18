<script lang="ts">
    export let click=()=>{}
</script>



<button on:click={click} class="p-2 bg-green-500 text-white text-md hover:bg-white hover:text-green-500 border-2 border-green-500">
    <slot/>
</button>