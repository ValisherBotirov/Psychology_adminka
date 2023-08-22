<template>
  <div class="bg-[#fff] p-8 rounded-md">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium text-center">
        Hamkorlar bo'limi
      </h3>
      <div @click="addPartnerBtn">
        <SButton variant="info"> Hamkor qo'shish</SButton>
      </div>
    </div>
    <div class="flex justify-between gap-4 mt-4">
      <FormInput
        v-model="winnerData.name"
        :error="$v.name.$error"
        label="Hamkor nomi"
        placeholder="Hamkor nomi"
        class="w-full"
      />
      <FormInput
        v-model="winnerData.link"
        :error="$v.link.$error"
        label="Hamkor url"
        placeholder="Hamkor url"
        class="w-full"
      />
      <UploadImages
        ref="removeImg"
        :img="winnerData.imageId"
        inputId="2"
        @getBase64="imageValu"
        line
        class="w-full"
        label="Rasm yuklash"
        :error="$v.imageId.$error"
      />
    </div>
    <table class="w-full text-sm text-left text-gray-500 mt-4">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="p-4">#</th>
          <th scope="col" class="px-6 py-3">Hamkor nomi</th>
          <th scope="col" class="px-6 py-3">Hamkor urli</th>
          <th scope="col" class="px-6 py-3 flex justify-center">
            Hamkor logosi
          </th>
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
            {{ item?.name }}
          </th>
          <th
            class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[350px] break-words overflow-x-scroll"
          >
            {{ item?.link }}
          </th>
          <th class="font-medium text-gray-900 whitespace-nowrap">
            <img
              :src="item?.image?.url"
              alt="image"
              class="w-[70px] h-[70px] object-fill mx-auto"
            />
          </th>
          <td class="flex items-center px-6 py-4 space-x-4 justify-end">
            <div class="cursor-pointer hover:text-blue-700 font-medium"></div>
            <div
              class="font-medium text-blue-600 hover:underline cursor-pointer"
            >
              <i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i>
            </div>
            <div
              class="font-medium text-red-600 hover:underline cursor-pointer"
              @click="deletePartnerId(item?.id)"
            >
              <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
            </div>
            <DeleteModal
              :isOpen="openDeleteModal"
              @closeModal="(e) => (openDeleteModal = e)"
              @delete="deletedPartners"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import DeleteModal from "@/components/modal/DeleteModal.vue";

import { ref, reactive, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import FormInput from "@/components/input/FormInput.vue";
import UploadImages from "@/components/input/uploadImages.vue";

// validator
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import axios from "@/plugins/axios.js";

const toast = useToast();
const openDeleteModal = ref(false);
const data = ref();
const forIdDelete = ref();
const winnerData = reactive({
  name: "",
  link: "",
  imageId: "",
});

const rules = computed(() => {
  return {
    name: { required, minLength: minLength(3) },
    imageId: { required },
    link: { required },
  };
});

// apli post parent
function imageValu(e) {
  const formData = new FormData();
  formData.append("file", e);
  axios.post("media/upload", formData).then((res) => {
    winnerData.imageId = res.data.id;
  });
}
const $v = useVuelidate(rules, winnerData);
const removeImg = ref();
const addPartnerBtn = async () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    try {
      const data = {
        name: winnerData.name,
        link: winnerData.link,
        imageId: winnerData.imageId,
      };
      const partner = await axios.post("/partners", data);
      getPartner();
      toast.success("Hamkor qo'shildi !");
    } catch (error) {
      console.log(error);
    } finally {
      winnerData.name = "";
      winnerData.imageId = "";
      winnerData.link = "";
      removeImg.value.removeImage();
      $v.value.$reset();
    }
  }
};

// api get parent
async function getPartner() {
  try {
    const dataParent = await axios.get("/partners/get-all");
    data.value = dataParent.data;
  } catch (error) {
    console.log(error);
  }
}

// delete partner
function deletePartnerId(item) {
  openDeleteModal.value = true;
  forIdDelete.value = item;
}
async function deletedPartners() {
  try {
    const deletePartner = await axios.delete(`/partners/${forIdDelete.value}`);
    getPartner();
    toast.error("Hamkor o'chirildi !");
  } catch (error) {
    toast.error("Xatolik mavjud !");
    console.log(error);
  }
}

onMounted(() => {
  getPartner();
});
</script>
<style>
.test-name::-webkit-scrollbar {
  display: none;
}
</style>
