<template>
  <div class="mt-20">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">
        Category testli test qo'shish
      </h3>
    </div>
    <div class="bg-white p-3 rounded-lg">
      <div class="flex gap-[55px]">
        <SButton variant="info" @click="addFeedbacks" class="my-2 gap-2">
          <i class="fa-solid fa-plus"></i>
          Qo'shish
        </SButton>
      </div>
      <div
        v-for="(item, index) in formSubcategoryNew.feedbacks"
        :key="index"
        class="flex gap-4 items-center my-2"
      >
        <Textarea
          v-model="item.key"
          custom-class="!h-[40px] py-1"
          class="w-[20%]"
          placeholder="Test category"
        />
        <Textarea
          v-model="item.description"
          custom-class="!h-[40px] py-1"
          class="w-full"
          placeholder="Sharhni yozing"
        />
        <div
          @click="deleteOption(item?.id)"
          class="font-medium text-red-600 hover:underline cursor-pointer"
        >
          <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
        </div>
      </div>
      <div class="flex gap-3 items-end mt-6 border-t pt-3">
        <FormInput
          label="Test nomini  kiriting"
          placeholder="Test nomini  kiriting"
          v-model="formSubcategoryNew.title"
          customClass="!p-2 bg-white"
          :error="$vSubcategoryNew.title.$error"
          class="w-full"
        />
        <FormInput
          placeholder="0"
          label="Narxi"
          type="number"
          v-model="formSubcategoryNew.price"
          :error="$vSubcategoryNew.price.$error"
          customClass="!p-2 bg-white"
          class="w-[30%]"
        />
        <SButton variant="info" @click="addNew"> Test qo'shish </SButton>
      </div>
      <table
        class="w-full text-sm text-left text-gray-500 mt-4 h-full rounded-lg"
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">Narxlar</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3 text-end">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="subCategoryList.length"
            class="bg-white border-b hover:bg-gray-50"
            v-for="(item, index) in subCategoryList"
            :key="index"
          >
            <th
              v-if="item?.testType === 'NEW'"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ item?.title }}
            </th>
            <th
              v-if="item?.testType === 'NEW'"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ item?.price }} <span class="ml-3">sum</span>
            </th>
            <th>
              <tr
                v-if="item?.testType === 'NEW'"
                v-for="itemChild in item.feedbacks"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{
                  itemChild?.key
                }}
              </tr>
            </th>
            <td
              v-if="item?.testType === 'NEW'"
              class="flex items-center px-6 py-4 space-x-4 justify-end"
            >
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
      <DeleteModal
        title="Haqiqatdan ham ushbu testni o'chirmoqchimisiz?"
        :is-open="openDeleteModal"
        @delete="deletedTest"
        @closeModal="openDeleteModal = $event"
      />
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
const forDeleteId = ref();
const openDeleteModal = ref(false);
// action modal || subcategory
const subCategoryList = ref([]);
const openActionModal = ref(false);

const formSubcategoryNew = reactive({
  ID:"",
  title: "",
  price: null,
  testType: "NEW",
  categoryID: route.params.id,
  feedbacks: [
    {
      id: 1,
      key: "",
      percent: null,
      description: "",
    },
  ],
});

const ruleSubcategoryNew = computed(() => {
  return {
    price: { required },
    title: { required },
  };
});

const $vSubcategoryNew = useVuelidate(ruleSubcategoryNew, formSubcategoryNew);

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
  forDeleteId.value = id;
  openDeleteModal.value = true;
}
function deletedTest() {
  axios
    .delete(`test/${forDeleteId.value}`)
    .then((res) => {
      fetchSubCategoryList(route.params.id);
      toast.success("Test o'chirildi !");
    })
    .catch((err) => {
      toast.error("Xatolik mavjud !");
      console.log(err);
    });
}

const editSubCategory = ref(null);

function addNew() {
  $vSubcategoryNew.value.$validate();
  if (!$vSubcategoryNew.value.$error) {
    if (editSubCategory.value === null) {
      axios
        .post("/test", formSubcategoryNew)
        .then((res) => {
          fetchSubCategoryList(route.params.id);
          toast.success("Muvaffaqiyatli qo'shildi !");
        })
        .catch((err) => {
          toast.error(`Xatolik mavjud !`);
          console.log(err);
        })
        .finally(() => {
          formSubcategoryNew.title = "";
          formSubcategoryNew.price = "";
          (formSubcategoryNew.feedbacks = [
            {
              id: 1,
              key: "",
              percent: "" ? "" : "100",
              description: "",
            },
          ]),
            $vSubcategoryNew.value.$reset();
        });
    } else {
      axios
        .patch("/test", formSubcategoryNew)
        .then((res) => {
          fetchSubCategoryList(route.params.id);
          toast.success("Muvaffaqiyatli qo'shildi !");
        })
        .catch((err) => {
          toast.error(`Xatolik mavjud !`);
          console.log(err);
        })
        .finally(() => {
          formSubcategoryNew.title = "";
          formSubcategoryNew.price = "";
          (formSubcategoryNew.feedbacks = [
            {
              id: 1,
              key: "",
              percent: "" ? "" : "100",
              description: "",
            },
          ]),
            $vSubcategoryNew.value.$reset();
        });
    }
  }
}

function addFeedbacks() {
  const data = {
    id: formSubcategoryNew.feedbacks.length + 1,
    key: "",
    percent: "" ? "" : "100",
    description: "",
  };
  formSubcategoryNew.feedbacks.push(data);
}

function deleteOption(id) {
  formSubcategoryNew.feedbacks = formSubcategoryNew.feedbacks.filter(
    (el) => el.id !== id
  );
}

function editSubcategory(item) {
  editSubCategory.value = item.id;
  formSubcategoryNew.ID = item.id;
  formSubcategoryNew.title = item.title;
  formSubcategoryNew.price = item.price;
  formSubcategoryNew.feedbacks = item.feedbacks;
}

onMounted(() => {
  fetchSubCategoryList(route.params.id);
});
</script>
