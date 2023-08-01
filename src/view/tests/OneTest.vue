<template>
  <div>
      Bittalik testlar
      <div class="border border-gray-600 py-4 px-5 bg-white">
          <div class="flex gap-6">
          <Textarea custom-class="h-[90px]" label="Savolni matnini kiriting" class="w-full"/>
          <UploadImages image="" line class="w-full"/>
          </div>
          <div class="flex gap-4 items-center" v-for="(item,index) in options" :key="index">
              <input type="radio" v-model="item.value" :name="item.name"/>
              <p>Savol</p>
              <p>images</p>
          </div>
          <div class="flex justify-end mt-4 ">
          <SButton variant="secondary" @click="onSubmit">Saqlash</SButton>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import FormInput from "@/components/input/FormInput.vue";
import Textarea from "@/components/input/textarea.vue";
import UploadImages from "@/components/input/uploadImages.vue";

const options = [
    {
        id:1,
        value :"",
        name:'Savol1',
    },
    {
        id:2,
        value :"",
        name:'Savol1',
    },
    {
        id:3,
        value :"",
        name:'Savol1',
    }
]

function onSubmit(){
    console.log("ishladi")
    console.log(options,"opt")
}
</script>