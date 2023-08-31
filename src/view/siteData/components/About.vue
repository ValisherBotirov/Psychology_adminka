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
        />
        <div class="w-[50%] flex justify-end">
          <img
            :src="dataRezult?.image?.url"
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
      label="Tile"
      placeholder="Title"
      class="w-full"
    />
    <div class="my-4">
      <h1 class="font-medium cursor-pointer"># 1 {{ dataRezult?.slogan }}</h1>
    </div>
    <div @click="rezults" class="flex justify-end mt-5">
      <SButton variant="info"> Natija qo'shish </SButton>
    </div>
    <FormInput
      v-model="achievement"
      label="Natijalar"
      placeholder="Natijalar"
      class="w-full"
    />
    <table class="w-full text-sm text-left text-gray-500 mt-4">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Natijalar</th>
          <th scope="col" class="px-6 py-3 text-end">Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in dataChild"
          class="bg-white border-b hover:bg-gray-50"
        >
          <td
            class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[450px] break-words overflow-x-scroll"
          >
            <p>{{ item }}</p>
          </td>
          <td class="flex px-6 py-4 space-x-4 justify-end">
            <!-- <div class="cursor-pointer hover:text-blue-700 font-medium"></div> -->
            <!-- <div
              class="font-medium text-blue-600 hover:underline cursor-pointer"
            >
              <i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i>
            </div> -->
            <div
              class="font-medium text-red-600 hover:underline cursor-pointer"
              @click="deletedIndex(index)"
            >
              <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
            </div>
            <DeleteModal
              :isOpen="openDeleteModal"
              @closeModal="(e) => (openDeleteModal = e)"
              @delete="deleteRezult"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import SButton from "@/components/buttons/SButton.vue";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import FormInput from "@/components/input/FormInput.vue";
import UploadImages from "@/components/input/uploadImages.vue";
import axios from "@/plugins/axios.js";
const toast = useToast();
const openDeleteModal = ref(false);
const openBtn = ref(false);
const imageValue = ref("");
const removeImg = ref();
const dataRezult = ref();
const dataChild = ref();
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
});

const addWinnerBtn = async () => {
  try {
    const data = {
      slogan: aboutData.slogan ? aboutData.slogan : null,
      fullName: aboutData.fullName ? aboutData.fullName : null,
      imageID: aboutData.imageID ? aboutData.imageID : null ,
    };
    const postAbout = await axios.post(`about-me/post`, data);
    getData();
    toast.success("Muvaffaqiyatli qo'shildi !");
  } catch (error) {
    console.log(error);
    toast.error("Xatolik mavjud !");
  } finally {
    (aboutData.fullName = ""),
      (aboutData.imageID = ""),
      (aboutData.slogan = "");
      removeImg.value.removeImage();
    $v.value.$reset();
  }
};

// get data
async function getData() {
  try {
    const get = await axios.get(`/about-me/get`);
    dataRezult.value = get.data;
    dataChild.value = get.data.achievements;
  } catch (error) {
    console.log(error);
  }
}

// delete api
const indexForDelete = ref();
function deletedIndex(index) {
  openDeleteModal.value = true;
  indexForDelete.value = index;
}
async function deleteRezult() {
  try {
    const deletedItem = await axios.delete(`/about-me/${indexForDelete.value}`);
    getData();
    toast.success("Natija o'chirildi !");
  } catch (error) {
    toast.error("Natijani o'chirishda xatolik !");
    console.log(error);
  }
}

const achievement = ref("");
async function rezults() {
  try {
    const rezult = await axios.post(
      `about-me/add-achievement?achievement=${achievement.value}`
    );
    getData();
    toast.success("Natija qo'shildi")
  } catch (error) {
    console.log(error);
  } finally {
    achievement.value = "";
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
