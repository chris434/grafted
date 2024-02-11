<script>
  import "../app.css";
    import 'iconify-icon'
	import Header from "../components/header.svelte"
	import { setTrees } from "../contexts/treeContext";

setTrees()
</script>
<Header/>
<slot />