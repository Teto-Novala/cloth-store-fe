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
      <form
        @submit.prevent="createHandler"
        class="w-full flex flex-col gap-y-6"
      >
        <div class="flex flex-col gap-y-4">
          <Input
            placeholder="First Name"
            v-model:model="data.firstname"
          />
          <Input
            placeholder="Last Name"
            v-model:model="data.lastname"
          />
          <Input
            placeholder="Email Address"
            type="email"
            v-model:model="data.email"
          />
          <Input
            placeholder="Phone Number (+62xxx)"
            v-model:model="data.phone"
          />
          <Input
            placeholder="Password"
            type="password"
            v-model:model="data.password"
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            v-model:model="data.confirmPassword"
          />
        </div>
        <Button
          type="submit"
          class="w-full"
          >Create Account</Button
        >
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
    <!-- tablet start -->
    <div class="hidden xl:hidden md:flex md:flex-col md:gap-y-9">
      <img
        src="/src/assets/images/register/register.jpg"
        alt="register"
        class="w-full rounded-lg h-[20rem] object-cover object-top"
      />
      <div>
        <h1 class="font-volkhov text-5xl text-center">ASPA</h1>
        <form
          @submit.prevent="createHandler"
          class="flex flex-col gap-y-8"
        >
          <div class="flex flex-col gap-y-7">
            <Input
              placeholder="First Name"
              v-model:model="data.firstname"
            />
            <Input
              placeholder="Last Name"
              v-model:model="data.lastname"
            />
            <Input
              placeholder="Email Address"
              type="email"
              v-model:model="data.email"
            />
            <Input
              placeholder="Phone Number (+62xxx)"
              v-model:model="data.phone"
            />
            <Input
              placeholder="Password"
              type="password"
              v-model:model="data.password"
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              v-model:model="data.confirmPassword"
            />
          </div>
          <div>
            <Button
              type="submit"
              class="w-full"
              >Create Account</Button
            >
            <p class="font-poppins text-right mt-4">
              Already have an account?
              <span
                ><RouterLink
                  class="text-secondary transition-all hover:underline"
                  to="/signin"
                  >Login</RouterLink
                ></span
              >
            </p>
          </div>
        </form>
      </div>
    </div>
    <!-- tablet end -->
    <!-- desktop start -->
    <div class="hidden xl:flex xl:h-screen xl:items-center xl:gap-x-16">
      <img
        src="/src/assets/images/register/register.jpg"
        alt="register"
        class="w-1/2 h-5/6 object-cover object-center rounded-lg"
      />
      <div class="w-1/2 flex flex-col gap-y-8">
        <h1 class="font-volkhov text-3xl">ASPA</h1>
        <h2 class="font-volkhov">Create Account</h2>
        <form
          @submit.prevent="createHandler"
          class="flex flex-col gap-y-4"
        >
          <div class="grid grid-cols-2 gap-x-4 gap-y-3">
            <Input
              placeholder="First Name"
              v-model:model="data.firstname"
            />
            <Input
              placeholder="Last Name"
              v-model:model="data.lastname"
            />
            <Input
              placeholder="Email Address"
              type="email"
              v-model:model="data.email"
            />
            <Input
              placeholder="Phone Number (+62xxx)"
              v-model:model="data.phone"
            />
            <Input
              placeholder="Password"
              type="password"
              v-model:model="data.password"
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              v-model:model="data.confirmPassword"
            />
          </div>
          <div class="flex flex-col gap-y-3">
            <Button
              type="submit"
              class="w-full"
              >Create Account</Button
            >
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
          </div>
        </form>
      </div>
    </div>
    <!-- desktop end -->
  </section>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import useVuelidate from "@vuelidate/core";
import {
  email,
  helpers,
  minLength,
  required,
  sameAs,
} from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { phoneValidate } from "@/validations/phone";

const toast = useToast();
const router = useRouter();

const data = reactive({
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const rules = computed(() => {
  return {
    firstname: {
      required: helpers.withMessage("Firstname harus di isi", required),
    },
    email: {
      required: helpers.withMessage("Email harus di isi", required),
      email,
    },
    phone: {
      required: helpers.withMessage("Nomor harus di isi", required),
      minLength: helpers.withMessage("Panjang nomor kurang", minLength(13)),
      phoneValidate: helpers.withMessage("Bukan format nomor", phoneValidate),
    },
    password: {
      required: helpers.withMessage("Password harus di isi", required),
      minLength: helpers.withMessage("Minimal 8 karakter", minLength(8)),
    },
    confirmPassword: {
      sameAs: helpers.withMessage(
        "Konfirmasi password harus sama dengan password",
        sameAs(data.password)
      ),
      minLength: helpers.withMessage("Minimal 8 karakter", minLength(8)),
    },
  };
});
const v$ = useVuelidate(rules, data);

const createHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const { firstname, lastname, email, phone, password } = data;
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        { firstname, lastname, email, phone, password }
      );
      toast.success("Berhasil membuat akun", {
        onClose: () => router.push("/signin"),
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};
</script>
