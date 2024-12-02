<script lang="ts">
  import { goto } from "$app/navigation";
  import { api } from "$lib/axios";
  import type { User } from "$lib/types";
  import Icon from "@iconify/svelte";

  let user = $state({} as User);
  let avatarUrl = $derived(user.avatarUrl || "/profile-default.png");

  $effect(() => {
    async function getUser() {
      try {
        const response = await api<User>("/user/profile");
        user = response.data;
      } catch (error) {
        goto("/");
      }
    }
    getUser();
  });
</script>

<div class="flex items-center justify-between mb-7">
  <div
    class="w-[35%] flex items-center rounded-lg bg-white border cursor-not-allowed"
  >
    <p class="px-1 ml-1">
      <Icon icon="tabler:search" class="text-gray-400" width={18} height={18} />
    </p>
    <input
      type="text"
      placeholder="Search ..."
      class="px-1 py-2 rounded-lg flex-1 outline-none font-rubik"
      disabled
    />
  </div>
  <div class="flex items-center gap-x-4">
    <Icon
      icon="tabler:bell-filled"
      width={25}
      height={25}
      class="font-rubik text-gray-600 cursor-pointer"
    />
    <Icon
      icon="tabler:mail"
      width={25}
      height={25}
      class="font-rubik text-gray-600 cursor-pointer"
    />
    <img
      src={avatarUrl}
      alt="avatar"
      width="40"
      class="rounded-full border bg-primary"
    />
  </div>
</div>
