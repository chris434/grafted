<script lang="ts">
    export let icon:string
    export let text:string
</script>
<div class="text-lg text-nowrap flex items-center justify-start gap-2 w-[200px]" >
 <iconify-icon icon="mdi:{icon}"></iconify-icon>
 <div>{text}</div>
</div>
