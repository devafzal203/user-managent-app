<script lang="ts">
  import { merge } from "$lib/utils/mergeclass";

  export let text: string = "";
  export let className: string = "";
</script>

<div class={merge("flex items-center", text && "gap-x-4", className)}>
  <div class="h-px bg-gray-300 flex-1"></div>
  {#if text}
    <span class="text-sm text-gray-500 font-rubik">{text}</span>
  {/if}
  <div class="h-px bg-gray-300 flex-1"></div>
</div>
