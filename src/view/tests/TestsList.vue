<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium text-center">
        Testlar bo'limi
      </h3>
      <router-link to="/test/one">
        <SButton variant="info"> Yangi test qo'shish</SButton>
      </router-link>
    </div>
    <div class="flex items-center gap-4 mt-4">
      <SingleSelect
        v-model="subcategoryValue"
        placeholder="Test nomini tanlang"
        :data="subcategoryData"
        @changeSelect="getList"
        class="w-full"
      />
    </div>
    <table class="w-full text-sm text-left text-gray-500 mt-4">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="p-4">#</th>
          <th scope="col" class="px-6 py-3">Testlar</th>
          <th scope="col" class="px-6 py-3">Type</th>
          <th scope="col" class="px-6 py-3 text-end">Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b hover:bg-gray-50"
          v-for="(item, index) in data"
          :key="index"
        >
          <td class="w-4 p-4">
            <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
          </td>
          <th
            class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[350px] break-words overflow-x-scroll"
          >
            {{ item?.title }}
          </th>
          <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ item?.testType }}
          </th>
          <td class="flex items-center px-6 py-4 space-x-4 justify-end">
            <div class="cursor-pointer hover:text-blue-700 font-medium"></div>
            <div
              @click="editTest(item)"
              class="font-medium text-blue-600 hover:underline cursor-pointer"
            >
              <i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i>
            </div>
            <div
              @click="getDeleteId(item)"
              class="font-medium text-red-600 hover:underline cursor-pointer"
            >
              <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
            </div>
            <DeleteModal
              :isOpen="openDeleteModal"
              @closeModal="(e) => (openDeleteModal = e)"
              @delete="deleteTest"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import SingleSelect from "@/components/select/SingleSelect.vue";
import DeleteModal from "@/components/modal/DeleteModal.vue";

import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";

import { useCategoryStore } from "@/store/categories.js";
import { onMounted } from "@vue/runtime-core";
import axios from "@/plugins/axios.js";
const categoryStore = useCategoryStore();

const toast = useToast();
const router = useRouter();
const route = useRoute();
const openDeleteModal = ref(false);
const subcategoryValue = ref("");
const data = ref();

const subcategoryData = computed(() =>
  categoryStore.subCategories.map((el) => {
    return {
      value: el.id,
      label: el.title,
    };
  })
);
// get test list
async function getList() {
  try {
    const getData = await axios.get(
      `/question/get-all-by-test-id/${subcategoryValue.value}`
    );
    data.value = getData.data;
  } catch (error) {
    console.log(error);
  }
}

function editTest(item) {
  console.log(item);
  switch (item.questionType) {
    case "CHECKBOX":
      navigateRouter("one", item.id);
      break;
    case "MULTIPLE_CHOICE":
      navigateRouter("more", item.id);
      break;
    case "CLOSE_QUESTIONS":
      navigateRouter("close", item.id);
      break;
  }
}
function navigateRouter(url, id) {
  // router.push(`/test/${url}`)
  console.log("run navigator");
  router.replace({
    path: `/test/${url}`,
    query: { id },
  });
}

const itemId = ref("");
function getDeleteId(item) {
  itemId.value = item.id;
  openDeleteModal.value = true;
}

async function deleteTest() {
  try {
    const deleteTest = await axios.delete(`/question/${itemId.value}`);
    getList();
    toast.success("Test muvaffaqiyatli o'chirildi!");
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  categoryStore.fetchSubCategoryAll();
  toast.info("Tets kategoriyalaridan birini tanlang!");
});
</script>

<style>
.test-name::-webkit-scrollbar {
  display: none;
}
</style>
