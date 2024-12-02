import { writable, type Writable } from "svelte/store";

export type ToastType = "success" | "warning" | "error";

export interface ToastData {
  id: string;
  title: string;
  description: string;
  type: ToastType;
}

interface ToastStore extends Writable<ToastData[]> {
  addToast: (toast: Omit<ToastData, "id">) => void;
  removeToast: (id: string) => void;
}

function createToastStore(): ToastStore {
  const { subscribe, update } = writable<ToastData[]>([]);

  return {
    subscribe,
    set: () => {}, // Required by Writable but we won't use it
    update, // Required by Writable
    addToast: (toast) => {
      const id = crypto.randomUUID();
      update((toasts) => [...toasts, { ...toast, id }]);
      // Auto-remove toast after 5 seconds
      setTimeout(() => {
        update((toasts) => toasts.filter((t) => t.id !== id));
      }, 5000);
    },
    removeToast: (id) => {
      update((toasts) => toasts.filter((t) => t.id !== id));
    },
  };
}

export const toast = createToastStore();
