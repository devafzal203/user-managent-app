<script lang="ts">
  import type { Activities } from "$lib/types";

  export let activities: Activities[];

  function formatActivityType(activityType: string): string {
    return activityType
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
</script>

<section
  class="max-h-full h-[calc(100vh-450px)] overflow-y-auto scrollbar-thin bg-white rounded-lg border-b border-l border-r border-gray-200"
>
  <div
    class="flex font-bold bg-gray-50 border-t rounded-t-lg border-gray-200 p-4 font-rubik"
  >
    <p class="w-1/4">Date</p>
    <p class="w-1/4">Time</p>
    <p class="w-1/4">Activity</p>
    <p class="w-1/4">IP Address</p>
  </div>

  <!-- Table Rows -->
  {#if activities.length > 0}
    {#each activities as activity}
      <div
        class="flex text-sm border-b border-gray-200 hover:bg-gray-50 font-rubik px-4 py-2.5"
      >
        <p class="w-1/4 truncate">
          {new Date(activity.createdAt).toLocaleDateString()}
        </p>
        <p class="w-1/4 truncate">
          {new Date(activity.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p class="w-1/4 truncate">
          {formatActivityType(activity.activityType)}
        </p>
        <p class="w-1/4 truncate">{activity.ipAddress}</p>
      </div>
    {/each}
  {:else}
    <div class="text-center py-4 text-gray-500">No activities available.</div>
  {/if}
</section>
