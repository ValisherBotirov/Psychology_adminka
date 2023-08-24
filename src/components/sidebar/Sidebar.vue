<template>
  <div
    v-cloak
    :class="sidebarOpen ? 'block' : 'hidden'"
    @click="emit('closeSidebar')"
    class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
  ></div>

  <div
    v-cloak
    :class="
      sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
    "
    class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto border-r border-black transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0"
  >
    <div class="flex items-center px-6 mt-8">
      <p class="font-medium text-2xl flex justify-start">
        <router-link to="/"> Dashboard </router-link>
      </p>
    </div>

    <nav class="mt-10">
      <div>
        <RouterLink
          class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-500"
          :class="
            route.path === '/'
              ? 'text-gray-100 bg-opacity-25 bg-gray-700'
              : 'text-gray-500'
          "
          to="/"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="#3751FF"
            viewBox="0 0 24 24"
            stroke="#3751FF"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
          <span class="mx-3">Bosh sahifa</span>
        </RouterLink>
        <RouterLink
          class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
          :class="
            route.path.includes('/category')
              ? 'text-gray-100 bg-opacity-25 bg-gray-700'
              : 'text-gray-500'
          "
          to="/category"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="#3751FF"
            viewBox="0 0 24 24"
            stroke="#3751FF"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
            />
          </svg>

          <span class="mx-3">Kategoriya qo'shish</span>
        </RouterLink>
        <RouterLink
          class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
          :class="
            route.path.includes('/list')
              ? 'text-gray-100 bg-opacity-25 bg-gray-700'
              : 'text-gray-500'
          "
          to="/list"
        >
          <i class="fa-solid fa-circle-question text-xl text-[#3751FF]"></i>

          <span class="mx-3">Testlar listi</span>
        </RouterLink>
        <RouterLink
          class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
          :class="
            route.path.includes('/test')
              ? 'text-gray-100 bg-opacity-25 bg-gray-700'
              : 'text-gray-500'
          "
          to="/test/one"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="#3751FF"
            viewBox="0 0 24 24"
            stroke="#3751FF"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
            />
          </svg>

          <span class="mx-3">Test qo'shish</span>
        </RouterLink>
        <RouterLink
          class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
          :class="
            route.path.includes('/massage')
              ? 'text-gray-100 bg-opacity-25 bg-gray-700'
              : 'text-gray-500'
          "
          to="/massage"
        >
          <i
            :class="store.coundMassage > 0 ? 'text-[red]' : 'text-[#3751FF]'"
            class="fa-solid fa-comment-sms relative"
            ><span
              class="absolute text-[12px] font-[900] bottom-2 left-4 text-[red]"
              >{{ store.coundMassage }}</span
            ></i
          >
          <span :class="massage > 0 ? 'text-[red]' : ''" class="mx-3"
            >Habarlar</span
          >
        </RouterLink>
        <RouterLink
          class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
          :class="
            route.path.includes('/site-data')
              ? 'text-gray-100 bg-opacity-25 bg-gray-700'
              : 'text-gray-500'
          "
          to="/site-data"
        >
          <i class="fa-solid fa-folder-plus text-[#3751FF]"></i>
          <span class="mx-3">Boshqalar</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useMassageStore } from "@/store/massage.js";
const store = useMassageStore();
const route = useRoute();

const emit = defineEmits(["closeSidebar"]);
const props = defineProps(["sidebarOpen"]);
// ADMIN, SELLER
const userRole = sessionStorage.getItem("userRole");
</script>
