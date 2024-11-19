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
    <!-- tablet start -->
    <div class="hidden xl:hidden md:flex md:flex-col md:gap-y-8">
      <img
        src="/src/assets/images/sign-in/sign-in.jpg"
        alt="sign-in"
        class="w-full h-[30rem] object-cover object-center"
      />
      <h1 class="font-volkhov text-center text-5xl">ASPA</h1>
      <form
        @submit.prevent="signInHandler"
        class="flex flex-col gap-y-6 w-4/5 mx-auto"
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
    <!-- tablet end -->

    <!-- desktop start -->
    <div class="hidden xl:flex xl:items-center xl:gap-x-28 xl:h-screen">
      <img
        src="/src/assets/images/sign-in/sign-in.jpg"
        alt="sign-in"
        class="w-1/2 h-5/6 object-cover object-center rounded-lg"
      />
      <form
        @submit.prevent="signInHandler"
        class="flex flex-col justify-center gap-y-8 w-1/2 h-5/6"
      >
        <h1 class="font-volkhov text-4xl">ASPA</h1>
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
    <!-- desktop end -->
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
