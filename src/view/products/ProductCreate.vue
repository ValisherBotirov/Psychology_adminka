<template>
  <div>
    <h3 class="text-gray-700 text-3xl font-medium mb-4">
      Yangi mahsulot qo'shish
    </h3>
    <div>

      <div class="flex gap-5">
        <FormInput
          placeholder="Nomi (uz)"
          v-model="formModal.nameUZ"
          :error="v$.nameUZ.$error"
          label="Mahsulot nomi (uz)"
          customClass="!p-2 bg-white"
          class="w-full"
        />
        <FormInput
          placeholder="Nomi (ru)"
          v-model="formModal.nameRU"
          :error="v$.nameRU.$error"
          label="Mahsulot nomi (ru)"
          customClass="!p-2 bg-white"
          class="w-full"
        />
      </div>

      <div class="flex gap-5">
        <FormInput
          placeholder="Muallif nomini kiriting (uz)"
          v-model="formModal.authorUZ"
          :error="v$.authorUZ.$error"
          label="Muallif nomi (uz)"
          customClass="!p-2 bg-white"
          class="w-full mt-2"
        />
        <FormInput
          placeholder="Muallif nomini kiriting (ru)"
          v-model="formModal.authorRU"
          :error="v$.authorRU.$error"
          label="Muallif nomi (ru)"
          customClass="!p-2 bg-white"
          class="w-full mt-2"
        />
      </div>

      <div class="flex gap-5">
        <FormInput
          placeholder="Kitob tilini kiriting (uz)"
          v-model="formModal.languageUZ"
          :error="v$.languageUZ.$error"
          label="Kitob tili (uz)"
          customClass="!p-2 bg-white"
          class="w-full mt-2"
        />
        <FormInput
          placeholder="Kitob tilini kiriting (ru)"
          v-model="formModal.languageRU"
          :error="v$.languageRU.$error"
          label="Kitob tili (ru)"
          customClass="!p-2 bg-white"
          class="w-full mt-2"
        />
      </div>

      <div class="flex gap-5">
        <FormInput
          placeholder="Narxi"
          v-model="formModal.paperPrice.value"
          :error="v$.paperPrice.$error"
          label="Narxi"
          type="number"
          customClass="!p-2 bg-white"
          class="w-full mt-2"
        />
          <FormInput
                  placeholder="Chegirma"
                  v-model="formModal.paperPrice.discount"
                  :error="v$.paperPrice.$error"
                  label="Chegirma %"
                  type="number"
                  customClass="!p-2 bg-white"
                  class="w-full mt-2"
          />

      </div>
        <div class="flex gap-5 mt-2">
            <FormInput
                    placeholder="Optomchi uchun narxi"
                    v-model="formModal.nextPrice"
                    :error="v$.nextPrice.$error"
                    label="Optomchi uchun narxi"
                    type="number"
                    customClass="!p-2 bg-white"
                    class="w-full mt-2"
            />
            <FormInput
                    placeholder="Sahifalar soni"
                    v-model="formModal.pageCount"
                    :error="v$.pageCount.$error"
                    label="Kitob sahifalar soni"
                    type="number"
                    customClass="!p-2 bg-white"
                    class="w-full"
            />
        </div>
      <div class="flex gap-5 mt-2">
        <SingleSelect
          v-model="formModal.categoryID"
          placeholder="Kategoriya"
          :error="v$.categoryID.$error"
          label="Kategoriya"
          :data="categoryData"
          class="w-full"
        />
          <SingleSelect
                  v-model="formModal.publisherID"
                  placeholder="Publisher"
                  :error="v$.publisherID.$error"
                  label="Publisher"
                  :data="publisherData"
                  class="w-full"
          />

      </div>

      <div class="flex gap-5 mt-2">
        <Textarea
          v-model="formModal.descriptionUZ"
          class="w-full"
          placeholder="Description (uz)"
          :error="v$.descriptionUZ.$error"
        />
        <Textarea
          v-model="formModal.descriptionRU"
          class="w-full"
          placeholder="Description (ru)"
          :error="v$.descriptionRU.$error"
        />
      </div>

      <UploadImages image="" small :error="false" />

      <!--          pdf section-->

      <div class="my-10">
        <div class="flex items-center gap-4 mb-2">
          <label
            class="font-medium text-lg cursor-pointer hover:text-blue-700 transition duration-300"
            :class="isPdf ? 'opacity-1' : 'opacity-[0.6]'"
            for="pdfLabel"
            >Kitobni pdf shakli bormi</label
          >
          <input
            type="checkbox"
            id="pdfLabel"
            class="w-5 h-5"
            v-model="isPdf"
            @change="showPdf"
          />
        </div>
        <div
          class="flex gap-6 overflow-hidden h-[2px] border border-[#000]"
          id="pdf"
        >
          <FormInput
            placeholder="Optomchi uchun narxi"
            v-model="formModal.pdfPrice"
            :error="v$.pdfPrice.$error"
            label="Optomchi uchun narxi"
            type="number"
            customClass="!p-2 bg-white"
            class="w-full mt-2"
          />
          <UploadImages image="" small :error="false" class="w-full" />
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <SButton
          variant="info"
          class="w-[200px]"
          @click="onSubmit"
          :loading="actionModalLoading"
          >Saqlash</SButton
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import FormInput from "@/components/input/FormInput.vue";
import UploadImages from "@/components/input/uploadImages.vue";
import Textarea from "@/components/input/textarea.vue";
import SingleSelect from "@/components/select/SingleSelect.vue";
import {computed, onMounted, reactive} from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ref } from "@vue/runtime-core";
import SButton from "@/components/buttons/SButton.vue";
import axios from "@/plugins/axios.js";
import {useCategoryStore} from "@/store/categories.js";
import {usePublisherGet} from "@/store/publisherGet.js";

const categoryStore = useCategoryStore()
const publisherStore =  usePublisherGet()

// form validate
const formModal = reactive({
  nameUZ: "",
  nameRU: "",
  authorUZ: "",
  authorRU: "",
  languageUZ: "",
  languageRU: "",
  categoryID: "",
  nextPrice: "",
  descriptionUZ: "",
  descriptionRU: "",
  publisherID: "",
  pageCount: "",
  pdfPrice: {
      value:1000,
      discount:5
  },
    paperPrice:{
        value:0,
        discount:0
    },
    size:"A4",
    publishedDate: new Date(),
    ISBN:"978-3-16-148410-0"
});

const rules = computed(() => {
  return {
    nameUZ: { required },
    nameRU: { required },
    authorUZ: { required },
    authorRU: { required },
    languageUZ: { required },
    languageRU: { required },
    categoryID: { required },
    nextPrice: { required },
    descriptionUZ: { required },
    descriptionRU: { required },
      publisherID: { required },
    pageCount: { required },
    pdfPrice: { required },
      paperPrice:{required}
  };
});

const v$ = useVuelidate(rules, formModal);

const actionModalLoading = ref(false);

function onSubmit() {
  v$.value.$validate();
  if (!v$.value.$error) {
    actionModalLoading.value = true;

    console.log(formModal);
    axios.post('/book',formModal).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })

    setTimeout(() => {
      actionModalLoading.value = false;
    }, 1000);
  }
}

const isPdf = ref(false);
function showPdf() {
  const pdfContent = document.getElementById("pdf");
  pdfContent.style.transition = "0.6s";
    if (isPdf.value) {
        formModal.pdfPrice = "";
        pdfContent.style.height = `${pdfContent.scrollHeight + 10}px`;
        pdfContent.style.borderColor = "transparent";
    } else {
    pdfContent.style.height = "2px";
    pdfContent.style.borderColor = "#000";
  }
}

const categoryData = computed(()=>
    categoryStore.categories.map((el)=>{
        return {
            value:el.ID,
            label:el.nameUZ
        }
    })
);

const publisherData = computed(()=>
    publisherStore.publisherGetList.map((el)=>{
        return{
            value:el.id,
            label:el.name
        }
    })
)

onMounted(()=>{
    categoryStore.fetchCategoryAll()
    publisherStore.getPublisher()
})
</script>
