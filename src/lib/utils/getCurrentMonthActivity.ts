import type { Activities } from "$lib/types";

export function getCurrentMonthActivities(activities: Activities[]): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const filteredActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.createdAt);
    return (
      activityDate.getMonth() === currentMonth &&
      activityDate.getFullYear() === currentYear
    );
  });

  return filteredActivities.length; // Return the count
}
