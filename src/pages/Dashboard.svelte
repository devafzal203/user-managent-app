<script lang="ts">
  import Loader from "$components/icons/Loader.svelte";
  import ActivityTable from "$components/ui/ActivityTable.svelte";
  import DummyChart from "$components/ui/DummyChart.svelte";
  import { api } from "$lib/axios";
  import type { Activities } from "$lib/types";
  import { getCurrentMonthActivities } from "$lib/utils/getCurrentMonthActivity";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let loading = false;
  let activities = writable<Activities[]>([]);

  onMount(async () => {
    try {
      loading = true;
      const response = await api.get<Activities[]>("/user/activites");
      activities.set(response.data);
    } catch (err) {
      activities.set([]);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="h-[calc(100vh-120px)] flex items-center justify-center">
    <div>
      <Loader width="300" height="300" />
    </div>
  </div>
{:else}
  <main class="h-[calc(100vh-120px)] space-y-10">
    <section class="flex items-stretch justify-between gap-x-4">
      <div class="bg-white p-4 rounded-lg border w-[60%]">
        <h1 class="font-rubik text-xl font-bold mb-5">Activities</h1>
        <div class="w-full h-[200px]">
          <DummyChart />
        </div>
      </div>

      <div
        class="bg-box rounded-lg relative flex items-center justify-center w-[40%]"
      >
        <Icon
          icon="fa6-solid:arrow-up"
          class="absolute top-3 right-3 rotate-45 text-gray-700"
          width="50"
          height="50"
        />
        <div class="text-center">
          <p class="text-4xl text-gray-800 font-medium font-rubik">
            Total {getCurrentMonthActivities($activities)}
          </p>
          <p class="text-gray-800 font-medium font-rubik">
            Activites in {new Date().toLocaleDateString("en-US", {
              month: "long",
            })}
          </p>
        </div>
      </div>
    </section>

    <ActivityTable activities={$activities} />
  </main>
{/if}
