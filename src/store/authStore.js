import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = reactive({});
  const getToken = computed(() => {
    user.token;
  });

  return { user, getToken };
});
