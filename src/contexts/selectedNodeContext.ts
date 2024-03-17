import { getContext, setContext } from "svelte";
import {selectedNode,type SelectedNode} from "../stores/selectedNodeStore";

export function getSelectedNode() {
    return getContext('selectedNode')as SelectedNode
}

export function setSelectedNodes() {
    setContext('selectedNode',selectedNode)
}