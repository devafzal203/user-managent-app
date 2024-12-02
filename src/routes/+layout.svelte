<script lang="ts">
  import "../app.css";
  import Toast from "$components/ui/Toast.svelte";
  import { authStatus } from "$lib/request";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(async () => {
    const status = await authStatus();
    if (
      status.authenticated &&
      (window.location.pathname === "/" ||
        window.location.pathname === "/signup")
    ) {
      goto("/dashboard");
    } else if (
      !status.authenticated &&
      window.location.pathname === "/dashboard"
    ) {
      goto("/");
    }
  });

  let { children } = $props();
</script>

{@render children()}
<Toast />
