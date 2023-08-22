<template>
  <div class="bg-[#fff] p-8 rounded-md">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium text-center">
        Yutuqlar bo'limi
      </h3>
      <div @click="addWinnerBtn">
        <SButton variant="info"> Yutuqlar qo'shish</SButton>
      </div>
    </div>
    <div class="flex items-center justify-between gap-4 mt-4">
      <FormInput
        v-model="winnerData.fullName"
        :error="$v.fullName.$error"
        label="F.I.Sh"
        placeholder="F.I.Sh"
        class="w-full"
      />
      <FormInput
        v-model="winnerData.job"
        :error="$v.job.$error"
        label="Kasb"
        placeholder="Kasb"
        class="w-full"
      />
      <FormInput
        v-model="winnerData.comment"
        :error="$v.comment.$error"
        label="Fikr"
        placeholder="Fikr"
        class="w-full"
      />
      <UploadImages
        ref="ok"
        :img="winnerData.imageId"
        @getBase64="imageValu"
        inputId="1"
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
          <th scope="col" class="px-6 py-3">F.I.Sh</th>
          <th scope="col" class="px-6 py-3">Kasb</th>
          <th scope="col" class="px-6 py-3">Fikr</th>
          <th scope="col" class="px-6 py-3">Rasm</th>
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
            {{ item?.fullName }}
          </th>
          <th
            class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[350px] break-words overflow-x-scroll"
          >
            {{ item?.job }}
          </th>
          <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ item?.comment }}
          </th>
          <th class="font-medium text-gray-900 whitespace-nowrap">
            <img
              :src="item?.image"
              alt="image"
              class="w-[60px] h-[60px] object-fill rounded-[50%]"
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
              @click="ifForDelete(item?.id)"
            >
              <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
            </div>
            <DeleteModal
              :isOpen="openDeleteModal"
              @closeModal="(e) => (openDeleteModal = e)"
              @delete="studentDelete"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
// import { imageEmits } from "element-plus";
import DeleteModal from "@/components/modal/DeleteModal.vue";

import { ref, reactive, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import FormInput from "@/components/input/FormInput.vue";
import UploadImages from "@/components/input/uploadImages.vue";

// validator
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import axios from "@/plugins/axios.js";

const toast = useToast();
const openDeleteModal = ref(false);
const deleteId = ref();
const data = ref();
const winnerData = reactive({
  fullName: "",
  job: "",
  comment: "",
  imageId: "",
});

const rules = computed(() => {
  return {
    fullName: { required, minLength: minLength(3) },
    job: { required, minLength: minLength(2) },
    comment: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(80),
    },
    imageId: { required },
  };
});

function imageValu(e) {
  const formData = new FormData();
  formData.append("file", e);
  axios.post("media/upload", formData).then((res) => {
    winnerData.imageId = res.data.id;
  });
}

const $v = useVuelidate(rules, winnerData);
const ok = ref();
const addWinnerBtn = async () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    const data = {
      fullName: winnerData.fullName,
      comment: winnerData.comment,
      job: winnerData.job,
      image: winnerData.imageId,
    };
    try {
      const winner = await axios.post("/active-students", data);
      getWinner();
      toast.success("O'quvchi qo'shildi !");
    } catch (error) {
      console.log(error);
      toast.error("Xatolik mavjud !");
    } finally {
      (winnerData.fullName = ""),
        (winnerData.job = ""),
        (winnerData.comment = ""),
        (winnerData.imageId = "");
      ok.value.removeImage();
      $v.value.$reset();
    }
  }
};

// get active students
async function getWinner() {
  try {
    const activeStudents = await axios.get("/active-students/get-all");
    data.value = activeStudents.data;
  } catch (error) {
    console.log(error);
  }
}

// delete active students

function ifForDelete(item) {
  deleteId.value = item;
  openDeleteModal.value = true;
}

async function studentDelete() {
  try {
    const deletedStudentApi = await axios.delete(
      `/active-students/${deleteId.value}`
    );
    toast.error("O'quvchi o'chirildi !");
    getWinner();
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  getWinner();
});
</script>
<style>
.test-name::-webkit-scrollbar {
  display: none;
}
</style>
