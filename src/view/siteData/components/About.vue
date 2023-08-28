<template>
  <div class="bg-[#fff] p-8 rounded-md">
    <div class="flex justify-between">
      <h3 class="text-gray-700 text-3xl font-medium">Biz haqimizda bo'limi</h3>
      <div v-if="openBtn" @click="addWinnerBtn" class="flex justify-end mt-10">
        <SButton variant="info" class="">Rasm o'zgartirish </SButton>
      </div>
    </div>
    <div>
      <div class="flex justify-between mt-10">
        <UploadImages
          ref="removeImg"
          @getBase64="imageValu"
          line
          :img="imageValue"
          inputId="2"
          class="w-full"
          label="Rasm yuklash"
          :error="$v.imageID.$error"
        />
        <div class="w-[50%] flex justify-end">
          <img
            :src="dataList?.image?.url"
            alt="image"
            class="w-[150px] h-[150px] rounded-[50%]"
          />
          <!-- <div class="cursor-pointer" @click="openDeleteModal = true">
            <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
          </div> -->
        </div>
      </div>
    </div>
    <div @click="addWinnerBtn" class="flex justify-end mt-10">
      <SButton variant="info"> Sarlavha qo'shish</SButton>
    </div>
    <FormInput
      v-model="aboutData.slogan"
      :error="$v.slogan.$error"
      label="Tile"
      placeholder="Title"
      class="w-full"
    />
    <div class="my-4">
      <h1 class="font-medium cursor-pointer"># 1 {{ dataList?.slogan }}</h1>
    </div>
    <div @click="addWinnerBtn" class="flex justify-end mt-5">
      <SButton variant="info"> Natija qo'shish</SButton>
    </div>
    <FormInput
      v-model="aboutData.achievements"
      :error="$v.achievements.$error"
      label="Natijalar"
      placeholder="Natijalar"
      class="w-full"
    />
    <table class="w-full text-sm text-left text-gray-500 mt-4">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="p-4">#</th>
          <th scope="col" class="px-6 py-3">Natijalar</th>
          <th scope="col" class="px-6 py-3 text-end">Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b hover:bg-gray-50">
          <td class="w-4 p-4">
            <p class="font-bold cursor-pointer">1</p>
          </td>
          <th
            class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[450px] break-words overflow-x-scroll"
            v-for="item in dataList?.achievements"
            :key="item?.id"
          >
            {{ item }}
          </th>
          <td class="flex px-6 py-4 space-x-4 justify-end">
            <div class="cursor-pointer hover:text-blue-700 font-medium"></div>
            <div
              class="font-medium text-blue-600 hover:underline cursor-pointer"
            >
              <i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i>
            </div>
            <div
              class="font-medium text-red-600 hover:underline cursor-pointer"
              @click="openDeleteModal = true"
            >
              <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
            </div>
            <DeleteModal
              :isOpen="openDeleteModal"
              @closeModal="(e) => (openDeleteModal = e)"
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
import axios from "@/plugins/axios.js";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const toast = useToast();
const openDeleteModal = ref(false);
const openBtn = ref(false);
const imageValue = ref("");
const removeImg = ref();
const dataList = ref();
function imageValu(e) {
  const formData = new FormData();
  formData.append("file", e);
  axios
    .post("media/upload", formData)
    .then((res) => {
      aboutData.imageID = res.data.id;
      if ((res.status = 201)) {
        openBtn.value = true;
      } else {
        openBtn.value = false;
      }
    })
    .catch(() => {
      toast.error("Rasm tanlanmadi, qayta tanlang !");
    });
}

const aboutData = reactive({
  slogan: "",
  fullName: "",
  imageID: "",
  achievements: "",
});

const rules = computed(() => {
  return {
    slogan: { required },
    imageID: { required },
    achievements: { required },
  };
});

const $v = useVuelidate(rules, aboutData);
const addWinnerBtn = async () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    try {
      const data = {
        slogan: aboutData.slogan,
        fullName: aboutData.fullName,
        imageID: aboutData.imageID,
        achievements: [aboutData.achievements],
      };
      const postAbout = await axios.post(`about-me/post`, data);
      getData();
      toast.success("Muvaffaqiyatli qo'shildi !");
    } catch (error) {
      console.log(error);
      toast.error("Xatolik mavjud !");
    } finally {
      (aboutData.achievements = ""),
        (aboutData.fullName = ""),
        (aboutData.imageID = ""),
        (aboutData.slogan = "");
      $v.value.$reset();
      removeImg.value.removeImage();
    }
  }
};

// get data

async function getData() {
  try {
    const get = await axios.get(`/about-me`);
    dataList.value = get.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getData();
});
</script>
<style>
.test-name::-webkit-scrollbar {
  display: none;
}
</style>
