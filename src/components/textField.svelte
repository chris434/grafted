<script lang="ts">
    export let placeholder:string
    export let selected=false
    export let errorMessage =''
 let inputElm:HTMLInputElement
 export let value:string
 export let blur=()=>{}
 export let blurSelected=false
 export let blurInput=false

 $:value,(
    errorMessage=''
 )

 $:if(blurInput) {
    inputElm.blur()
    blurInput=false
}


 function focus(select:HTMLInputElement){
        if(selected) select.focus()

    }
    function onBlur(){
        if(blurSelected) inputElm.focus()
        blur()
    }
</script>
<div class="space-y-3">
<input on:blur={()=>onBlur()} bind:value  bind:this={inputElm}  use:focus class="bg-transparent mt-2 p-2 {errorMessage?'outline-red-400':'outline-green-500'}"{placeholder}/>
<div class="text-red-400">{errorMessage}</div>
</div>


