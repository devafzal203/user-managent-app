import { writable } from "svelte/store";
import type { User } from "$lib/types";

function createUserStore() {
  const { subscribe, set } = writable<User>({
    userId: "",
    fullName: "",
    avatarUrl: null,
    email: "",
    provider: "local",
  });

  return {
    subscribe,
    setUser: (newUserData: User) => {
      set(newUserData);
    },
  };
}

export const userStore = createUserStore();
