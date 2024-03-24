import { getContext, setContext } from "svelte";
import {selectedNode,type SelectedNodeReturn} from "../stores/selectedNodeStore";

export function getSelectedNode() {
    return getContext('selectedNode')as SelectedNodeReturn
}

export function setSelectedNodes() {
    setContext('selectedNode',selectedNode)
}