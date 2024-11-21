<template>
  <section class="px-8">
    <!-- mobile start -->
    <div class="md:hidden flex flex-col gap-y-5 items-center">
      <img
        src="/src/assets/images/forgot-password/forgot-password.jpg"
        alt="confirmation code"
        class="rounded-lg"
      />
      <h1 class="font-volkhov text-3xl">ASPA</h1>
      <h2 class="self-start font-volkhov">Enter The Confirmation Code</h2>
      <form class="flex flex-col gap-y-4 w-full">
        <Input placeholder="Confirmation Code" />
        <Button
          type="submit"
          class="w-full"
          >Recover Account</Button
        >
      </form>
    </div>
    <!-- mobile end -->
  </section>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
</script>
