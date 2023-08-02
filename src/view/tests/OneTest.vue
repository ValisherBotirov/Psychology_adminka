<template>
  <div>
      Bittalik testlar
      <div class="border border-gray-600 py-4 px-5 bg-white">
          <div class="flex gap-6">
          <Textarea custom-class="h-[90px]" label="Savolni matnini kiriting" class="w-full"/>
          <UploadImages  line class="w-full" label="Savol rasmini yuklash (ixtiyoriy)" @getBase64="getQuestionImages" />
          </div>
            <div class="flex gap-2 cursor-pointer group my-3" @click="addNewOption">
                <div class="w-4 h-4 border border-blue-600 flex justify-center items-center rounded-[50%]  cursor-pointer p-3">
                    <i class="fa-solid fa-plus text-red-400"></i>
                </div>
                <p class="text-black transition group-hover:text-blue-700 select-none">Yangi test varianti qo'shish</p>
            </div>
          <div class="grid grid-cols-2 gap-x-6 gap-y-3">
              <div class="flex gap-4 items-center " v-for="(item,index) in options" :key="index">
                  <div class="flex flex-col gap-2 items-center">
                  <input id="teal-radio" type="radio" :value="item.id" v-model="item.correct"  name="colored-radio" class="w-5 h-5 ">
                  <i class="fa-solid fa-trash text-lg text-red-600 cursor-pointer" @click="deleteOption(item.id)"></i>
                  </div>
                  <div class="w-full flex flex-col gap-2">
                      <Textarea custom-class="h-[60px] w-full" placeholder="Varinat" v-model="item.optionText"/>
                      <UploadImages small @getBase64="e => item.image = e" :inputId="`file${item.id}`" :img="item.image" />
                  </div>
              </div>
          </div>
          <div class="flex justify-end mt-4 ">
          <SButton variant="secondary" @click="onSubmit">Saqlash</SButton>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import Textarea from "@/components/input/textarea.vue";
import UploadImages from "@/components/input/uploadImages.vue";
import {ref} from "@vue/runtime-core";

const options = ref(
    [
        {
            id:1,
            optionText :"",
            correct:null,
            image:""
        },
        {
            id:2,
            optionText :"",
            correct:null,
            image:""
        },
        {
            id:3,
            optionText :"",
            correct:null,
            image:"https://avatars.githubusercontent.com/u/94363665?v=4"
        }
    ]
)

function addNewOption(){
    const option = {
        id:options.value.length+1,
        optionText:"",
        correct:null,
        image:''
    }
    options.value.push(option)
}

function deleteOption(id){
    options.value = options.value.filter((el)=>el.id !== id)
}
// work images input

const questionImage = ref("")
function getQuestionImages(e){
    questionImage.value = e
    console.log(e,"emit")
}

const optionImages = ref()
function getOptionImages(e){
    optionImages.value = e
}

function onSubmit(){
    console.log("ishladi")
    console.log(options,"opt")
}

</script>