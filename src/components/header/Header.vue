<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600"
  >
    <div class="flex items-center">
      <button
        @click="emit('openSidebar2')"
        class="text-gray-500 focus:outline-none lg:hidden"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center">
      <div class="profile relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="relative block w-8 h-8 overflow-hidden rounded-full bg-gray-700 shadow focus:outline-none"
        >
          <i class="far fa-user text-gray-300"></i>
          <span class="w-full h-full rounded-full bg-gray-900"></span>
        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 z-10 w-full h-full"
        ></div>

        <div
          v-show="dropdownOpen"
          class="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl"
        >

          <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 hover:text-white cursor-pointer">
            Profile
          </router-link>

            <router-link to="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 hover:text-white cursor-pointer" @click="logout">
            Logout</router-link>

        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import {useAuthStore} from "@/store/auth.js";
const emit = defineEmits(["openSidebar2"]);
// const notificationOpen = ref(false);
const dropdownOpen = ref(false);
const  authStore = useAuthStore()
function logout(){
    authStore.logOut()
}
</script>
