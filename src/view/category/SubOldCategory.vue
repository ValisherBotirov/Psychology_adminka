<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">
        Izohli testli test qo'shish
      </h3>
    </div>
    <div class="bg-white p-3 rounded-lg">
      <SButton variant="info" @click="addFeedbacks" class="my-2 gap-2">
        <i class="fa-solid fa-plus"></i>
        Qo'shish
      </SButton>
      <div
        v-for="(item, index) in formSubcategory.feedbacks"
        :key="index"
        class="flex gap-4 items-center my-2"
      >
        <FormInput
          v-model="item.percent"
          placeholder="0 - 100"
          type="number"
          custom-class="!p-2"
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
      <div
        v-if="addFeedbacksForEdit === `edit`"
        class="flex justify-end"
        @click="feedbackAdd"
      >
        <SButton variant="info"> Feedbackni saqlash </SButton>
      </div>
      <div class="flex gap-3 items-end mt-6 border-t pt-3">
        <FormInput
          label="Test nomini  kiriting"
          placeholder="Test nomini  kiriting"
          v-model="formSubcategory.title"
          :error="$v.title.$error"
          customClass="!p-2 bg-white"
          class="w-full"
        />
        <FormInput
          placeholder="0"
          label="Narxi"
          type="number"
          v-model="formSubcategory.price"
          :error="$v.price.$error"
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
            <th scope="col" class="px-6 py-3">Test</th>
            <th scope="col" class="px-6 py-3">Narxlar</th>
            <th scope="col" class="px-6 py-3 text-end">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(item, index) in subCategoryList"
            :key="index"
            v-if="subCategoryList.length"
          >
            <th
              v-if="item?.testType === 'OLD'"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ item?.title }}
            </th>
            <th
              v-if="item?.testType === 'OLD'"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ item?.price }} <span class="ml-3">sum</span>
            </th>
            <td
              v-if="item?.testType === 'OLD'"
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

const formSubcategory = reactive({
  ID: "",
  title: "",
  price: null,
  testType: "OLD",
  categoryID: route.params.id,
  feedbacks: [
    {
      key: null,
      percent: Number(null) ? Number(null) : Number(100),
      description: "",
    },
  ],
});

const ruleSubcategory = computed(() => {
  return {
    title: { required },
    price: { required },
  };
});

const $v = useVuelidate(ruleSubcategory, formSubcategory);

function feedbackAdd() {
  axios
    .post(
      `/test/add-feedback/${formSubcategory.ID}`,
      formSubcategory.feedbacks.map((item) => {
        return JSON.parse(item);
      })
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
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
const editSubCategory = ref("create");
const addFeedbacksForEdit = ref();
function addSubcategory() {
  $v.value.$validate();
  if (!$v.value.$error) {
    if (editSubCategory.value === `create`) {
      axios
        .post("/test", formSubcategory)
        .then((res) => {
          fetchSubCategoryList(route.params.id);
          toast.success("Muvaffaqiyatli qo'shildi !");
        })
        .catch((err) => {
          toast.error(`Xatolik mavjud !`);
          console.log(err);
        })
        .finally(() => {
          formSubcategory.title = "";
          formSubcategory.price = "";
          $v.value.$reset();
          formSubcategory.feedbacks = [
            {
              // id: 1,
              key: null,
              percent: 0 ? 0 : 100,
              description: "",
            },
          ];
        });
    }
    //  else if (addFeedbacksForEdit.value === "edit") {
    //   axios
    //     .post(`/test/add-feedback/${route.params.id}`, formSubcategory)
    //     .then((res) => {
    //       console.log(res);
    //       fetchSubCategoryList(route.params.id);
    //       toast.success("Test tahlilandi !");
    //     })
    //     .catch((err) => {
    //       toast.error(`Xatolik mavjud !`);
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       formSubcategory.title = "";
    //       formSubcategory.price = "";
    //       $v.value.$reset();
    //       formSubcategory.feedbacks = [
    //         {
    //           // id: 1,
    //           key: null,
    //           percent: null ? null : 100,
    //           description: "",
    //         },
    //       ];
    //     });
    // }
  }
}

function addFeedbacks() {
  const data = {
    // id: formSubcategory.feedbacks.length + 1,
    key: null,
    percent: Number(100),
    description: "",
  };
  formSubcategory.feedbacks.push(data);

  if (editSubCategory.value === `editButton`) {
    return (addFeedbacksForEdit.value = "edit");
  } else {
    return editSubCategory.value === `create`;
  }
}

function deleteOption(id) {
  formSubcategory.feedbacks = formSubcategory.feedbacks.filter(
    (el) => el.id !== id
  );
}

function editSubcategory(item) {
  editSubCategory.value = `editButton`;
  formSubcategory.ID = item.id;
  formSubcategory.title = item.title;
  formSubcategory.price = item.price;
  formSubcategory.feedbacks = item.feedbacks;
}

onMounted(() => {
  fetchSubCategoryList(route.params.id);
});
</script>
