<script lang="ts">
  export let title = "Spark cloud studio";
  export let description = "Spark Cloud Studio Full-Stack Assessment";
  export let keywords =
    "TypeScript, JavaScript, Svelte, Sveltekit, Frontend App Authentication, Authorization, OAuth";
  export let author = "M. Afzal";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
</svelte:head>
<slot name="page" />
