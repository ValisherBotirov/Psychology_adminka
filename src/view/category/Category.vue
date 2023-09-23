<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">Kategoriyalar</h3>
    </div>
    <!--<pre>{{categoryList}}</pre>-->
    <div class="flex gap-3 items-end">
      <FormInput
        placeholder="Kategoriya nomi"
        v-model="formCategory.title"
        :error="$vCategory.title.$error"
        label="Kategoriya "
        customClass="!p-2 bg-white"
        class="w-full"
      />
      <SButton variant="info" @click="addCategory"
        >Yangi kategoriya qo'shish
      </SButton>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <BlockPreloader
        v-if="false"
        width="100%"
        margin="10px 0"
        height="40px"
        :loading="false"
        v-for="i in 10"
        :key="i"
      ></BlockPreloader>
      <table class="w-full text-sm text-left text-gray-500" v-else>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">Kategoriya nomi</th>
            <th scope="col" class="px-6 py-3 text-end pr-[40px]">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(item, index) in categoryList"
            :key="index"
          >
            <td class="w-4 p-4">
              <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
            </td>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.name }}
            </th>
            <td class="flex items-center px-6 py-4 space-x-4 justify-end">
              <SButton variant="secondary">
                <router-link :to="`/category/${item.id}`"
                  >Test qo'shish bo'limi</router-link
                >
              </SButton>
              <div
                @click="itemEdit(item)"
                class="font-medium text-blue-600 hover:underline cursor-pointer"
              >
                <i
                  class="fa-solid fa-pen-to-square text-[blue] text-[20px]"
                ></i>
              </div>
              <div
                class="font-medium text-red-600 hover:underline cursor-pointer"
                @click="productDelete(item?.id)"
              >
                <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
              </div>
              <DeleteModal
                title="Haqiqatdan ham ushbu kategoriyani o'chirmoqchimisiz?"
                :is-open="openDeleteModal"
                @delete="fetchDeleteModal"
                @closeModal="openDeleteModal = $event"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";
import SButton from "@/components/buttons/SButton.vue";
import { computed, reactive } from "vue";
import axios from "@/plugins/axios.js";
import FormInput from "@/components/input/FormInput.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useCategoryStore } from "@/store/categories.js";

import { useToast } from "vue-toastification";

const toast = useToast();
const categoryStore = useCategoryStore();

const formCategory = reactive({
  title: "",
});
const ruleCategory = computed(() => {
  return {
    title: { required },
  };
});

const $vCategory = useVuelidate(ruleCategory, formCategory);

function addCategory() {
  $vCategory.value.$validate();
  if (!$vCategory.value.$error) {
    if (!isEdit.value) {
      axios
        .post("/category", { name: formCategory.title })
        .then((res) => {
          toast.success("Kategory qo'shildi !!!");
          categoryStore.fetchCategoryAll();
        })
        .catch((err) => {
          console.log(err);
          toast.error(`Xatolik mavjud !`);
        })
        .finally(() => {
          formCategory.title = "";
          $vCategory.value.$reset();
        });
    } else {
      axios
        .patch(`/category/${isEdit.value}?name=${formCategory.title}`)
        .then((res) => {
          toast.success("Muvaqiyatli tahrirlandi!");
          categoryStore.fetchCategoryAll();
        })
        .catch((err) => {
          console.log(err);
          toast.error(`Xatolik mavjud !`);
        })
        .finally(() => {
          (formCategory.title = ""), (isEdit.value = "");
          $vCategory.value.$reset();
        });
    }
  }
}

// edit category
const isEdit = ref(null);

function itemEdit(item) {
  isEdit.value = item.id;
  formCategory.title = item.name;
}

// delete category
const openDeleteModal = ref(false);
const deleteId = ref("");

function productDelete(id) {
  openDeleteModal.value = true;
  deleteId.value = id;
}

function fetchDeleteModal() {
  axios
    .delete("/category/" + deleteId.value)
    .then((res) => {
      console.log(res);
      isEdit.value = "";
      toast.success("Muvaffaqiyatli o'chirildi");
      categoryStore.fetchCategoryAll();
    })
    .catch((err) => {
      console.log(err);
    });
}

const categoryList = computed(() => categoryStore.categories);

onMounted(() => {
  categoryStore.fetchCategoryAll();
});
</script>
