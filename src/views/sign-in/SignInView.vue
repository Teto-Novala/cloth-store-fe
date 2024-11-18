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
        <input
          type="email"
          placeholder="Email"
          class="font-poppins text-lg outline-none border-b border-primary w-full pb-1"
        />
        <input
          type="password"
          class="font-poppins text-lg outline-none border-b border-primary w-full pb-1"
          placeholder="Password"
        />
        <button
          class="bg-primary px-3 py-2 text-white font-poppins rounded-lg box-border border border-primary hover:border-secondary hover:bg-white hover:text-secondary transition-all"
        >
          Sign In
        </button>
        <button
          class="bg-primary px-3 py-2 text-white font-poppins rounded-lg box-border border border-primary hover:border-secondary hover:bg-white hover:text-secondary transition-all"
        >
          Register Now
        </button>
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
import { RouterLink } from "vue-router";
</script>
