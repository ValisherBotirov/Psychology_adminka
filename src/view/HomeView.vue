<template>
  <div>
    <h3 class="text-gray-700 text-3xl font-medium">Dashboard</h3>

    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div
            class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
          >
            <div
              class="p-3 w-[56px] h-[56px] flex justify-center items-center rounded-full bg-indigo-600 bg-opacity-75"
            >
              <i class="fa-solid fa-users text-white text-2xl"></i>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ dataStatus?.usersCount }}
              </h4>
              <div class="text-gray-500">Foydalanuvchilar</div>
            </div>
          </div>
        </div>

        <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
          <div
            class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
          >
            <div
              class="w-[56px] h-[56px] flex justify-center items-center rounded-full bg-orange-600 bg-opacity-75"
            >
              <i
                class="fa-solid fa-file-signature text-white text-2xl ml-2"
              ></i>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ dataStatus?.testsCount }}
              </h4>
              <div class="text-gray-500">Testlar soni</div>
            </div>
          </div>
        </div>

        <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
          <div
            class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
          >
            <div
              class="p-3 w-[56px] h-[56px] flex justify-center items-center rounded-full bg-pink-600 bg-opacity-75"
            >
              <i class="fa-solid fa-graduation-cap text-white text-2xl"></i>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ dataStatus?.studentsCount }}
              </h4>
              <div class="text-gray-500">O'quvchilar soni</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--        active orders-->

    <h3 class="text-gray-700 text-2xl font-medium mt-8 mb-4">
      So'ngi xabarlar
    </h3>
    <!-- <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <BlockPreloader
        v-if="false"
        width="100%"
        margin="10px 0"
        height="40px"
        :loading="false"
        v-for="i in 10"
        :key="i"
      ></BlockPreloader>

      <table class="w-full text-sm text-left text-gray-500" v-else>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">F.I.SH</th>
            <th scope="col" class="px-6 py-3">Buyurtma vaqti</th>
            <th scope="col" class="px-6 py-3">Buyurtma nomi</th>
            <th scope="col" class="px-6 py-3">Buyurtma narxi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(item, index) in 5"
            :key="index"
          >
            <td class="w-4 p-4">
              <router-link
                :to="`users/${index}`"
                class="font-bold cursor-pointer hover:text-[blue]"
                >{{ index + 1 }}.</router-link
              >
            </td>
            <th
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer hover:text-[blue]"
            >
              <router-link :to="`users/${index}`"> Valisher </router-link>
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              order
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              order
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              narxi
            </th>
          </tr>
        </tbody>
      </table>
    </div> -->
    <div class="bg-[#fff] p-8 rounded-md">
      <table class="w-full text-sm text-left text-gray-500 mt-4">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">F.I.Sh</th>
            <th scope="col" class="px-6 py-3">Tel nomer</th>
            <th scope="col" class="px-6 py-3">Tasnif</th>
            <th scope="col" class="px-6 py-3 text-end">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(item, index) in store.newData"
            :key="index"
          >
            <td class="w-4 p-4">
              <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
            </td>
            <th
              class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[450px] break-words overflow-x-scroll"
            >
              {{ item?.fullName }}
            </th>
            <th
              class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[450px] break-words overflow-x-scroll"
            >
              {{ item?.phoneNumber }}
            </th>
            <th class="font-medium text-gray-900">
              {{ item?.comment }}
            </th>
            <td class="flex items-center justify-end px-6 py-4 space-x-4">
              <div>
                <i
                  class="fa-solid fa-circle text-xl text-[red] cursor-pointer"
                ></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--        active persona-->
    <!-- <h3 class="text-gray-700 text-2xl font-medium mt-8 mb-4">
      Faol Foydalanuvchilar
    </h3> -->
    <!-- <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <BlockPreloader
        v-if="false"
        width="100%"
        margin="10px 0"
        height="40px"
        :loading="false"
        v-for="i in 10"
        :key="i"
      ></BlockPreloader>

      <table class="w-full text-sm text-left text-gray-500" v-else>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">F.I.SH</th>
            <th scope="col" class="px-6 py-3">Telefon raqami</th>
            <th scope="col" class="px-6 py-3">Tug'ilgan kuni</th>
            <th scope="col" class="px-6 py-3">Yashash manzili</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(item, index) in 5"
            :key="index"
          >
            <td class="w-4 p-4">
              <router-link
                :to="`users/${index}`"
                class="font-bold cursor-pointer hover:text-[blue]"
                >{{ index + 1 }}.</router-link
              >
            </td>
            <th
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer hover:text-[blue]"
            >
              <router-link :to="`users/${index}`"> valisher </router-link>
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ PhoneNumberFormatter("998945369887") }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              nimadir
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              nimadir2
            </th>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DeleteModal from "@/components/modal/DeleteModal.vue";

import axios from "@/plugins/axios.js";
import { useToast } from "vue-toastification";
// import formatDate from "@/helpers/formatDate";
import { PhoneNumberFormatter } from "@/helpers/formatNumber.js";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";
import { useMassageStore } from "@/store/massage.js";
const store = useMassageStore();
const toast = useToast();
const dataStatus = ref();
async function getStatus() {
  try {
    const status = await axios.get(`/statistics/get`);
    dataStatus.value = status.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getStatus();
});
</script>
