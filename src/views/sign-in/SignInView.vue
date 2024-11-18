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
      <form
        @submit.prevent="signInHandler"
        class="w-full flex flex-col gap-y-6"
      >
        <Input
          type="email"
          placeholder="Email"
          v-model:model="data.email"
        />
        <span
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          class="text-red-500 font-poppins"
          >{{ error.$message }}</span
        >
        <Input
          type="password"
          placeholder="Password"
          v-model:model="data.password"
        />
        <span
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          class="text-red-500 font-poppins"
          >{{ error.$message }}</span
        >
        <Button type="submit">Sign In</Button>
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
import { useUserStore } from "@/store/authStore";
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const store = useUserStore();

const data = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required },
  };
});

const v$ = useVuelidate(rules, data);

const registerHandler = () => {
  router.push("/register");
};

const signInHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        data
      );

      store.$patch({
        data: {
          user: response.data.user,
          token: response.data.token,
        },
      });
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
};
</script>
