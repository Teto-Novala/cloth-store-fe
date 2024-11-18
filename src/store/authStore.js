import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  const data = reactive(
    useLocalStorage("user", {
      user: "",
      token: "",
    })
  );

  return { data };
});
