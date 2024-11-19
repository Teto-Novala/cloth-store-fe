<template>
  <section class="px-8">
    <!-- mobile start -->
    <div class="md:hidden flex flex-col gap-y-6 pb-10">
      <img
        src="/src/assets/images/register/register.jpg"
        alt="register"
        class="rounded-lg"
      />
      <h1 class="font-volkhov text-2xl text-center">ASPA</h1>
      <form class="w-full flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-4">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input
            placeholder="Email Address"
            type="email"
          />
          <Input placeholder="Phone Number (+62xxx)" />
          <Input
            placeholder="Password"
            type="password"
          />
          <Input placeholder="Confirm Password" />
        </div>
        <Button class="w-full">Create Account</Button>
        <p class="font-poppins self-end">
          Already have an account?
          <span
            ><RouterLink
              class="text-secondary transition-all hover:underline"
              to="/signin"
              >Login</RouterLink
            ></span
          >
        </p>
      </form>
    </div>
    <!-- mobile end -->
  </section>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { RouterLink } from "vue-router";
</script>
