<script lang="ts">
  import MainLayout from "$components/Layouts/MainLayout.svelte";
  import Dashboard from "$pages/Dashboard.svelte";
</script>

<MainLayout title="Spark Cloud Studio | Dashboard">
  <Dashboard slot="page" />
</MainLayout>
