<script lang="ts">
  import { merge } from "$lib/utils/mergeclass";
  import Icon from "@iconify/svelte";

  export let provider: "google" | "github" | "facebook" = "google";
  export let loading: boolean = false;
  export let className: string = "";

  const providerConfig = {
    google: {
      icon: "flat-color-icons:google",
      text: "Continue with Google",
      hoverClass: "hover:bg-gray-50",
    },
    github: {
      icon: "mdi:github",
      text: "Continue with GitHub",
      hoverClass: "hover:bg-gray-50",
    },
    facebook: {
      icon: "ic:baseline-facebook",
      text: "Continue with Facebook",
      hoverClass: "hover:bg-gray-50",
    },
  };
</script>

<button
  type="button"
  class={merge(
    "w-full flex items-center justify-center gap-3 px-3 py-1.5",
    "border border-gray-300 rounded-md transition-colors duration-200",
    "text-gray-700 font-medium",
    providerConfig[provider].hoverClass,
    className
  )}
  disabled={loading}
  on:click
>
  {#if loading}
    <Icon icon="eos-icons:loading" class="animate-spin text-xl" />
  {:else}
    <Icon icon={providerConfig[provider].icon} width="24" height="24" />
  {/if}
  <span class="font-rubik font-normal">{providerConfig[provider].text}</span>
</button>
