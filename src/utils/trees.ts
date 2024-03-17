
import type { Tree, Node, TreeWithUpdatedDateNumber } from "../types/treeTypes";
import {createTreesStore} from '../stores/treeStore'

type NodesArray = { linkIndex: number, node: Node }


// function returnTrees(treeIndex:number,newRoot:Node) {
//     update(trees => {
//         trees[treeIndex] = { ...trees[treeIndex], root: newRoot } 
//         return trees
//     })
// }


export function getNextNameNumber(trees: Tree[]) {
    if (!trees.length) return 1

const filteredTreesByName= trees.filter(tree=> {
    const named = tree.name.match(/untitled_\d+/)
  return named
})

    if (!filteredTreesByName.length) return 1
    
    const orderedTreesByName = filteredTreesByName.sort((a, b) => {
     return parseInt(a.name.split('_')[1])- parseInt(b.name.split('_')[1])
    })
   console.log(orderedTreesByName)
    let nameNumber = 0

   
    for (let i = 0; i < orderedTreesByName.length; i++){
        const currentNameNumber = parseInt(orderedTreesByName[i].name.split('_')[1])
       
        if (i === orderedTreesByName.length - 1) {
            nameNumber = currentNameNumber + 1
            continue
        }

         const nextNameNumber = parseInt(orderedTreesByName[i+1].name.split('_')[1])
        if (currentNameNumber+1!==nextNameNumber) {
            nameNumber = nextNameNumber
            continue
        }
    }
    if (!nameNumber) nameNumber = parseInt(orderedTreesByName[orderedTreesByName.length - 1].name.split('_')[1]) 
    return nameNumber
}

export function sortTrees(filter:string,trees:Tree[]){
    let newTrees:Tree[] =[]
switch (filter) {
    case 'A-Z':
    newTrees= trees.toSorted((a,b)=>{
                return a.name.localeCompare(b.name)
            })
        break
case'opened':{
        newTrees = trees.toSorted((a, b) => {
        return b.openedDate-a.openedDate
    })
    break
    }
    case 'updated': {
        const filteredTrees = trees.filter(function (tree): tree is TreeWithUpdatedDateNumber {
         return typeof tree.updatedDate === 'number'
        })
        newTrees= filteredTrees.toSorted((a, b) => {
        return b.updatedDate-a.updatedDate
    })
}
case'created':{
    newTrees=trees
    break
}
}
return newTrees
}
export function findNode(startNode: Node, targetId: string, updateCb: (node:Node) => Node,returnCb:(node:Node)=>void) {
    const ids = targetId.split('_')
    function nextNode(node: Node, nodesArray: NodesArray[], currentId: string,parentId: string,idIndex: number) {
        if ( parentId === targetId) {
            const newNode = updateCb(node)
          return  mapRoot(newNode)
        }
         
        const { children } = node
      
    for (let i = 0; i <children.length; i++) {
        const { id } = children[i]
        const nextParentId = !currentId||ids.length===1? '' : `${currentId}_`
        const nextId = `${nextParentId}${ids[idIndex]}`
        const subTargetId = targetId.slice(0, nextId.length)
      
        if (id ===subTargetId) {
            nodesArray = [...nodesArray, { linkIndex: i, node }]
         return   nextNode(children[i], nodesArray, nextId, id, idIndex++)
           
          
        }
            
        
    }
        function mapRoot(newNode: Node) {
            let newRoot=newNode
            if (!nodesArray.length) return returnCb(newNode)
            if (nodesArray.length === 1) {
                nodesArray[0].node.children[nodesArray[0].linkIndex] = newRoot
              return  returnCb(nodesArray[0].node)
            }
                
            for (let i = nodesArray.length - 1; i >= 0; i--) {
                 nodesArray[i].node.children[nodesArray[i].linkIndex]=newRoot
                newRoot = nodesArray[i].node
            }
          
            returnCb(newRoot)
        }
    
    }
    
    nextNode(startNode, [],'','root',0)
}

function getChar(str: string) {
    const charNumber = str.charCodeAt(str.length - 1)+1
    return String.fromCharCode(charNumber)
}

export function nextId(nodes: Node[]) {
    const id = !nodes.length?'A':getChar(nodes[nodes.length-1]?.id)
   return id
}

export function getNextChildId(node:Node,nodeId:string) {
    const parentId = nodeId === 'root' ? '' : `${nodeId}_`
     const id = `${parentId}${node?.children ? nextId(node.children) : 'A'}`
    return id
}

