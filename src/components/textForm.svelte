<script lang="ts">
  import type { ExtendedEvent } from "../types/eventTypes";
  import TextField from "./textField.svelte";
  export let value:string
  export let placeholder:string
  export let nullHandler:NullHandler
  export let blurSelected=false
  export let blurInput=false
  export let submitCb:(value:string)=>string
  const currentValue=value
  let errorMessage=''


  type NullHandler='required'|'fallback'

  function blur(){
 const isNull=isNullHandler()

if(nullHandler!=='fallback'||isNull) return 
 const errorMessageCb= submitCb(value)
if(errorMessageCb) errorMessage=errorMessageCb
}

 function nullHandlerFunc(status:NullHandler,cb:()=> void){
    if(!value&&nullHandler===status){
     cb()
     return true
    }
    return false
}

function isNullHandler(){ 
    let isNull =false
isNull=nullHandlerFunc('fallback',()=>{
    value=currentValue
})
isNull=nullHandlerFunc('required',()=>{
    errorMessage=`${placeholder} is required`
})
return isNull
}
  

  function submit(e:ExtendedEvent){
    e.stopPropagation()
    const isNull= isNullHandler()
  
    if(isNull) return
    const errorMessageCb= submitCb(value)
    if(errorMessageCb) return errorMessage=errorMessageCb
    blurInput=true
  }


</script>
<form on:submit|preventDefault={submit}>
    <TextField bind:blurInput {blurSelected} bind:errorMessage {blur} {placeholder} bind:value/>
</form>