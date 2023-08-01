<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">Kategoriyalar</h3>
    </div>

    <div class="flex gap-3 items-end">
      <FormInput
        placeholder="Kategoriya uz"
        v-model="formCategory.nameUZ"
        :error="$vCategory.nameUZ.$error"
        label="Kategoriya uz"
        customClass="!p-2 bg-white"
        class="w-full"
      />
      <FormInput
        placeholder="Kategoriya ru"
        v-model="formCategory.nameRU"
        :error="$vCategory.nameRU.$error"
        label="Kategoriya ru"
        customClass="!p-2 bg-white"
        class="w-full"
      />
      <SButton variant="info" @click="addCategory"
        >Yangi kategoriya qo'shish</SButton
      >
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <BlockPreloader
        v-if="categoryStore.loading"
        width="100%"
        margin="10px 0"
        height="40px"
        :loading="categoryStore.loading"
        v-for="i in 10"
        :key="i"
      ></BlockPreloader>

      <table class="w-full text-sm text-left text-gray-500" v-else>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">Kategoriya_uz</th>
            <th scope="col" class="px-6 py-3">Kategoriya_ru</th>

            <th scope="col" class="px-6 py-3 text-center">Amallar</th>
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
              {{ item?.nameUZ }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.nameRU }}
            </th>

            <td class="flex items-center px-6 py-4 space-x-4 justify-end">
              <SButton variant="secondary" @click="openSubCategory(item)"
                >Subkategoriya qo'shish</SButton
              >
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
                @click="productDelete(item?.ID)"
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
    <!--      subcategoriya-->
    <ActionModal
      custom-class="!max-w-[750px] relative"
      modal-title="Subcategoriyalar"
      :is-open="openActionModal"
      @closeModal="closeActionModal"
      @saveModal="openActionModal = false"
    >
      <div class="flex gap-3 items-end">
        <FormInput
          placeholder="Subkategoriya uz"
          v-model="formSubcategory.nameUZ"
          :error="$vSubcategory.nameUZ.$error"
          label="Subkategoriya uz"
          customClass="!p-2 bg-white"
          class="w-full"
        />
        <FormInput
          placeholder="Subkategoriya ru"
          v-model="formSubcategory.nameRU"
          :error="$vSubcategory.nameRU.$error"
          label="Subkategoriya uz"
          customClass="!p-2 bg-white"
          class="w-full"
        />
        <SButton variant="info" @click="addSubcategory">
          Subkategoriya qo'shish</SButton
        >
      </div>
      <table class="w-full text-sm text-left text-gray-500 mt-4">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">Subkategoriya_uz</th>
            <th scope="col" class="px-6 py-3">Subkategoriya_ru</th>
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
            <td class="w-4 p-4">
              <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
            </td>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.nameUZ }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.nameRU }}
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
                @click="deleteSubCategory(item.ID)"
              >
                <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-7"></div>
    </ActionModal>

    <!-- Publisher part -->
    <div>
      <div class="mt-20 mb-5">
        <h3 class="text-gray-700 text-3xl font-medium">Publisherlar</h3>
      </div>
      <div class="flex items-end gap-3">
        <FormInput
          placeholder="Publisher"
          v-model="formPublisher.name"
          :error="$vPublisher.name.$error"
          label="Publisher"
          customClass="!p-2 bg-white"
          class="w-full"
        />
        <SButton variant="info" @click="addPublisher"
          >Publisher qo'shish</SButton
        >
      </div>
      <table class="w-full text-sm text-left text-gray-500 mt-4">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">Publisherlar</th>
            <th scope="col" class="px-6 py-3 text-end">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(item, index) in publisherList"
            :key="index"
          >
            <td class="w-4 p-4">
              <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
            </td>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.name }}
            </th>
            <td class="flex items-center px-6 py-4 space-x-4 justify-end">
              <div
                @click="itemEditPublisher(item)"
                class="font-medium text-blue-600 hover:underline cursor-pointer"
              >
                <i
                  class="fa-solid fa-pen-to-square text-[blue] text-[20px]"
                ></i>
              </div>
              <div
                class="font-medium text-red-600 hover:underline cursor-pointer"
                @click="deletedPublish(item?.id)"
              >
                <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
              </div>
              <DeleteModal
                title="Haqiqatdan ham ushbu publisherni o'chirmoqchimisiz?"
                :is-open="deletePublisher"
                @delete="deletedPublisher"
                @closeModal="deletePublisher = $event"
              />
              <EditPublisher
                custom-class="!max-w-[750px] relative"
                modal-title="Edit publisher"
                :is-open="openEditPublisher"
                @closeModal="closeModalPublisher"
                @saveModal="editPublisher"
              >
                <FormInput
                  placeholder="Publisher"
                  v-model="formPublisherEdit.modalName"
                  :error="$vPublisherEdit.modalName.$error"
                  customClass="!p-2 bg-white"
                  class="w-full"
                />
              </EditPublisher>
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
import { useCategoryStore } from "@/store/categories.js";
import { useToast } from "vue-toastification";
const toast = useToast();

const categoryStore = useCategoryStore();
const categoryList = computed(() => categoryStore.categories);

const formCategory = reactive({
  nameUZ: "",
  nameRU: "",
});
const ruleCategory = computed(() => {
  return {
    nameUZ: { required },
    nameRU: { required },
  };
});

const $vCategory = useVuelidate(ruleCategory, formCategory);

function addCategory() {
  $vCategory.value.$validate();
  if (!$vCategory.value.$error) {
    if (!isEdit.value) {
      const fetchObj = {
        nameUZ: formCategory.nameUZ,
        nameRU: formCategory.nameRU,
        parentID: 0,
      };
      axios
        .post("/category", fetchObj)
        .then((res) => {
          console.log(res);
          toast.success("Kategory qo'shildi !!!");
          fetchCategoryList();
        })
        .catch((err) => {
          console.log(err);
          toast.error(`Xatolik mavjud !`);
        })
        .finally(() => {
          (formCategory.nameRU = ""),
            (formCategory.nameUZ = ""),
            $vCategory.value.$reset();
        });
    } else {
      const fetchObj = {
        nameUZ: formCategory.nameUZ,
        nameRU: formCategory.nameRU,
        ID: isEdit.value,
      };
      axios
        .patch("/category", fetchObj)
        .then((res) => {
          console.log(res);
          toast.success("Kategory qo'shildi !!!");
          fetchCategoryList();
        })
        .catch((err) => {
          console.log(err);
          toast.error(`Xatolik mavjud !`);
        })
        .finally(() => {
          (formCategory.nameRU = ""),
            (formCategory.nameUZ = ""),
            (isEdit.value = "");
          $vCategory.value.$reset();
        });
    }
  }
}

// edit category
const isEdit = ref(null);
function itemEdit(item) {
  isEdit.value = item.ID;
  formCategory.nameUZ = item.nameUZ;
  formCategory.nameRU = item.nameRU;
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
      fetchCategoryList();
      isEdit.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

// action modal || subcategory
const subCategoryList = ref([]);
const openActionModal = ref(false);

const formSubcategory = reactive({
  nameUZ: "",
  nameRU: "",
  parentID: 0,
});

const ruleSubcategory = reactive(() => {
  return {
    nameUZ: { required },
    nameRU: { required },
  };
});

const $vSubcategory = useVuelidate(ruleSubcategory, formSubcategory);

function openSubCategory(item) {
  openActionModal.value = true;
  formSubcategory.parentID = item.ID;
  fetchSubCategoryList(item.ID);
}

function fetchSubCategoryList(id) {
  axios.get('category/sub-details/'+id).then((res)=>{
      console.log(res,"sub res")
      subCategoryList.value = res.data
  }).catch((err)=>{
      console.log(err)
  })
}

function deleteSubCategory(id) {
  axios
    .delete("/category/" + id)
    .then((res) => {
      console.log(res);
      fetchSubCategoryList(formSubcategory.parentID);
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
        .post("category", formSubcategory)
        .then((res) => {
          console.log(res);
          fetchSubCategoryList(formSubcategory.parentID);
        })
        .catch((err) => {
          console.log(err);
        })
          .finally(() => {
              (formSubcategory.nameRU = ""),
                  (formSubcategory.nameUZ = ""),
                  (editSubCategory.value = "");
              $vSubcategory.value.$reset();
          });
    } else {
      const fetchObj = {
        nameUZ: formSubcategory.nameUZ,
        nameRU: formSubcategory.nameRU,
        ID: editSubCategory.value,
      };
      axios
        .patch("/category", fetchObj)
        .then((res) => {
          console.log(res);
          fetchSubCategoryList(formSubcategory.parentID);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          (formSubcategory.nameRU = ""),
            (formSubcategory.nameUZ = ""),
            (editSubCategory.value = "");
          $vSubcategory.value.$reset();
        });
    }
  }
}

function editSubcategory(item) {
  console.log(item, "subcategoriya item");
  editSubCategory.value = item.ID;
  formSubcategory.nameRU = item.nameRU;
  formSubcategory.nameUZ = item.nameUZ;
}

const deleteSubcategoryId = ref(null);

function closeActionModal() {
  openActionModal.value = false;
  $vSubcategory.value.$reset();
}

// fetch category list

function fetchCategoryList() {
  categoryStore.fetchCategoryAll();

  //   get Publisher  Function
  getPublisher.getPublisher();
}
onMounted(() => {
  fetchCategoryList();
});

/////////////////////////////////////////////////////////////////////////////////

// Publisher script part //

import { usePublisherGet } from "@/store/publisherGet";
import EditPublisher from "@/components/modal/ActionModal.vue";
const getPublisher = usePublisherGet();
const publisherList = computed(() => getPublisher.publisherGetList);
const deletePublisher = ref(false);
const openEditPublisher = ref(false);
const publishDeleteId = ref();
const publishEditId = ref();
const formPublisher = reactive({
  name: "",
});

const formPublisherEdit = reactive({
    modalName: "",
});

const rulePublisher = computed(() => {
  return {
    name: { required },
  };
});
const rulePublisherEdit = computed(() => {
  return {
    modalName: { required },
  };
});

function itemEditPublisher(item) {
  openEditPublisher.value = true;
  formPublisherEdit.modalName = item?.name;
  publishEditId.value = item?.id;
}
function closeModalPublisher() {
  openEditPublisher.value = false;
  $vPublisher.value.$reset();
}

const $vPublisher = useVuelidate(rulePublisher, formPublisher);
const $vPublisherEdit = useVuelidate(rulePublisherEdit, formPublisherEdit);

// add publisher
function addPublisher() {
  $vPublisher.value.$validate();
  if (!$vPublisher.value.$error) {
    axios
      .post("/publisher" + `?name=${formPublisher.name}`)
      .then((res) => {
        toast.success("Publisher qo'shildi !!!");
        fetchCategoryList();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formPublisher.name = "";
        $vPublisher.value.$reset();
      });
  }
}

// delete publisher
function deletedPublisher() {
  axios
    .delete(`/publisher/${publishDeleteId.value}`)
    .then((res) => {
      fetchCategoryList();
      toast.success("Publisher o'chirildi !");
    })
    .catch((err) => {
      toast.error("Xatolik mavjud !");
    });
}
function deletedPublish(id) {
  deletePublisher.value = true;
  publishDeleteId.value = id;
}

// edit publisher
function editPublisher() {
    $vPublisherEdit.value.$validate();
  if (!$vPublisherEdit.value.$error) {
    axios
      .put(`publisher/${publishEditId.value}?name=${formPublisherEdit.modalName}`)
      .then((res) => {
        fetchCategoryList();
        toast.success("Muvaffaqiyatli o'zgartirildi !");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        openEditPublisher.value = false;
      });
  }
}
</script>
