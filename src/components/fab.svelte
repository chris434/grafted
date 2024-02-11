<script lang="ts">
   
    export let classes:string=''
    export let click=()=>{}
</script>



<button on:click={click} class="{classes} fixed p-3 bg-green-500 text-white text-xl hover:bg-transparent hover:text-green-500 rounded-xl border-2 border-green-500">
    <slot/>
</button>