<template>
  <button
    @click="$emit('someEvent')"
    :type="type"
    class="bg-primary px-3 py-2 text-white font-poppins rounded-lg box-border border border-primary hover:border-secondary hover:bg-white hover:text-secondary transition-all md:text-lg"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  type: {
    type: String,
    default: "button",
  },
});
</script>
