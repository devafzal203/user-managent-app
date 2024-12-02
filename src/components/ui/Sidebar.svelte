<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import SparkLogo from "$components/icons/SparkLogo.svelte";
  import SparkText from "$components/icons/SparkText.svelte";
  import { colors } from "$lib/constants/colors";
  import { dashboardItem } from "$lib/constants/dashboardItems";
  import { logout } from "$lib/request";
  import { toast } from "$stores/toast";
  import Icon from "@iconify/svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { writable } from "svelte/store";
  import { fade } from "svelte/transition";

  $: pathname = $page.url.pathname;
  let isLoading = false;

  const isExpanded = writable(true);
  const sidebarWidth = tweened(250, {
    duration: 300,
    easing: cubicOut,
  });

  const toggleSidebar = () => {
    isExpanded.update((current) => {
      const next = !current;
      sidebarWidth.set(next ? 250 : 66);
      return next;
    });
  };

  const handleLogout = async () => {
    console.log("logout");
    try {
      isLoading = true;
      await logout();
      toast.addToast({
        title: "Success",
        description: "Logout successfully",
        type: "success",
      });
      goto("/");
    } catch (error) {
      console.log(error);
      toast.addToast({
        title: "Error",
        description: "Logout failed",
        type: "error",
      });
    } finally {
      isLoading = false;
    }
  };

  $: bottomItem = [
    {
      label: isLoading ? "Logging out..." : "Logout",
      icon: isLoading ? "svg-spinners:dot-revolve" : "tabler:logout",
      handleClick: handleLogout,
      disabled: false,
    },
    {
      label: "Settings",
      icon: "tabler:settings",
      handleClick: () => {},
      disabled: true,
    },
  ];
</script>

<div class="relative h-screen shadow-lg border-r">
  <div
    on:click={toggleSidebar}
    role="button"
    tabindex="0"
    on:keydown={() => {}}
    class="absolute top-6 -right-5 z-10 border rounded-lg"
  >
    <div class="bg-white rounded-lg p-1">
      <Icon
        width={26}
        height={26}
        icon="tabler:layout-sidebar-right-expand"
        class="text-gray-600 bg-white {!$isExpanded &&
          'rotate-180'} transition-transform duration-300"
      />
    </div>
  </div>

  <aside
    class="relative h-full text-black p-4 bg-white transition-all duration-300 ease-out overflow-hidden"
    style="width:{$sidebarWidth}px;"
  >
    <div class="flex items-center gap-x-0.5 mt-10 h-20">
      <div class="mb-3">
        <SparkLogo
          colorIn={colors.default}
          colorOut={colors.main}
          width={40}
          height={35}
        />
      </div>
      {#if $isExpanded}
        <p transition:fade={{ duration: 300 }}>
          <SparkText color={colors.sparkText} width={110} />
        </p>
      {/if}
    </div>

    <nav
      class="mt-4 space-y-2 w-full h-[calc(100vh-180px)] flex flex-col justify-between"
    >
      <section>
        {#each dashboardItem as { href, disabled, icon, label }}
          <a {href} class={disabled ? "pointer-events-none text-gray-300" : ""}>
            <div
              class="flex items-center gap-x-2 py-1.5 px-3 mt-2.5 {!$isExpanded &&
                'justify-center'} rounded-md cursor-pointer {href ===
                pathname && 'bg-primary/10'}"
            >
              <p>
                <Icon {icon} width={25} height={25} />
              </p>
              {#if $isExpanded}
                <p class="font-rubik cursor-pointer font-light">
                  {label}
                </p>
              {/if}
            </div>
          </a>
        {/each}
      </section>

      <section>
        {#each bottomItem as { icon, label, handleClick, disabled }}
          <div
            class="flex items-center gap-x-2 py-1.5 px-3 mt-2.5 border rounded-lg hover:bg-gray-100 cursor-pointer {!$isExpanded &&
              'justify-center'} {disabled &&
              'pointer-events-none text-gray-400'}"
            on:click={() => handleClick()}
            role="button"
            tabindex="0"
            on:keydown={() => {}}
          >
            <p>
              <Icon {icon} width={25} height={25} />
            </p>
            {#if $isExpanded}
              <p class="font-rubik cursor-pointer">{label}</p>
            {/if}
          </div>
        {/each}
      </section>
    </nav>
  </aside>
</div>
