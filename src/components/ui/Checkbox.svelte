<script lang="ts">
  import { merge } from "$lib/utils/mergeclass";
  import Icon from "@iconify/svelte";

  export let checked: boolean = false;
  export let label: string = "";
  export let name: string = "";
  export let disabled: boolean = false;
  export let className: string = "";
  export let required: boolean = false;
</script>

<label
  class={merge(
    "inline-flex items-center gap-2 select-none",
    disabled && "cursor-not-allowed opacity-50",
    className
  )}
>
  <div class="relative inline-flex items-center">
    <input
      type="checkbox"
      {name}
      {disabled}
      {required}
      bind:checked
      class="peer absolute opacity-0 w-0 h-0"
      on:change
    />
    <div
      class={merge(
        "w-4 h-4 border rounded flex items-center justify-center",
        "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50",
        checked ? "bg-primary border-primary" : "border-gray-300 bg-white",
        disabled
          ? "cursor-not-allowed"
          : "cursor-pointer peer-hover:border-primary"
      )}
    >
      {#if checked}
        <Icon icon="mdi:check" color="white" width="20" />
      {/if}
    </div>
  </div>
  {#if label}
    <span class="text-sm text-gray-700 font-rubik">{label}</span>
  {/if}
</label>
