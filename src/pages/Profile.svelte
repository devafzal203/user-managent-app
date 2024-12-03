<script lang="ts">
  import Edit from "$components/ui/Edit.svelte";
  import Modal from "$components/ui/Modal.svelte";
  import ProfileDetailCard from "$components/ui/ProfileDetailCard.svelte";
  import UserInfoEdit from "$components/ui/UserInfoEdit.svelte";
  import { addressDefault, type ProfileItem } from "$lib/constants/profileItem";
  import type { User } from "$lib/types";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import ChangeName from "$components/ui/modal-content/ChangeName.svelte";
  import { api } from "$lib/axios";
  import ChangePassword from "$components/ui/modal-content/ChangePassword.svelte";
  import ChangeAvatar from "$components/ui/modal-content/ChangeAvatar.svelte";
  import { goto } from "$app/navigation";

  let user = {} as User;
  let isLoading = false;
  let showAvatarModal = false;
  let showNameModal = false;
  let showPasswordModal = false;
  let address = addressDefault as ProfileItem[];
  $: avatarUrl = user.avatarUrl || "/profile-default.png";

  async function getUser() {
    try {
      isLoading = true;
      const response = await api<User>("/user/profile");
      user = response.data;
      address = user.address;
    } catch (error) {
      goto("/");
    } finally {
      isLoading = false;
    }
  }

  onMount(async () => {
    getUser();
  });

  const toggleModal = (modal: string) => {
    if (modal === "name") showNameModal = !showNameModal;
    if (modal === "avatar") showAvatarModal = !showAvatarModal;
    if (modal === "password") showPasswordModal = !showPasswordModal;
  };
</script>

<h1 class="text-2xl text-gray-600 font-semibold font-rubik mb-5">My Profile</h1>
<main
  class="h-[calc(100vh-170px)] space-y-5 overflow-y-auto overflow-x-hidden scrollbar-thin"
>
  <div
    class="border px-7 py-4 rounded-lg flex items-center justify-between bg-white"
  >
    <div class="flex items-center gap-x-5">
      <img
        src={avatarUrl}
        alt="avatar"
        width="100"
        class="rounded-full bg-primary"
      />
      <div class="">
        <p class="text-xl font-medium font-rubik">
          {#if isLoading}
            <Icon
              icon="svg-spinners:3-dots-scale-middle"
              width={20}
              height={40}
              class="text-primary"
            />
          {:else}
            {user.fullName}
          {/if}
        </p>
        <p class="text-base text-gray-500 font-rubik my-0.5">
          Software Engineer
        </p>
        <p class="text-sm text-gray-500 font-rubik">Leeds, United Kingdom</p>
      </div>
    </div>
    <Edit on:click={() => toggleModal("avatar")}>Avatar</Edit>
  </div>

  <div class="border px-7 py-4 rounded-lg bg-white space-y-7">
    <p class="text-lg text-gray-600 font-bold font-rubik">
      Personal Information
    </p>
    <UserInfoEdit
      header="Fullname"
      title={user.fullName ?? ""}
      onClickEdit={() => toggleModal("name")}
      {isLoading}
    />
    <UserInfoEdit
      header="Password"
      title="********"
      onClickEdit={() => toggleModal("password")}
      {isLoading}
    />
    <UserInfoEdit header="Email" title={user.email} {isLoading} disableEdit />
    <UserInfoEdit
      header="Phone"
      title={"+1 (412) 234-5678"}
      disableEdit
      {isLoading}
    />
    <UserInfoEdit
      header="Bio"
      title="Please tell us a little about yourself."
      disableEdit
      {isLoading}
    />
  </div>

  <ProfileDetailCard
    cardTitle="Address"
    disableEdit
    data={address}
    bind:isLoading
  />
</main>
<!-- Modal -->
<Modal showModal={showAvatarModal}>
  <ChangeAvatar
    slot="content"
    bind:showAvatarModal
    bind:isLoading
    refetchUser={getUser}
  />
</Modal>
<Modal showModal={showNameModal}>
  <ChangeName
    slot="content"
    bind:showNameModal
    bind:isLoading
    refetchUser={getUser}
  />
</Modal>
<Modal showModal={showPasswordModal}>
  <ChangePassword
    slot="content"
    bind:showPasswordModal
    bind:isLoading
    refetchUser={getUser}
  />
</Modal>
