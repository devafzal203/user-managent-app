<script lang="ts">
  import Icon from "@iconify/svelte";

  export let onFileSelect: (file: File) => void;

  let file: File | null = null;

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      file = input.files[0];
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files?.[0]) {
      file = event.dataTransfer.files[0];
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  }
</script>

<div
  class="flex w-full items-center justify-center relative"
  on:drop={handleDrop}
  on:dragover={(e) => e.preventDefault()}
  role="presentation"
>
  <label
    for="dropzone-file"
    class="flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary bg-gray-100/50"
  >
    <div class="flex flex-col items-center justify-center pb-6 pt-5">
      <span
        class="w-10 h-10 bg-white rounded-full flex items-center justify-center"
      >
        <Icon icon="tabler:cloud-upload" class="h-8 w-8 text-gray-500 px-1" />
      </span>
      <p class="mt-3 mb-1 text-sm text-gray-600 font-rubik">
        Drag or drop your file here or
        <span class="text-blue-500"> Browse </span>
      </p>
      <p class="text-xs text-gray-500 font-rubik">
        JPG, JPEG, PNG, or GIF (MAX. 5MB)
      </p>
    </div>
  </label>
  <input
    id="dropzone-file"
    type="file"
    class="hidden"
    on:change={handleFileSelect}
  />
</div>
