<script lang="ts">
  import { fade, fly } from "svelte/transition";

  export let showModal = false;

  function closeModal() {
    showModal = false;
  }
</script>

{#if showModal}
  <div
    role="button"
    tabindex="0"
    class="fixed inset-0 z-50 bg-black/70"
    transition:fade={{ duration: 150 }}
    on:click|self={closeModal}
    on:keydown={(e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    }}
  >
    <div
      class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw]
    max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white
    p-4 shadow-lg"
      transition:fly={{ y: 200, duration: 150 }}
    >
      <slot name="content" />
    </div>
  </div>
{/if}
