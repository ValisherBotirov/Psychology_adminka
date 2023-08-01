<template>
  <div class="flex justify-center items-center h-screen bg-gray-200 px-6">
    <div class="bg-[#F7F7F7] px-6 py-5 rounded-[6px] text-lg w-[400px]">
      <p class="text-center font-medium text-2xl">Log in</p>
      <form class="mt-1">
        <div class="mb-4">
          <label
            for="phone"
            class="mb-2 text-base font-medium transition duration-300"
            :class="v$.phone.$error ? 'text-[red]' : ''"
            >Telefon raqam</label
          >
          <FormInput
            placeholder="(00) 000-00-00"
            type="phone"
            v-model="state.phone"
            :error="v$.phone.$error"
            customClass="!p-2 bg-white"
            class="w-full"
            v-maska="'(##) ###-##-##'"
          >
            <template #prefix>
              <span
                class="font-semibold text-base mr-2"
                :class="v$.phone.$error ? 'text-[red]' : ''"
              >
                +998
              </span>
            </template>
          </FormInput>
        </div>

        <div class="mt-4">
          <label
            for="password"
            class="mb-2 font-medium transition duration-300 text-base"
            :class="v$.password.$error ? 'text-[red]' : ''"
            >Parol</label
          >
          <FormInput
            placeholder="Parol"
            v-model="state.password"
            :error="v$.password.$error"
            type="password"
            inputClass="h-[20px]"
            custom-class=" "
          />
        </div>

        <SButton
          variant="primary_dark"
          class="w-full !rounded-0 mt-5"
          @click.prevent="formLoginData"
          :loading="loading"
          >Kirish</SButton
        >
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { onMounted } from "@vue/runtime-core";
const router = useRouter();
import axios from "@/plugins/axios.js";

import {
  required,
  email,
  minLength,
  helpers,
  maxLength,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { useAuthStore } from "@/store/auth.js";
import FormInput from "@/components/input/FormInput.vue";
import SButton from "@/components/buttons/SButton.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();

const state = reactive({
  password: "",
  phone: "",
});
const rules = computed(() => {
  return {
    password: {
      required,
    },
    phone: { required },
  };
});
const v$ = useVuelidate(rules, state);
const loading = ref(false);
const formLoginData = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    const phone =
      "+998" +
      state.phone.replaceAll("-", "").replace("(", "").replace(") ", "");
    const option = {
      phoneNumber: phone,
      password: state.password,
    };
    await authStore.getUser(option);
  }
};

onMounted(() => {
  authStore.checkUser();
  sessionStorage.setItem("isRegister", 0);
});
</script>
