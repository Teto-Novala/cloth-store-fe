import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useForgotStore = defineStore("forgot", () => {
  const data = reactive(
    useLocalStorage("forgot", {
      id: "",
      confirmationCode: "",
    })
  );

  function $reset() {
    data.value.id = "";
    data.value.confirmationCode = "";
    localStorage.removeItem("forgot");
  }

  return { data, $reset };
});
