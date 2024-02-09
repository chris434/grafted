<script>
  import "../app.css";
    import 'iconify-icon'
	import Header from "../components/header.svelte"
	import { setTrees } from "../contexts/treeContet";

  setTrees()
</script>
<Header/>
<slot />