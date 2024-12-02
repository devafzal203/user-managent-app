<script lang="ts">
  import { merge } from "$lib/utils/mergeclass";
  import { toast as toastStore } from "$stores/toast";
  import Icon from "@iconify/svelte";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  const backGroundColors = {
    success: "bg-green-600",
    warning: "bg-orange-600",
    error: "bg-red-700",
  };
</script>

<div
  class="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 m-4 flex flex-col items-center gap-2"
>
  {#each $toastStore as toast (toast.id)}
    <div
      animate:flip={{ duration: 4000 }}
      in:fly={{ duration: 150, y: "-100%" }}
      out:fly={{ duration: 150, y: "-100%" }}
      class={merge(
        "rounded-lg text-white shadow-md",
        backGroundColors[toast.type]
      )}
    >
      <div
        class="relative flex w-[25rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 px-5 py-3"
      >
        <div>
          <h3 class="flex items-center gap-x-2 font-semibold font-rubik">
            {toast.title}
          </h3>
          <p class="font-rubik text-white">{toast.description}</p>
        </div>
        <button
          on:click={() => toastStore.removeToast(toast.id)}
          class="absolute right-4 top-4 grid size-6 place-items-center rounded-full text-white"
        >
          <Icon icon="radix-icons:cross-2" class="font-extrabold text-lg" />
        </button>
      </div>
    </div>
  {/each}
</div>
