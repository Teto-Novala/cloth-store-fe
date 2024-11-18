<script setup>
import { useUserStore } from "@/store/authStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  if (!userStore.data.user) {
    router.push("/signin");
  }
});
</script>

<template>
  <main>
    <p>Home View</p>
    <div class="w-5 h-5 bg-primary"></div>
    <div class="w-5 h-5 bg-secondary"></div>
    <div>{{ userStore.data }}</div>
  </main>
</template>
