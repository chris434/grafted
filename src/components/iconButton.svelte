<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    export let icon:string
    export let hover='hover:bg-gray-300'
    export let className=''
    const dispatch=createEventDispatcher()
</script>

<button  on:click={()=>dispatch('click')} class=" {className} text-2xl p-3 {hover} rounded-full flex items-center" >
    <iconify-icon class="text-2xl" icon="mdi:{icon}"></iconify-icon>
</button>