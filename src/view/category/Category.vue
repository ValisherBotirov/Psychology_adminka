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
            </SButton
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
                        {{ item?.name }}
                    </th>
                    <td class="flex items-center px-6 py-4 space-x-4 justify-end">
                        <SButton variant="secondary" @click="openSubCategory(item)"
                        >Tets bo'limini qo'shish
                        </SButton
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
                modal-title="Testlar"
                :is-open="openActionModal"
                @closeModal="closeActionModal"
                @saveModal="openActionModal = false"
                :notBtn="false"
        >

            <div>
                <div class="flex gap-4">
                    <p class="flex-basis-[209px]"><b> 0-50 % </b> natija uchun</p>
                    <Textarea :error="$vSubcategory.mark1.$error" v-model="formSubcategory.mark1"
                              custom-class="!h-[40px] py-1" class="w-full" placeholder="Sharhni yozing" l/>
                </div>
                <div class="flex gap-4 mt-3">
                    <p class=" !flex-basis-[209px]"><b>51-63 % </b> natija uchun</p>
                    <Textarea :error="$vSubcategory.mark2.$error" v-model="formSubcategory.mark2"
                              custom-class="!h-[40px] py-1" class="w-full" placeholder="Sharhni yozing" l/>
                </div>
                <div class="flex gap-4 mt-3">
                    <p class=" !flex-basis-[209px]"><b>64-71 % </b> natija uchun</p>
                    <Textarea :error="$vSubcategory.mark3.$error" v-model="formSubcategory.mark3"
                              custom-class="!h-[40px] py-1" class="w-full" placeholder="Sharhni yozing" l/>
                </div>
                <div class="flex gap-4 mt-3">
                    <p class=" !flex-basis-[209px]"><b>72-85 % </b> natija uchun</p>
                    <Textarea :error="$vSubcategory.mark4.$error" v-model="formSubcategory.mark4"
                              custom-class="!h-[40px] py-1" class="w-full" placeholder="Sharhni yozing" l/>
                </div>
                <div class="flex gap-4 mt-3">
                    <p class=" !flex-basis-[209px]"><b>86-100 % </b> natija uchun</p>
                    <Textarea :error="$vSubcategory.mark5.$error" v-model="formSubcategory.mark5"
                              custom-class="!h-[40px] py-1" class="w-full" placeholder="Sharhni yozing" l/>
                </div>
            </div>
            <div class="flex gap-3 items-end mt-4">
                <FormInput
                        label="Subkategoriya nomini  kiriting"
                        placeholder="Subkategoriya nomini  kiriting"
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
                    Subkategoriya qo'shish
                </SButton
                >
            </div>

            <div class="!max-h-[220px] overflow-y-scroll">
                <table class="w-full text-sm text-left text-gray-500 mt-4 h-full">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="p-4">#</th>
                        <th scope="col" class="px-6 py-3">Subkategoriya</th>
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
            <div class="mt-7"></div>
        </ActionModal>
    </div>
</template>
<script setup>
import {onMounted, ref} from "@vue/runtime-core";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";
import SButton from "@/components/buttons/SButton.vue";
import {computed, reactive} from "vue";
import axios from "@/plugins/axios.js";
import FormInput from "@/components/input/FormInput.vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import ActionModal from "@/components/modal/ActionModal.vue";
import {useCategoryStore} from "@/store/categories.js";
import Textarea from "@/components/input/textarea.vue";

import {useToast} from "vue-toastification";

const toast = useToast();
const categoryStore = useCategoryStore();

const formCategory = reactive({
    title: "",
});
const ruleCategory = computed(() => {
    return {
        title: {required},
    };
});

const $vCategory = useVuelidate(ruleCategory, formCategory);

function addCategory() {
    $vCategory.value.$validate();
    if (!$vCategory.value.$error) {
        if (!isEdit.value) {
            axios
                .post("/category", {name: formCategory.title})
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
    isEdit.value = item.ID;
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

// action modal || subcategory
const subCategoryList = ref([]);
const openActionModal = ref(false);

const formSubcategory = reactive({
    title: "",
    mark1: "",
    mark2: "",
    mark3: "",
    mark4: "",
    mark5: "",
    categoryID: 0,
    price: null,
});

const ruleSubcategory = reactive(() => {
    return {
        title: {required},
        price: {required},
        mark1: {required},
        mark2: {required},
        mark3: {required},
        mark4: {required},
        mark5: {required},
    };
});

const $vSubcategory = useVuelidate(ruleSubcategory, formSubcategory);

function openSubCategory(item) {
    openActionModal.value = true;
    formSubcategory.categoryID = item.ID;
    fetchSubCategoryList(item.ID);
}

function fetchSubCategoryList(id) {
    axios
        .get("test/get/all-by-category-id/" + id)
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
                        formSubcategory.mark1 = "", formSubcategory.mark2 = "", formSubcategory.mark3 = "", formSubcategory.mark4 = "", formSubcategory.mark5 = "",

                        (formSubcategory.price = ""),
                        (editSubCategory.value = "");
                    $vSubcategory.value.$reset();
                });
        } else {
            const fetchObj = {
                title: formSubcategory.title,
                ID: editSubCategory.value,
                price:formSubcategory.price,
                mark1:formSubcategory.mark1,
                mark2:formSubcategory.mark2,
                mark3:formSubcategory.mark3,
                mark4:formSubcategory.mark4,
                mark5:formSubcategory.mark5,
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
                    formSubcategory.mark1 = "", formSubcategory.mark2 = "", formSubcategory.mark3 = "", formSubcategory.mark4 = "", formSubcategory.mark5 = "",
                        (formSubcategory.price = ""),
                    $vSubcategory.value.$reset();
                });
        }
    }
}

function editSubcategory(item) {
    console.log(item,"item")
    editSubCategory.value = item.id;
    formSubcategory.title = item.title;
    formSubcategory.price = item.price;
    formSubcategory.mark1 = item.mark1;
    formSubcategory.mark2 = item.mark2;
    formSubcategory.mark3 = item.mark3;
    formSubcategory.mark4 = item.mark4;
    formSubcategory.mark5 = item.mark5;
}

const deleteSubcategoryId = ref(null);

function closeActionModal() {
    openActionModal.value = false;
    $vSubcategory.value.$reset();
}

// new code

const categoryList = computed(() => categoryStore.categories);

onMounted(() => {
    categoryStore.fetchCategoryAll();
});
</script>
