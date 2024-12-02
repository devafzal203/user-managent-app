<script lang="ts">
  import Header from "$components/ui/Header.svelte";
  import Sidebar from "$components/ui/Sidebar.svelte";
</script>

<div class="flex">
  <Sidebar />

  <div class="flex-1 py-6 px-10 bg-gray-50">
    <Header />
    <slot />
  </div>
</div>
