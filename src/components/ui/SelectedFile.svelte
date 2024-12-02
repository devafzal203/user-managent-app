<script lang="ts">
  import Icon from "@iconify/svelte";

  export let selectedFile: File | null = null;
  export let fileSizeError: string | null = null;
  export let onDelete: () => void = () => {};
</script>

<div
  class="border-[0.5px] {fileSizeError
    ? 'border-red-500'
    : 'border-gray-300'} p-2 rounded-lg flex items-center justify-between"
>
  <div class="font-rubik flex items-center justify-center gap-x-2.5">
    <span class="flex border p-1.5 rounded-lg w-fit bg-gray-100">
      <Icon icon="tabler:file" width={22} height={22} class="text-gray-500" />
    </span>
    <div>
      <p class="text-sm font-rubik">
        {selectedFile?.name}
      </p>
      <p class="text-xs text-gray-500">
        {selectedFile?.size
          ? selectedFile?.size / (1024 * 1024) > 1
            ? (selectedFile?.size / (1024 * 1024)).toFixed(2) + " MB"
            : (selectedFile?.size / 1024).toFixed(2) + " KB"
          : "0 KB"}
      </p>
    </div>
  </div>
  <button class="flex items-center justify-center px-2" on:click={onDelete}>
    <Icon
      icon="tabler:trash"
      width={22}
      height={22}
      class="text-gray-500 cursor-pointer"
    />
  </button>
</div>
{#if fileSizeError}
  <p class="pl-1 mt-1 text-xs text-red-500 font-rubik">{fileSizeError}</p>
{/if}
