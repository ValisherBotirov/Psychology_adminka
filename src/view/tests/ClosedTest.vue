<template>
  <div>
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
          v-model="form.title"
        />
        <UploadImages
          line
          class="w-full"
          label="Savol rasmini yuklash (ixtiyoriy)"
          @getBase64="getQuestionImages"
        />
      </div>
      <div class="flex items-center mt-4 gap-4">
        <FormInput
          placeholder="Javobni kiriting"
          label="Yoziladigan javobni kiriting"
          custom-class="py-[10px]"
          class="w-full"
          v-model="form.correctCloseAnswer"
          :error="$v.correctCloseAnswer.$error"
        />
        <FormInput
          placeholder="0"
          custom-class="py-[10px]"
          label="Savol uchun ball belgilang"
          class="w-full"
          v-model="form.score"
          :error="$v.score.$error"
        />
      </div>
      <div class="flex justify-end mt-6">
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
import { computed, reactive } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import SingleSelect from "@/components/select/SingleSelect.vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/store/categories.js";
import axios from "../../plugins/axios.js";

const categoryStore = useCategoryStore();

const toast = useToast();
const route = useRoute();

const subcategoryData = computed(() =>
  categoryStore.subCategories.map((el) => {
    return {
      value: el.id,
      label: el.title,
    };
  })
);

const routeId = route.query.id;

const form = reactive({
  testType: "CLOSE_QUESTIONS",
  title: "",
  imageID: "",
  testID: "",
  correctCloseAnswer: "",
  score: null,
});

const rule = computed(() => {
  return {
    correctCloseAnswer: { required },
    score: { required },
    testID: { required },
  };
});

const $v = useVuelidate(rule, form);

function getQuestionImages(e) {
  const formData = new FormData();
  formData.append("file", e);
  axios.post("media/upload", formData).then((res) => {
    console.log(res);
    form.imageID = res.data.id;
  });
}

function onSubmit() {
  if (!routeId) {
    $v.value.$validate();
  }
  if (!$v.value.$error) {
    console.log(form, "opt");
    axios
      .post("/question", form)
      .then((res) => {
        console.log(res);
        toast.success("Test muvaffaqiyatli qo'shildi");
      })
      .catch((err) => {
        toast.error("Qo'shishda xatolik yuz berdi!");
      })
      .finally(() => {
        setTimeout(() => {
          // window.location.reload();
        }, 1000);
      });
  }
}

onMounted(() => {
  categoryStore.fetchSubCategoryAll();
});
</script>
