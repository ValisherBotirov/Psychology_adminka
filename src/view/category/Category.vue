<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-gray-700 text-3xl font-medium">Kategoriyalar</h3>
        </div>

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
            >Yangi kategoriya qo'shish</SButton
            >
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
                        {{ item?.title }}
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
                        placeholder="Subkategoriya nomini  kiriting"
                        v-model="formSubcategory.title"
                        :error="$vSubcategory.title.$error"
                        customClass="!p-2 bg-white"
                        class="w-full"
                />
                <SButton variant="info" @click="addSubcategory">
                    Subkategoriya qo'shish</SButton
                >
            </div>
           <div class="max-h-[480px] overflow-y-scroll">
               <table class="w-full text-sm text-left text-gray-500 mt-4 h-full">
                   <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                   <tr>
                       <th scope="col" class="p-4">#</th>
                       <th scope="col" class="px-6 py-3">Subkategoriya</th>
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
           </div>
            <div class="mt-7"></div>
        </ActionModal>

    </div>
</template>
<script setup>
import {  ref } from "@vue/runtime-core";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";
import SButton from "@/components/buttons/SButton.vue";
import { computed, reactive } from "vue";
import axios from "@/plugins/axios.js";
import FormInput from "@/components/input/FormInput.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ActionModal from "@/components/modal/ActionModal.vue";

import { useToast } from "vue-toastification";
const toast = useToast();


const categoryList = computed(() => [
    {
        id:1,
        title:"Kategory name",
        children:[
            {
                id:1,
                title:"Child Category1"
            },
            {
                id:1,
                title:"Child Category1"
            },  {
                id:1,
                title:"Child Category1"
            },  {
                id:1,
                title:"Child Category1"
            },  {
                id:1,
                title:"Child Category1"
            },  {
                id:1,
                title:"Child Category1"
            },  {
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },{
                id:1,
                title:"Child Category1"
            },
            {
                id:2,
                title:"Child Category2"
            }
        ]
    }
]);

const formCategory = reactive({
   title:""
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
            const fetchObj = {
                title:formCategory.title,
                parentID: 0,
            };
            axios
                .post("/category", fetchObj)
                .then((res) => {
                    console.log(res);
                    toast.success("Kategory qo'shildi !!!");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(`Xatolik mavjud !`);
                })
                .finally(() => {
                    formCategory.title=""
                        $vCategory.value.$reset();
                });
        } else {
            const fetchObj = {
                title:formCategory.title,
                ID: isEdit.value,
            };
            axios
                .patch("/category", fetchObj)
                .then((res) => {
                    console.log(res);
                    toast.success("Kategory qo'shildi !!!");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(`Xatolik mavjud !`);
                })
                .finally(() => {
                    formCategory.title="",
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
    formCategory.title = item.title
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
        })
        .catch((err) => {
            console.log(err);
        });
}

// action modal || subcategory
const subCategoryList = ref([]);
const openActionModal = ref(false);

const formSubcategory = reactive({
    title:"",
    parentID: 0,
});

const ruleSubcategory = reactive(() => {
    return {
        title: { required },

    };
});

const $vSubcategory = useVuelidate(ruleSubcategory, formSubcategory);

function openSubCategory(item) {
    openActionModal.value = true;
    formSubcategory.parentID = item.ID;
    fetchSubCategoryList(item.ID);
    subCategoryList.value = item.children
}

function fetchSubCategoryList(id) {

    // axios.get('category/sub-details/'+id).then((res)=>{
    //     console.log(res,"sub res")
    //     subCategoryList.value = res.data
    // }).catch((err)=>{
    //     console.log(err)
    // })
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
                    formSubcategory.title="",
                        (editSubCategory.value = "");
                    $vSubcategory.value.$reset();
                });
        } else {
            const fetchObj = {
                title:formSubcategory.title,
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
                    formSubcategory.title="",
                        (editSubCategory.value = "");
                    $vSubcategory.value.$reset();
                });
        }
    }
}

function editSubcategory(item) {
    console.log(item, "subcategoriya item");
    editSubCategory.value = item.ID;
    formSubcategory.title=item.title;
}

const deleteSubcategoryId = ref(null);

function closeActionModal() {
    openActionModal.value = false;
    $vSubcategory.value.$reset();
}



</script>
