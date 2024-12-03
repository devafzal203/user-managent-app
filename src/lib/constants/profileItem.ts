export interface ProfileItem {
  header: string;
  item: string;
}

export let addressDefault: Array<ProfileItem> = [
  { header: "Country", item: "" },
  { header: "City/State", item: "" },
  { header: "Timezone", item: "" },
  { header: "Organization", item: "" },
];
