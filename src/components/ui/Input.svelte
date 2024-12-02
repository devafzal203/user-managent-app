<script lang="ts">
  import { merge } from "$lib/utils/mergeclass";
  import Icon from "@iconify/svelte";

  export let label: string;
  export let type: "text" | "email" | "password" | "number" | "checkbox" =
    "text";
  export let value: string = "";
  export let placeholder: string = "";
  export let error: string = "";
  export let name: string = "";
  export let className = "";
  export let icon: string = "";
  export let iconPosition: "left" | "right" = "right";
  export let iconColor: string = "#6f6d6d";
  export let required: boolean = true;
  export let disabled: boolean = false;
  export let onIconClick: (() => void) | undefined = undefined;
</script>

<div>
  <label for={name} class="text-sm text-secondary font-rubik ml-1">
    {label}
    {#if required}
      <span class="text-red-600">*</span>
    {/if}
  </label>
  <div
    class="border {error
      ? 'border-red-600'
      : 'border-gray-400'} {iconPosition === 'right'
      ? 'flex-row'
      : 'flex-row-reverse'} rounded-md flex items-center"
  >
    <input
      {name}
      {type}
      {placeholder}
      {disabled}
      {required}
      id={name}
      bind:value
      class={merge(
        "w-full rounded-md px-2 py-1.5 text-sm font-rubik border-none outline-none",
        className
      )}
      on:focus
      on:blur
      {...$$restProps}
    />
    {#if icon}
      <!-- Added role="button" and hover effect -->
      <div
        role="button"
        class="hover:opacity-70 transition-opacity"
        tabindex="0"
        on:click|preventDefault={() => onIconClick?.()}
        on:keydown={(e) => e.key === "Enter" && onIconClick?.()}
      >
        <Icon
          {icon}
          color={iconColor}
          class="text-lg cursor-pointer {iconPosition === 'right'
            ? 'mr-2'
            : 'ml-2'}"
        />
      </div>
    {/if}
  </div>
  {#if error}
    <p class="text-xs text-red-600 font-rubik mt-0.5 ml-1">{error}</p>
  {/if}
</div>
