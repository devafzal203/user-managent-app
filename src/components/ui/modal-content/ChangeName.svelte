<script lang="ts">
  import Icon from "@iconify/svelte";
  import Button from "../Button.svelte";
  import Input from "../Input.svelte";
  import type { FormError } from "$lib/types";
  import { api } from "$lib/axios";
  import { toast } from "$stores/toast";

  export let showNameModal: boolean;
  export let isLoading: boolean;
  export let refetchUser: () => Promise<void>;

  let firstname: string = "";
  let lastname: string = "";
  let errors: FormError = {};

  const validateForm = () => {
    if (firstname === "") {
      errors = { ...errors, firstname: "First name is required" };
      return false;
    }
    if (lastname === "") {
      errors = { ...errors, lastname: "Last name is required" };
      return false;
    }
    return true;
  };

  async function handleSave() {
    if (validateForm()) {
      isLoading = true;
      try {
        const response = await api.patch("/user/name", {
          newName: `${firstname.trim()} ${lastname.trim()}`,
        });

        if (response.status === 200) {
          toast.addToast({
            title: "Success",
            description: "Name changed successfully",
            type: "success",
          });
          await refetchUser();
          showNameModal = false;
        }
      } catch (error: any) {
        toast.addToast({
          title: "Error",
          description: error.response?.data?.message || "Failed to update name",
          type: "error",
        });
      } finally {
        isLoading = false;
      }
    }
  }
</script>

<section class="p-2">
  <div class="flex items-center justify-start gap-x-2">
    <div class="bg-primary/20 rounded-full p-2.5">
      <Icon icon="tabler:user-question" width={25} height={25} />
    </div>
    <div>
      <p class="text-lg font-rubik">Change Name</p>
      <p class="text-sm text-gray-500 font-rubik">
        Change your name to something more personal.
      </p>
    </div>
  </div>

  <div class="space-y-2 my-8">
    <Input
      type="text"
      label="First Name"
      placeholder="First Name"
      bind:value={firstname}
      name="firstname"
      error={errors.firstname}
    />
    <Input
      type="text"
      label="Last Name"
      placeholder="Last Name"
      bind:value={lastname}
      name="lastname"
      error={errors.lastname}
    />
  </div>

  <div class="flex items-center justify-end gap-x-5">
    <Button
      on:click={() => (showNameModal = false)}
      variant="filled"
      className="w-1/4 border border-primary">Cancel</Button
    >
    <Button
      on:click={handleSave}
      className="w-1/4"
      disabled={!firstname || !lastname}
      loading={isLoading}
    >
      {isLoading ? "Saving" : "Save"}
    </Button>
  </div>
</section>
