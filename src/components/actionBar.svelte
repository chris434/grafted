<script lang="ts">
	import { getTrees } from "../contexts/treeContext";
import IconButton from "./iconButton.svelte";
  import type {Node} from '../types/treeTypes'
	import { getTreeIndex } from '../contexts/treeIndexContext';
	import { getSelectedNode } from "../contexts/selectedNodeContext";
	import TextForm from "./textForm.svelte";
  export let root:Node|null
  let selected=getSelectedNode()
  const {setSelected}=selected
  let nodesToDelete=[]
const trees=getTrees()
const {createNode,editLabel}=trees
const treeIndex=getTreeIndex()

    let toggle:Toggle ={value:false,action:''}
    let errorMessage=''
    let value =''


    type ToggleActions='add'|'edit'|''
    type Toggle={value:boolean,action:ToggleActions}

     function setErrorMessage(error:boolean){
    if(error){
    errorMessage='value already exists'
   } else{
    setToggleFalse()
   }
  }
  function actionHandler(action:{node:Node|null,error:boolean}){
  const {node,error}= action
      setErrorMessage(error)
     if(!error&&node) setSelected(node)
  }

    function submit() {
    if(!value) return errorMessage='key is required'
    errorMessage=''
    // if(!$selected||$trees[treeIndex]?.root)return''
    if(toggle.action==='add'){
   const action= createNode(value,treeIndex,$selected?.id||'')
   actionHandler(action)
   
   }else if($selected){
  const action= editLabel(value,treeIndex,$selected.id)
  actionHandler(action)
   }
  return errorMessage
}

  $:if(!$selected) setToggleFalse()
  $:$selected,setToggleFalse()

  function toggleValue(action:ToggleActions){
    let toggleValue=false
    value=action==='edit'&&$selected?.label||''
   if(action!==toggle.action||!toggle.value){
   toggleValue=true
   }else{
    toggleValue=false
   }
    toggle={value:toggleValue,action}
     }

     function setToggleFalse(){
       toggle={...toggle,value:false}
     }


</script>
<section class="bg-gray-100 p-2 w-full shadow-md">
  <div class="flex items-center gap-3 h-[48px]">
    {#if !root||$selected}
      <IconButton  on:click={()=>toggleValue('add')} icon="add"/>
    {/if}
    {#if $selected}
    <IconButton on:click={()=>toggleValue('edit')} icon="edit"/>
    {/if}
    {#if nodesToDelete.length}
    <IconButton icon="trash"/>
    {/if}
  </div>
  {#if toggle.value}
<TextForm submitCb={submit}   nullHandler={toggle.action==='add'?'required':'fallback'} placeholder="label" bind:value/>

  {/if}
</section>