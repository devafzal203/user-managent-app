interface DashboardItem {
  label: string;
  href: string;
  icon: string;
  disabled: boolean;
}

const dashboardItem: DashboardItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "tabler:smart-home",
    disabled: false,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: "tabler:user",
    disabled: false,
  },
  {
    label: "Project Task",
    href: "/#",
    icon: "tabler:chart-dots-3",
    disabled: true,
  },
  {
    label: "Schedule",
    href: "/#",
    icon: "tabler:calendar-check",
    disabled: true,
  },
  {
    label: "Documents",
    href: "/#",
    icon: "tabler:file-text",
    disabled: true,
  },
  {
    label: "Analytics",
    href: "/#",
    icon: "tabler:chart-infographic",
    disabled: true,
  },
  {
    label: "Settings",
    href: "/#",
    icon: "tabler:settings",
    disabled: true,
  },
];

export { dashboardItem, type DashboardItem };
