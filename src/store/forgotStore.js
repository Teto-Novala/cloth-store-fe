import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useForgotStore = defineStore("forgot", () => {
  const data = reactive(
    useLocalStorage("forgot", {
      userId: "",
      confirmationCode: "",
    })
  );

  function $reset() {
    data.value.userId = "";
    data.value.confirmationCode = "";
    localStorage.removeItem("forgot");
  }

  return { data, $reset };
});
