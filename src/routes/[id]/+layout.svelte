
<script lang="ts">
	import { setSelectedNodes } from "../../contexts/selectedNodeContext";
import { setTreeIndex } from "../../contexts/treeIndexContext";

setTreeIndex()
setSelectedNodes()
</script>

<slot/>