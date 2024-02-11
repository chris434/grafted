import type { Tree } from "../types/treeTypes";

export function getNextNameNumber(trees: Tree[]) {
    if(!trees.length)return 1

const filteredTreesByName= trees.filter(tree=> {
  const named =tree.name.match(/untitled_[1-9]$/)
  return named
})

    if (!filteredTreesByName.length) return 1
    
    const orderedTreesByName = filteredTreesByName.sort((a, b) => {
     return  a.name.localeCompare(b.name)
    })
   
    let nameNumber=0
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