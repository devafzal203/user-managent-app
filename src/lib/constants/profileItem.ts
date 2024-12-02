export interface ProfileItem {
  header: string;
  item: string;
}

export const address: Array<ProfileItem> = [
  { header: "Country", item: "United Kingdom" },
  { header: "City/State", item: "Leeds, East London" },
  { header: "Postal Code", item: "ERT 2354" },
  { header: "Tax ID", item: "AS34567890" },
];
