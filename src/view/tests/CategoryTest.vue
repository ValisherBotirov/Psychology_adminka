<template>
  <div class="transition duration-500">
    <div class="border border-gray-600 py-4 px-5 bg-white">
      <!-- <pre>{{ form.answerCreateDTOList }}</pre> -->
      <!-- <pre>{{ test }}</pre> -->
      <div class="flex items-center gap-4 mt-1 mb-4" v-if="!routeId">
        <SingleSelect
          v-model="form.testID"
          placeholder="Test nomini tanlang"
          :data="subcategoryData"
          :error="$v.testID.$error"
          class="w-full"
          @changeSelect="fetchTestCategory(form.testID)"
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
      </div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-8">
        <div
          class="flex gap-4"
          v-for="(item, index) in form.answerCreateDTOList"
          :key="index"
        >
          <div class="flex flex-col gap-2 items-center mt-4">
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
              ref="expose"
              @getBase64="(e) => fetchUploadImagesId(item, e)"
              :inputId="`file${item.id}`"
              :img="item.image"
            />
            <div class="grid grid-cols-2 gap-2">
              <div v-for="el in item.points" :key="el">
                <!-- <pre>{{ el.point }}</pre> -->
                <FormInput
                  :label="`${el.key}`"
                  placeholder="0"
                  customClass="p-2"
                  type="number"
                  v-model="el.value"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <SButton variant="secondary" class="w-[250px]" @click="onSubmit"
          >Saqlash
        </SButton>
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
import SingleSelect from "@/components/select/SingleSelect.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import axios from "../../plugins/axios.js";
import { useCategoryStore } from "@/store/categories.js";

const categoryStore = useCategoryStore();

const toast = useToast();

const route = useRoute();
const router = useRouter();

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
  questionType: "CATEGORICAL_CHECKBOX",
  title: "",
  imageID: null,
  testID: "",
  image: "",
  correctCloseAnswer: "",
  answerCreateDTOList: [
    {
      id: 1,
      text: "",
      imageID: null,
      image: "",
      points: [
        {
          key: "Shifokor",
          value: 0,
          feedbackId: null,
        },
        {
          key: "Dasturchi",
          value: 0,
          feedbackId: null,
        },
      ],
    },
    {
      id: 2,
      text: "",
      imageID: null,
      image: "",
      points: [
        {
          key: "Shifokor",
          value: 0,
          feedbackId: null,
        },
        {
          key: "Dasturchi",
          value: 0,
          feedbackId: null,
        },
      ],
    },
  ],
});

const rule = computed(() => {
  return {
    testID: { required },
  };
});

const $v = useVuelidate(rule, form);

const test = ref([]);
function addNewOption() {
  const option = {
    id: form.answerCreateDTOList.length + 1,
    text: "",
    imageID: null,
    image: "",
    points: test.value.map((el) => {
      return {
        key: el.key,
        value: 0,
        feedbackId: el.feedbackId,
      };
    }),
  };
  form.answerCreateDTOList.push(option);
}

function deleteOption(id) {
  if (!routeId) {
    form.answerCreateDTOList = form.answerCreateDTOList.filter(
      (el) => el.id !== id
    );
  } else {
    console.log("delete swagger", id);
    axios
      .delete(`question/delete-answer?question-id=${routeId}&answer-id=${id}`)
      .then((res) => {
        console.log(res);
        form.answerCreateDTOList = form.answerCreateDTOList.filter(
          (el) => el.id !== id
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// work images input

function getQuestionImages(e) {
  const formData = new FormData();
  formData.append("file", e);
  axios.post("media/upload", formData).then((res) => {
    console.log(res);
    form.imageID = res.data.id;
  });
}

async function fetchUploadImagesId(item, e) {
  const formData = new FormData();
  formData.append("file", e);
  await axios
    .post("media/upload", formData)
    .then((res) => {
      item.imageID = res.data.id;
    })
    .catch((err) => {
      toast.error("Rasm yuklashda xatolik yuz berdi!");
      form.imageID = null;
    });
}

function onSubmit() {
  if (!routeId) {
    $v.value.$validate();
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
            window.location.reload();
          }, 2000);
        });
    }
  } else if (routeId) {
    if (typeof routeId === "string") {
      form.testID = routeId;
    }
    console.log("edit");
    if (!$v.value.$error) {
      const editObj = {
        id: +routeId,
        title: form.title,
        imageID: form.imageID,
        answerUpdateDTOList: form.answerCreateDTOList.map((el) => {
          return {
            id: el.id,
            text: el.text,
            imageID: el.image?.id || null,
            image: el.image?.url || null,
            points: el.points.map((el) => {
              return {
                value: el.value,
                feedbackId: el.feedbackId,
              };
            }),
          };
        }),
        correctCloseAnswer: null,
      };
      console.log(editObj, "opt");
      axios
        .patch("/question", editObj)
        .then((res) => {
          console.log(res);
          toast.success("Test muvaffaqiyatli tahrirlandi");
          setTimeout(() => {
            router.push("/list");
          }, 1000);
        })
        .catch((err) => {
          toast.error("Tahrirlashda xatolik yuz berdi!");
        });
    }
  }
}

const arr = ref([]);

function editTest() {
  axios
    .get(`/question/get/${route.query.id}`)
    .then((res) => {
      console.log(res);
      arr.value = res.data;
      form.title = res.data.title;
      form.questionType = res.data.questionType;
      form.image = res.data.image?.url;
      form.imageID = res.data.image?.id;
      form.answerCreateDTOList = res.data.answerDTOList.map((el) => {
        return {
          id: el.id,
          text: el.text,
          imageID: el.image?.id || null,
          image: el.image?.url || null,
          points: el.points.map((el) => {
            return {
              key: el.key,
              value: el.value,
              feedbackId: el.feedbackId,
            };
          }),
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetchTestCategory(id) {
  console.log("run is code", id);
  axios
    .get(`test/get-feedback-key-by-testId/${id}`)
    .then((res) => {
      test.value = res.data.map((el) => {
        return {
          key: el.key,
          value: 0,
          feedbackId: el.id,
        };
      });
      form.answerCreateDTOList.forEach((item) => {
        item.points = res.data.map((el) => {
          return {
            key: el.key,
            value: 0,
            feedbackId: el.id,
          };
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(() => {
  categoryStore.fetchSubCategoryAll('NEW');
  if (routeId) {
    editTest();
  } else {
    toast.info("Birinchi navbatda test nomini tanlang!");
  }
});
</script>
