<template>
  <div class="bg-[#fff] p-8 rounded-md">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium text-center">
        Yangiliklar bo'limi
      </h3>
      <div @click="addPartnerBtn">
        <SButton variant="info"> Yangilik qo'shish</SButton>
      </div>
    </div>
    <div class="flex justify-between gap-4 mt-4">
      <FormInput
        v-model="winnerData.link"
        type="string"
        :error="$v.link.$error"
        label="Url"
        placeholder="Url"
        class="w-full"
      />
      <UploadImages
        ref="removeImg"
        :img="editImages"
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
          <th scope="col" class="px-6 py-3">Yangilik haqida</th>
          <th scope="col" class="px-6 py-3">Yanglik rasmi</th>
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
            {{ item?.link }}
          </th>
          <th class="font-medium text-gray-900 whitespace-nowrap">
            <img
              :src="item?.image?.url"
              alt="image"
              class="w-[200px] h-[80px] object-contain"
            />
          </th>
          <td class="flex items-center px-6 py-4 space-x-4 justify-end">
            <div
              @click="addNewsId(item)"
              class="font-medium text-blue-600 hover:underline cursor-pointer"
            >
              <i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i>
            </div>
            <div
              class="font-medium text-red-600 hover:underline cursor-pointer"
              @click="deleteModal(item?.id)"
            >
              <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
            </div>
            <DeleteModal
              :isOpen="openDeleteModal"
              @closeModal="(e) => (openDeleteModal = e)"
              @delete="deleted"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <AddModal
      custom-class="!max-w-[750px] relative"
      modal-title="Subcategoriyalar"
      :is-open="ctionModalClose"
      @saveModal="ctionModalClose = false"
    />
  </div>
</template>
<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import AddModal from "@/components/modal/ActionModal.vue";
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
const ctionModalClose = ref(false);
const forDeleteId = ref("");
const data = ref([]);
const winnerData = reactive({
  link: "",
  imageId: "",
});

const rules = computed(() => {
  return {
    link: { required, minLength: minLength(3) },
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

// post news api
const $v = useVuelidate(rules, winnerData);
const removeImg = ref();
const addPartnerBtn = async () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    try {
      const newsData = {
        link: winnerData.link,
        imageId: winnerData.imageId,
      };
      const news = await axios.post("/news", newsData);
      toast.success("Yangliklar qo'shildi !");
    } catch (error) {
      console.log(error);
    } finally {
      (winnerData.link = ""), (winnerData.imageId = "");
      removeImg.value.removeImage();
      $v.value.$reset();
      getNews();
    }
  }
};

// get new api
async function getNews() {
  try {
    const newsGet = await axios.get("/news/get-all");
    data.value = newsGet.data;
  } catch (error) {
    console.log(error);
  }
}

function deleteModal(item) {
  openDeleteModal.value = true;
  forDeleteId.value = item;
  console.log(item);
}

// delete news api

async function deleted() {
  try {
    const deleteNews = await axios.delete(`news/${forDeleteId.value}`);
    console.log(deleteNews);
  } catch (error) {
    console.log(error);
  } finally {
    getNews();
  }
}

// edit news api
const editImages = ref("")
function addNewsId(item) {
  editImages.value = item.image.url;
  winnerData.link = item.link;
}

onMounted(() => {
  getNews();
});
</script>
<style>
.test-name::-webkit-scrollbar {
  display: none;
}
</style>
