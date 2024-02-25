<script lang="ts" generics="T" >
    export let options:T[]
    export let value:string
    export let label:string
    export let componentLabel:boolean=false

</script>

<div class="flex items-center gap-2">
    <label for={label}>
      {#if !componentLabel}
      {label}
      {:else}
      <slot/>
      {/if}
      
    </label>
    <select id={label} class="p-2 text-lg outline-green-500" bind:value={value}>
        {#each options as option  }
            <option value={option}>{option}</option>
        {/each}
    </select>
</div>