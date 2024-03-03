
import type { Tree, TreeWithUpdatedDateNumber } from "../types/treeTypes";

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
