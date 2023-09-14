<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">
        Izohli testli test qo'shish
      </h3>
    </div>
    <div class="bg-white p-3 rounded-lg">
      <p class="pb-1 font-medium">Sharh qo'shish</p>
      <div class="flex gap-4">
        <FormInput
          placeholder="100"
          type="number"
          :max="100"
          :maxlength="3"
          custom-class="!p-2"
        />
        <Textarea
          :error="$vSubcategory.mark1.$error"
          v-model="formSubcategory.mark1"
          custom-class="!h-[40px] py-1"
          class="w-full"
          placeholder="Sharhni yozing"
        />
      </div>

      <div class="flex gap-3 items-end mt-6 border-t pt-3">
        <FormInput
          label="Test nomini  kiriting"
          placeholder="Test nomini  kiriting"
          v-model="formSubcategory.title"
          :error="$vSubcategory.title.$error"
          customClass="!p-2 bg-white"
          class="w-full"
        />
        <FormInput
          placeholder="0"
          label="Narxi"
          v-model="formSubcategory.price"
          :error="$vSubcategory.price.$error"
          customClass="!p-2 bg-white"
          class="w-[30%]"
        />

        <SButton variant="info" @click="addSubcategory">
          Test qo'shish
        </SButton>
      </div>

      <table
        class="w-full text-sm text-left text-gray-500 mt-4 h-full rounded-lg"
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">Test</th>
            <th scope="col" class="px-6 py-3">Narxlar</th>
            <th scope="col" class="px-6 py-3 text-end">Amallar</th>
          </tr>
        </thead>
        <tbody class="">
          <tr
            v-if="subCategoryList.length"
            class="bg-white border-b hover:bg-gray-50"
            v-for="(item, index) in subCategoryList"
            :key="index"
          >
            <td class="w-4 p-4">
              <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
            </td>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.title }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.price }} <span class="ml-3">sum</span>
            </th>

            <td class="flex items-center px-6 py-4 space-x-4 justify-end">
              <div
                @click="editSubcategory(item)"
                class="font-medium text-blue-600 hover:underline cursor-pointer"
              >
                <i
                  class="fa-solid fa-pen-to-square text-[blue] text-[20px]"
                ></i>
              </div>
              <div
                class="font-medium text-red-600 hover:underline cursor-pointer"
                @click="deleteSubCategory(item.id)"
              >
                <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
              </div>
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
import ActionModal from "@/components/modal/ActionModal.vue";
import Textarea from "@/components/input/textarea.vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const route = useRoute();

// edit category
const isEdit = ref(null);

// action modal || subcategory
const subCategoryList = ref([]);
const openActionModal = ref(false);

const formSubcategory = reactive({
  title: "",
  mark1: "",
  categoryID: 0,
  price: null,
});

const ruleSubcategory = reactive(() => {
  return {
    title: { required },
    price: { required },
    mark1: { required },
  };
});

const $vSubcategory = useVuelidate(ruleSubcategory, formSubcategory);

function fetchSubCategoryList(id) {
  axios
    .get("test/get/all/" + id)
    .then((res) => {
      subCategoryList.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteSubCategory(id) {
  axios
    .delete("test/" + id)
    .then((res) => {
      fetchSubCategoryList(formSubcategory.categoryID);
    })
    .catch((err) => {
      console.log(err);
    });
}

const editSubCategory = ref(null);

function addSubcategory() {
  $vSubcategory.value.$validate();
  if (!$vSubcategory.value.$error) {
    if (!editSubCategory.value) {
      axios
        .post("test", formSubcategory)
        .then((res) => {
          console.log(res);
          fetchSubCategoryList(formSubcategory.categoryID);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          (formSubcategory.title = ""),
            (formSubcategory.mark1 = ""),
            (formSubcategory.price = ""),
            (editSubCategory.value = "");
          $vSubcategory.value.$reset();
        });
    } else {
      const fetchObj = {
        title: formSubcategory.title,
        ID: editSubCategory.value,
        price: formSubcategory.price,
        mark1: formSubcategory.mark1,
        mark2: formSubcategory.mark2,
        mark3: formSubcategory.mark3,
        mark4: formSubcategory.mark4,
        mark5: formSubcategory.mark5,
      };
      axios
        .patch("test", fetchObj)
        .then((res) => {
          console.log(res);
          fetchSubCategoryList(formSubcategory.categoryID);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          (formSubcategory.title = ""), (editSubCategory.value = "");
          (formSubcategory.mark1 = ""),
            (formSubcategory.price = ""),
            $vSubcategory.value.$reset();
        });
    }
  }
}

function editSubcategory(item) {
  console.log(item, "item");
  editSubCategory.value = item.id;
  formSubcategory.title = item.title;
  formSubcategory.price = item.price;
  formSubcategory.mark1 = item.mark1;
}

onMounted(() => {
  fetchSubCategoryList(route.params.id);
});
</script>
