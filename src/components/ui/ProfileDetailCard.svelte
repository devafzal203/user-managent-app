<script lang="ts">
  import { type ProfileItem } from "$lib/constants/profileItem";
  import Edit from "./Edit.svelte";

  export let cardTitle = "";
  export let disableEdit = false;
  export let onClickEdit = () => {};
  export let data: ProfileItem[] = [];
</script>

<section class="border px-7 py-4 rounded-lg bg-white space-y-7">
  <div class="flex items-center justify-between w-full">
    <p class="text-lg text-gray-600 font-bold font-rubik">{cardTitle}</p>

    <Edit disabled={disableEdit} on:click={onClickEdit}>Edit</Edit>
  </div>

  <div class="w-full grid grid-cols-3 gap-y-5">
    {#each data as item, index}
      <div class={index % 2 === 1 ? "col-span-2" : ""}>
        <p class="text-gray-800 font-rubik">{item.header}</p>
        <p class="text-sm text-gray-400 font-rubik">{item.item}</p>
      </div>
    {/each}
  </div>
</section>
