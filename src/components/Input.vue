<template>
  <input
    :placeholder="placeholder"
    :type="type"
    v-model="model"
    class="font-poppins text-lg md:text-xl outline-none border-b border-primary w-full pb-1"
  />
</template>

<script setup>
import { defineProps, defineModel } from "vue";
const model = defineModel("model");

defineProps({
  placeholder: {
    type: String,
    default: "Placeholder",
  },
  type: {
    type: String,
    default: "text",
  },
});
</script>
