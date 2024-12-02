<script lang="ts">
  import Icon from "@iconify/svelte";
  import Button from "../Button.svelte";
  import Dropzone from "../Dropzone.svelte";
  import SelectedFile from "../SelectedFile.svelte";
  import { toast } from "$stores/toast";
  import { api } from "$lib/axios";

  export let showAvatarModal: boolean;
  export let isLoading: boolean;
  export let refetchUser: () => Promise<void>;

  let selectedFile: File | null = null;
  let fileSizeError: string | null = null;

  function handleFileSelect(file: File) {
    const MAX_SIZE = 5 * 1024 * 1024;
    fileSizeError =
      file.size > MAX_SIZE
        ? "File size exceeds 5 MB. Please select a smaller file."
        : null;
    selectedFile = file;
  }

  async function handleSave() {
    if (!selectedFile || fileSizeError) return;

    try {
      isLoading = true;
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const response = await api.patch("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.addToast({
          title: "Success",
          description: "Avatar updated successfully",
          type: "success",
        });
        await refetchUser();
        showAvatarModal = false;
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.addToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update avatar",
        type: "error",
      });
    } finally {
      isLoading = false;
    }
  }
</script>

<section class="p-2">
  <div class="flex items-center justify-start gap-x-2">
    <div class="bg-primary/20 rounded-full p-2.5">
      <Icon icon="tabler:photo-edit" width={25} height={25} />
    </div>
    <div>
      <p class="text-lg font-rubik">Update Avatar</p>
      <p class="text-sm text-gray-500 font-rubik">
        Change your avatar to something more personalized.
      </p>
    </div>
  </div>

  <div class="my-8">
    {#if selectedFile && selectedFile.name}
      <SelectedFile
        {selectedFile}
        {fileSizeError}
        onDelete={() => (selectedFile = null)}
      />
    {:else}
      <Dropzone onFileSelect={handleFileSelect} />
    {/if}
  </div>

  <div class="flex items-center justify-end gap-x-5">
    <Button
      on:click={() => (showAvatarModal = false)}
      variant="filled"
      className="w-1/4 border border-primary">Cancel</Button
    >
    <Button
      on:click={handleSave}
      className="w-1/4"
      loading={isLoading}
      disabled={fileSizeError ? true : false || !selectedFile}
    >
      {isLoading ? "Saving" : "Save"}
    </Button>
  </div>
</section>
