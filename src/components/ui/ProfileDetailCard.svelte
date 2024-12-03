<script lang="ts">
  import { type ProfileItem } from "$lib/constants/profileItem";
  import Icon from "@iconify/svelte";
  import Edit from "./Edit.svelte";

  export let cardTitle = "";
  export let disableEdit = false;
  export let onClickEdit = () => {};
  export let data: ProfileItem[] = [];
  export let isLoading: boolean;
</script>

<section class="border px-7 py-4 rounded-lg bg-white space-y-7">
  <div class="flex items-center justify-between w-full">
    <p class="text-lg text-gray-600 font-bold font-rubik">{cardTitle}</p>

    <p class="text-sm text-gray-400 font-rubik">
      This is your current address based on your IP
    </p>
    <Edit disabled={disableEdit} on:click={onClickEdit} class="hidden"
      >Edit</Edit
    >
  </div>

  <div class="w-full grid grid-cols-3 gap-y-5">
    {#each data as item, index}
      <div class={index % 2 === 1 ? "col-span-2" : ""}>
        <p class="text-gray-800 font-rubik">{item.header}</p>
        {#if isLoading}
          <Icon
            icon="svg-spinners:3-dots-scale-middle"
            width={20}
            height={40}
            class="text-black"
          />
        {:else}
          <p class="text-sm text-gray-400 font-rubik">
            {item.item || ""}
          </p>
        {/if}
      </div>
    {/each}
  </div>
</section>
