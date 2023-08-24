<template>
  <!-- O'qilmagan habarlar -->
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
            <div @click="unread(item?.id)">
              <i
                class="fa-solid fa-circle text-xl text-[green] cursor-pointer"
              ></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- O'qilgan habarlar -->
  <div class="bg-[#fff] p-8 rounded-md mt-10">
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
          v-for="(item, index) in store.data"
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
          <td class="flex justify-end px-6 py-4 space-x-4">
            <div @click="idForDelete(item?.id)">
              <i
                class="fa-solid fa-trash-can text-[red] text-xl cursor-pointer"
              ></i>
            </div>
            <DeleteModal
              :isOpen="openDeleteModal"
              @closeModal="(e) => (openDeleteModal = e)"
              @delete="deleteMassage"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import DeleteModal from "@/components/modal/DeleteModal.vue";
import axios from "@/plugins/axios.js";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useMassageStore } from "@/store/massage.js";

const store = useMassageStore();
const toast = useToast();
const openDeleteModal = ref(false);
const idForDeleted = ref();

async function unread(item) {
  try {
    const unreadPut = await axios.put(`suggestions/done/${item}`);
    store.getMassage();
    store.getNewMassage();
    toast.success("Xabar o'qildi !");
  } catch (error) {
    console.log(error);
  }
}

// api delete massage

function idForDelete(item) {
  idForDeleted.value = item;
  openDeleteModal.value = true;
}
async function deleteMassage() {
  try {
    const deleted = await axios.delete(
      `suggestions/delete/${idForDeleted.value}`
    );
    store.getMassage();
    store.getNewMassage();
    toast.error("Habar o'chirildi !");
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  store.getMassage();
  store.getNewMassage();
});
</script>
<style>
.test-name::-webkit-scrollbar {
  display: none;
}
</style>
