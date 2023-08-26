<template>
    <div class="transition duration-500">
        <div class="border border-gray-600 py-4 px-5 bg-white">
<!--            <pre>{{ form }}</pre>-->
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
                        :img="form.image"
                />
            </div>
            <div class="flex items-end gap-10 my-4">
                <div
                        v-if="!routeId"
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
                    v-model="item.text"
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
                >Saqlash
                </SButton
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import Textarea from "@/components/input/textarea.vue";
import UploadImages from "@/components/input/uploadImages.vue";
import {onMounted, ref} from "@vue/runtime-core";
import {useToast} from "vue-toastification";
import FormInput from "@/components/input/FormInput.vue";
import SingleSelect from "@/components/select/SingleSelect.vue";
import {useRoute, useRouter} from "vue-router";
import {computed, reactive} from "vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useCategoryStore} from "@/store/categories.js";
import axios from "../../plugins/axios.js";

const toast = useToast();
const route = useRoute();
const router = useRouter()

const categoryStore = useCategoryStore()


const subcategoryData = computed(() => categoryStore.subCategories.map((el) => {
    return {
        value: el.id,
        label: el.title
    }
}));

const routeId = route.query.id;

const form = reactive({
    testType: "MULTIPLE_CHOICE",
    title: "",
    imageID: null,
    image: "",
    testID: "",
    score: "",
    correctAnswers: [],
    answerCreateDTOList: [
        {
            id: 1,
            text: "",
            correct: false,
            imageID: "",
            image: ""
        },
        {
            id: 2,
            text: "",
            correct: false,
            imageID: "",
            image: ""
        },
    ],
});

const rule = computed(() => {
    return {
        testID: {required},
        score: {required}
    };
});

const $v = useVuelidate(rule, form);

function addNewOption() {
    const option = {
        id: form.answerCreateDTOList.length + 1,
        text: "",
        imageID: "",
        correct: false,
        image: ""
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

function fetchUploadImagesId(item, e) {
    const formData = new FormData()
    formData.append("file", e)
    axios.post('media/upload', formData).then((res) => {
        item.imageID = res.data.id
    })
}

function onSubmit() {
    if (!routeId) {
        $v.value.$validate();
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
            } else {
                axios.post('/question', form).then((res) => {
                    console.log(res)
                    toast.success("Test muvaffaqiyatli qo'shildi")
                }).catch((err) => {
                    toast.error("Qo'shishda xatolik yuz berdi!")
                }).finally(() => {
                    setTimeout(() => {
                        // window.location.reload()
                    }, 1000)
                })
            }

            console.log(form, "opt");
        }
    } else if (routeId) {
        $v.value.$validate();
        if (typeof routeId === "string") {
            form.testID = routeId
        }
        if (!$v.value.$error) {
            const correctArr = [];
            form.answerCreateDTOList.forEach((el) => {
                if (el.correct) {
                    correctArr.push(el.id);
                }
            });

            form.correctAnswers = correctArr;
                const editObj = {
                    id: +routeId,
                    title: form.title,
                    imageID: form.imageID,
                    score: form.score,
                    correctAnswers:form.correctAnswers,
                    answerUpdateDTOList: form.answerCreateDTOList,
                    correctCloseAnswer: null,
                }

            console.log(editObj,"edit obj")

            axios.patch('/question', editObj).then((res) => {
                console.log(res)
                toast.success("Test muvaffaqiyatli tahrirlandi")
                setTimeout(()=>{
                    router.push("/list")
                },1000)
            }).catch((err) => {
                toast.error("Tahrirlashda xatolik yuz berdi!")
            })
        }
    }

}

const arr = ref([])

function editTest() {
    axios.get(`/question/get/${route.query.id}`).then((res) => {
        console.log(res)
        arr.value = res.data
        form.title = res.data.questionDTO.title
        form.testType = res.data.questionDTO.testType
        form.image = res.data.questionDTO.image?.url
        form.imageID = res.data.questionDTO.image?.id
        form.score = res.data.questionDTO.score
        form.answerCreateDTOList = res.data.questionDTO.answerDTOList.map((el) => {
            return {
                id: el.id,
                text: el.text,
                imageID: el.image?.id || null,
                image: el.image?.url || null,
                correct: el.correct
            }
        })
    }).catch((err) => {
        console.log(err)
    })
}

onMounted(() => {
    // form.correctAnswers.forEach((id) => {
    //     console.log(id)
    //   form.answerCreateDTOList.find((el) => el.id === id).correct = true;
    // });

    categoryStore.fetchSubCategoryAll();
    if (routeId) {
        editTest()
    }

});


</script>
