<template>
  <section class="px-8">
    <!-- mobile start -->
    <div class="md:hidden flex flex-col gap-y-6 pb-12">
      <img
        src="/src/assets/images/forgot-password/forgot-password.jpg"
        alt="forgot password"
        class="rounded-lg"
      />
      <h1 class="font-volkhov text-center text-3xl">ASPA</h1>
      <h2 class="font-volkhov text-lg">Forgot Password</h2>
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-5"
      >
        <Input
          placeholder="Firstname"
          v-model:model="form.firstname"
        />
        <Input
          placeholder="Lastname"
          v-model:model="form.lastname"
        />
        <Input
          placeholder="Email"
          type="email"
          v-model:model="form.email"
        />
        <Input
          placeholder="Phone"
          v-model:model="form.phone"
        />
        <Button
          type="submit"
          class="w-full"
          >Send Confirmation Code</Button
        >
      </form>
      <p class="font-poppins text-right">
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
    <!-- mobile end -->

    <!-- tablet start -->
    <div class="hidden md:flex md:flex-col md:gap-y-5 xl:hidden">
      <img
        src="/src/assets/images/forgot-password/forgot-password.jpg"
        alt="forgot password"
        class="rounded-lg"
      />
      <h1 class="font-volkhov text-center text-4xl">ASPA</h1>
      <h2 class="font-volkhov text-xl">Forgot Password</h2>
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-5"
      >
        <Input
          placeholder="Firstname"
          v-model:model="form.firstname"
        />
        <Input
          placeholder="Lastname"
          v-model:model="form.lastname"
        />
        <Input
          placeholder="Email"
          type="email"
          v-model:model="form.email"
        />
        <Input
          placeholder="Phone"
          v-model:model="form.phone"
        />
        <Button
          type="submit"
          class="w-full"
          >Send Confirmation Code</Button
        >
      </form>
      <p class="font-poppins text-right">
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
    <!-- tablet end -->

    <!-- desktop start -->
    <div class="hidden xl:flex xl:items-center xl:h-screen gap-x-16">
      <img
        src="/src/assets/images/forgot-password/forgot-password.jpg"
        alt="forgot password"
        class="w-1/2 h-3/4 object-cover"
      />
      <div class="w-1/2 flex flex-col justify-between gap-y-12">
        <h1 class="font-volkhov text-3xl">ASPA</h1>
        <h2 class="font-volkhov text-lg">Forgot Password</h2>
        <form
          @submit.prevent="submitHandler"
          class="grid grid-cols-2 gap-x-4 gap-y-7"
        >
          <Input
            placeholder="Firstname"
            v-model:model="form.firstname"
          />
          <Input
            placeholder="Lastname"
            v-model:model="form.lastname"
          />
          <Input
            placeholder="Email"
            type="email"
            v-model:model="form.email"
          />
          <Input
            placeholder="Phone"
            v-model:model="form.phone"
          />
          <Button
            type="submit"
            class="w-full col-span-2"
            >Send Confirmation Code</Button
          >
          <p class="font-poppins text-right col-span-2">
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
    </div>
    <!-- desktop end -->

    <!-- pop up start -->
    <div
      class="w-full h-screen bg-black/50 fixed z-50 top-0 left-0 px-8 flex items-center"
      v-if="isConfirm"
    >
      <div
        class="bg-white w-full xl:w-fit xl:mx-auto h-fit p-4 rounded-lg flex flex-col justify-center text-center gap-y-4 font-poppins"
      >
        <p class="text-xl">Your confirmation code is</p>
        <p class="text-2xl">{{ store.data.confirmationCode }}</p>
        <Button
          @some-event="popUpHandler"
          class="w-full"
          >Oke</Button
        >
      </div>
    </div>
    <!-- pop up end -->
  </section>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useForgotStore } from "@/store/forgotStore";
import { phoneValidate } from "@/validations/phone";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required, email } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = useForgotStore();
const router = useRouter();

const isConfirm = ref(false);

const form = reactive({
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
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
  };
});

const v$ = useVuelidate(rules, form);

const submitHandler = async () => {
  if (store.data.confirmationCode !== "") {
    isConfirm.value = true;
    return;
  }
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/forgot",
        form
      );
      console.log(response.data);
      store.$patch({
        data: {
          id: response.data.id,
          confirmationCode: response.data.confirmationCode,
        },
      });
      isConfirm.value = true;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};

const popUpHandler = () => {
  isConfirm.value = false;
  router.push("/confirmationcode");
};
</script>
