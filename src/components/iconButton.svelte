<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    export let icon:string
    const dispatch=createEventDispatcher()
</script>

<button on:click={()=>dispatch('click')} class="text-2xl p-3 text-black hover:bg-gray-300 rounded-full flex items-center" >
    <iconify-icon class="text-2xl" icon="mdi:{icon}"></iconify-icon>
</button>