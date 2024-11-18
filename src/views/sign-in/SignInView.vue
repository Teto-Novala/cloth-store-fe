<template>
  <section class="px-8">
    <!-- mobile start -->
    <div class="md:hidden w-full flex flex-col gap-y-6 items-center">
      <img
        src="/src/assets/images/sign-in/sign-in.jpg"
        alt="sign-in"
        class="w-full h-72 object-cover object-center"
      />
      <h1 class="font-volkhov text-2xl">ASPA</h1>
      <form class="w-full flex flex-col gap-y-6">
        <Input
          type="email"
          placeholder="Email"
          :model="data.email"
        />
        <Input
          type="password"
          placeholder="Password"
          :model="data.password"
        />
        <button
          class="bg-primary px-3 py-2 text-white font-poppins rounded-lg box-border border border-primary hover:border-secondary hover:bg-white hover:text-secondary transition-all"
        >
          Sign In
        </button>
        <Button @some-event="registerHandler">Register Now</Button>
        <RouterLink
          to="/forgotpassword"
          class="self-end text-secondary hover:underline transition-all"
          >Forgot Password?</RouterLink
        >
      </form>
    </div>
    <!-- mobile end -->
  </section>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { reactive } from "vue";
import { RouterLink } from "vue-router";

const data = reactive({
  email: "",
  password: "",
});

const registerHandler = () => {
  alert("hi");
};
</script>
