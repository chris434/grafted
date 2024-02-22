<script lang="ts">
    export let placeholder:string
    export let selected=false
    export let errorMessage =''
 let inputElm:HTMLInputElement
 export let value:string

 $:value,(
    errorMessage=''
 )


    function focus(select:HTMLInputElement){
        if(selected) select.focus()

    }
</script>
<div class="space-y-3">
<input bind:value  bind:this={inputElm}  use:focus class="bg-transparent mt-2 p-2 {errorMessage?'outline-red-400':'outline-green-500'}"{placeholder}/>
<div class="text-red-400">{errorMessage}</div>
</div>


