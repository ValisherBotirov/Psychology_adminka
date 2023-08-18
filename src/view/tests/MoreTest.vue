<template>
  <div class="transition duration-500">
    <div class="border border-gray-600 py-4 px-5 bg-white">
      <div class="flex items-center gap-4 mt-1 mb-4" v-if="!routeId">
        <SingleSelect
          v-model="form.testID"
          placeholder="Test nomini tanlang"
          :data="subcategoryData"
          :error="$v.testID.$error"
          class="w-full"
        />
      </div>
      <div class="flex gap-6">
        <Textarea
          custom-class="h-[90px]"
          label="Savolni matnini kiriting"
          class="w-full"
        />
        <UploadImages
          line
          class="w-full"
          label="Savol rasmini yuklash (ixtiyoriy)"
          @getBase64="getQuestionImages"
        />
      </div>
      <div class="flex items-end gap-10 my-4">
        <div
          class="flex gap-2 cursor-pointer group mb-2 w-full"
          @click="addNewOption"
        >
          <div
            class="w-4 h-4 border border-blue-600 flex justify-center items-center rounded-[50%] cursor-pointer p-3"
          >
            <i class="fa-solid fa-plus text-red-400"></i>
          </div>
          <p
            class="text-black transition group-hover:text-blue-700 select-none"
          >
            Yangi test varianti qo'shish
          </p>
        </div>
        <FormInput
          placeholder="0"
          custom-class="py-2"
          label="Savol uchun ball belgilang"
          class="w-full"
          v-model="form.score"
          :error="$v.score.$error"
        />
      </div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-3">
        <div
          class="flex gap-4 items-center"
          v-for="(item, index) in form.answerCreateDTOList"
          :key="index"
        >
          <div class="flex flex-col gap-2 items-center">
            <input
              id="teal-checkbox"
              type="checkbox"
              :value="item.id"
              v-model="item.correct"
              name="colored-radio"
              class="w-5 h-5 cursor-pointer"
            />
            <i
              class="fa-solid fa-trash text-lg text-red-600 cursor-pointer"
              @click="deleteOption(item.id)"
            ></i>
          </div>
          <div class="w-full flex flex-col gap-2">
            <Textarea
              custom-class="h-[60px] w-full"
              placeholder="Varinat"
              v-model="item.optionText"
            />
            <UploadImages
              small
              @getBase64="e => fetchUploadImagesId(item,e)"
              :inputId="`file${item.id}`"
              :img="item.image"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <SButton variant="secondary" class="w-[250px]" @click="onSubmit"
          >Saqlash</SButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import Textarea from "@/components/input/textarea.vue";
import UploadImages from "@/components/input/uploadImages.vue";
import { onMounted, ref } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import FormInput from "@/components/input/FormInput.vue";
import SingleSelect from "@/components/select/SingleSelect.vue";
import { useRoute } from "vue-router";
import { computed, reactive } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {useCategoryStore} from "@/store/categories.js";
import axios from "../../plugins/axios.js";

const toast = useToast();
const route = useRoute();

const categoryStore = useCategoryStore()


const subcategoryData = computed(()=> categoryStore.subCategories.map((el)=>{
    return {
        value:el.id,
        label:el.title
    }
}));

const routeId = route.query.id;

const form = reactive({
  testType: "MULTIPLE_CHOICE",
  title: "",
  imageID: null,
  testID: "",
  score: "",
  correctAnswers: [1],
  answerCreateDTOList: [
    {
      id: 1,
      optionText: "salom",
      correct: false,
      image: "",
    },
    {
      id: 2,
      optionText: "",
      correct: false,
      image: "",
    },
  ],
});

const rule = computed(() => {
  return {
    testID: { required },
      score:{required}
  };
});

const $v = useVuelidate(rule, form);

function addNewOption() {
  const option = {
    id: form.answerCreateDTOList.length + 1,
    optionText: "",
    correct: false,
    image: "",
  };
  form.answerCreateDTOList.push(option);
}

function deleteOption(id) {
  form.answerCreateDTOList = form.answerCreateDTOList.filter(
    (el) => el.id !== id
  );
}
// work images input



// work images input
function getQuestionImages(e) {
    const formData = new FormData()
    formData.append("file", e)
    axios.post('media/upload', formData).then((res) => {
        console.log(res)
        form.imageID = res.data.id
    })
}

// media upload images id

function fetchUploadImagesId(item,e){
    const formData = new FormData()
    formData.append("file",e)
    axios.post('media/upload',formData).then((res)=>{
        item.image = res.data.id
    })
}

function onSubmit() {
  if (!routeId) {
    $v.value.$validate();
  }
  if (!$v.value.$error) {
    const correctArr = [];
    form.answerCreateDTOList.forEach((el) => {
      if (el.correct) {
        correctArr.push(el.id);
      }
    });

    form.correctAnswers = correctArr;

      const check = form.answerCreateDTOList.some((el) => el.correct !== false);
      if (!check) {
          toast.error("Iltimos bitta to'g'ri javobni belgilang");
      }
      else{
          axios.post('/question',form).then((res)=>{
              console.log(res)
              toast.success("Test muvaffaqiyatli qo'shildi")
          }).catch((err)=>{
              toast.error("Qo'shishda xatolik yuz berdi!")
          }).finally(()=>{
              setTimeout(()=>{
                  window.location.reload()
              },1000)
          })
      }

    console.log(form, "opt");
  }
}

onMounted(() => {
  form.correctAnswers.forEach((id) => {
      console.log(id)
    form.answerCreateDTOList.find((el) => el.id === id).correct = true;
  });

    categoryStore.fetchSubCategoryAll();
});


</script>
