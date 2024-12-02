<script lang="ts">
  import { merge } from "$lib/utils/mergeclass";
  import Icon from "@iconify/svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type ButtonVariant = "solid" | "outlined" | "filled";
  type ButtonType = "button" | "submit";

  export let variant: ButtonVariant = "solid";
  export let type: ButtonType = "button";
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let className = "";

  const baseStyles =
    "rounded-md font-rubik transition-all duration-200 flex items-center justify-center gap-2 px-3 py-1.5";

  const variantStyles = {
    solid:
      "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 disabled:bg-gray-300",
    outlined:
      "border-2 border-primary text-primary hover:bg-primary/10 active:bg-primary/20 disabled:border-gray-300 disabled:text-gray-300",
    filled:
      "bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30 disabled:bg-gray-100 disabled:text-gray-400",
  };

  $: buttonClasses = merge(
    baseStyles,
    variantStyles[variant],
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    className
  );

  type $$Props = HTMLButtonAttributes & {
    variant?: ButtonVariant;
    type?: ButtonType;
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    iconPosition?: "left" | "right";
    className?: string;
  };
</script>

<button {type} {disabled} class={buttonClasses} on:click {...$$restProps}>
  {#if loading}
    <Icon icon="eos-icons:loading" class="animate-spin" width={20} />
  {/if}
  <slot />
</button>
