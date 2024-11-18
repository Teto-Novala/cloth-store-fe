<template>
  <input
    :placeholder="placeholder"
    :type="type"
    class="font-poppins text-lg outline-none border-b border-primary w-full pb-1"
  />
</template>

<script setup>
import { defineProps } from "vue";

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
