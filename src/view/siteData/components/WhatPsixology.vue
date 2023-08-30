<template>
  <div class="bg-[#fff] p-8 rounded-md">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium text-center">
        Psixologiya nima bo'limi
      </h3>
      <div @click="addWinnerBtn">
        <SButton variant="info"> Tekist qo'shish</SButton>
      </div>
    </div>
    <div class="mt-4">
      <FormInput
        v-model="aboutData.title"
        :error="$v.title.$error"
        label="Title"
        placeholder="title"
        class="w-full mb-5"
      />
      <Textarea
        custom-class="h-[250px]"
        label="Psixologiya nima teksti"
        placeholder="Psixologiya nima..."
        class="w-full"
        v-model="aboutData.content"
        :error="$v.content.$error"
      />
    </div>
    <table class="w-full text-sm text-left text-gray-500 mt-4">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="p-4">#</th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Psixologiya haqida</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b hover:bg-gray-50">
          <td class="w-4 p-4">
            <p class="font-bold cursor-pointer">1</p>
          </td>
          <th
            class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[450px] break-words overflow-x-scroll"
          >
            {{ data?.title }}
          </th>
          <th class="font-medium text-gray-900">
            {{ data?.content }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import Textarea from "@/components/input/textarea.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import FormInput from "@/components/input/FormInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import axios from "@/plugins/axios.js";

const data = ref();
const toast = useToast();
const openDeleteModal = ref(false);
const ifForEdit = ref();
const aboutData = reactive({
  title: "",
  content: "",
});

const rules = computed(() => {
  return {
    title: { required, minLength: minLength(3) },
    content: { required, minLength: minLength(3) },
  };
});

// post What Psixology api
const $v = useVuelidate(rules, aboutData);
async function addWinnerBtn() {
  $v.value.$validate();
  if (!$v.value.$error) {
    try {
      const data = {
        title: aboutData.title,
        content: aboutData.content,
      };
      const postWhatPsixology = await axios.post("/article/post", data);
      getWhatPsix();
      toast.success("Tekist qo'shildi !");
    } catch (error) {
      toast.error("Xatolik mavjud !");
      console.log(error);
    } finally {
      aboutData.title = "";
      aboutData.content = "";
      $v.value.$reset();
    }
  }
}

// get What Psixology api
async function getWhatPsix() {
  try {
    const getWhatPsixAll = await axios.get("/article/get");
    data.value = getWhatPsixAll.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getWhatPsix();
});
</script>
<style>
.test-name::-webkit-scrollbar {
  display: none;
}
</style>
