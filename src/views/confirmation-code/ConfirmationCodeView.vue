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
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-4 w-full"
      >
        <Input
          placeholder="Confirmation Code"
          v-model:model="code"
          maxlength="6"
        />
        <Button
          type="submit"
          class="w-full"
          >Recover Account</Button
        >
      </form>
    </div>
    <!-- mobile end -->
    <!-- tablet start -->
    <div
      class="hidden xl:hidden md:flex md:flex-col md:items-center md:gap-y-4"
    >
      <img
        src="/src/assets/images/forgot-password/forgot-password.jpg"
        alt="confirmation code"
        class="rounded-lg"
      />
      <h1 class="font-volkhov text-4xl">ASPA</h1>
      <h2 class="self-start font-volkhov text-lg">
        Enter The Confirmation Code
      </h2>
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-8 w-full"
      >
        <Input
          placeholder="Confirmation Code"
          v-model:model="code"
          maxlength="6"
        />
        <Button
          type="submit"
          class="w-full"
          >Recover Account</Button
        >
      </form>
    </div>
    <!-- tablet end -->
    <!-- desktop start -->
    <div class="hidden xl:flex xl:items-center xl:gap-x-16 xl:h-screen">
      <img
        src="/src/assets/images/forgot-password/forgot-password.jpg"
        alt="confirm"
        class="w-1/2 h-4/5 rounded-lg object-cover"
      />
      <div class="w-1/2 font-volkhov flex flex-col justify-between gap-y-16">
        <div class="flex flex-col justify-between gap-y-9">
          <h1 class="text-4xl">ASPA</h1>
          <h2 class="text-lg">Enter The Confirmation Code</h2>
        </div>
        <form
          @submit.prevent="submitHandler"
          class="flex flex-col gap-y-5"
        >
          <Input
            placeholder="Confirmation Code"
            v-model:model="code"
            maxlength="6"
          />
          <Button
            type="submit"
            class="w-full"
            >Recover Account</Button
          >
        </form>
      </div>
    </div>
    <!-- desktop end -->
  </section>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useForgotStore } from "@/store/forgotStore";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useForgotStore();
const toast = useToast();
const router = useRouter();

if (store.data.id === "") {
  toast.error("Anda masih belum mendapatkan kode konfirmasi", {
    duration: 2000,
    onClose: () => router.push("/forgotpassword"),
  });
}

const code = ref("");

const submitHandler = async () => {
  if (code.value === "") {
    toast.error("Kode tidak boleh kosong");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/confirm",
      {
        id: store.data.id,
        confirmationCode: code.value,
      }
    );
    toast.success(response.data.message, {
      duration: 500,
    });
    store.$reset();
  } catch (error) {
    console.error(error);

    if (error.response.data.statusCode === 404) {
      toast.error(error.response.data.message);
      router.push("/forgotpassword");
      store.$reset();
      return;
    }
    toast.error(error.response.data.message);
  }
};
</script>
