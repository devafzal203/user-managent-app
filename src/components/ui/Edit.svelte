<script lang="ts">
  import { merge } from "$lib/utils/mergeclass";
  import Icon from "@iconify/svelte";

  export let disabled = false;
</script>

<button
  on:click
  {disabled}
  class={merge(
    "border flex items-center gap-x-3 px-4 py-1.5 rounded-full font-rubik hover:bg-gray-100 cursor-pointer",
    disabled && "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300"
  )}
  {...$$restProps}
>
  <Icon icon="carbon:edit" width="20" height="20" />
  <slot />
</button>
