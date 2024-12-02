<script lang="ts">
  import Icon from "@iconify/svelte";
  import Edit from "./Edit.svelte";

  export let header = "";
  export let title = "";
  export let disableEdit = false;
  export let onClickEdit = () => {};
  export let isLoading = false;
</script>

<div class="flex items-center justify-between">
  {#if header === "Fullname"}
    <div class="flex items-center gap-x-5 w-full">
      <div class="w-1/3">
        <p class="text-gray-800 font-rubik">First Name</p>
        {#if isLoading}
          <Icon
            icon="svg-spinners:3-dots-scale-middle"
            width={20}
            height={40}
          />
        {:else}
          <p class="text-sm text-gray-400 font-rubik">
            {title.split(" ")[0]}
          </p>
        {/if}
      </div>
      <div class="w-1/3">
        <p class="text-gray-800 font-rubik">Last Name</p>
        {#if isLoading}
          <Icon
            icon="svg-spinners:3-dots-scale-middle"
            width={20}
            height={40}
          />
        {:else}
          <p class="text-sm text-gray-400 font-rubik">
            {title.split(" ")[1]}
          </p>
        {/if}
      </div>
    </div>
  {:else}
    <div class="w-1/3">
      <p class="text-gray-800 font-rubik">{header}</p>
      {#if isLoading}
        <Icon icon="svg-spinners:3-dots-scale-middle" width={20} height={40} />
      {:else}
        <p class="text-sm text-gray-400 font-rubik">
          {title}
        </p>
      {/if}
    </div>
  {/if}

  {#if header !== "Email"}
    <Edit disabled={disableEdit} on:click={onClickEdit}>Edit</Edit>
  {/if}
</div>
