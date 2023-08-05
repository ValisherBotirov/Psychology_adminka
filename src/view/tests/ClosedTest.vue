<template>
    <div>
        <div class="border border-gray-600 py-4 px-5 bg-white">
            <div class="flex gap-6">
                <Textarea custom-class="h-[90px]" label="Savolni matnini kiriting" class="w-full"/>
                <UploadImages  line class="w-full" label="Savol rasmini yuklash (ixtiyoriy)" @getBase64="getQuestionImages" />
            </div>
            <div class="flex items-center mt-4 gap-4">
                 <FormInput placeholder="Javobni kiriting" label="Yoziladigan javobni kiriting"  custom-class="py-[10px]" class=" w-full" v-model="form.answer" :error="$v.answer.$error"/>
                <FormInput placeholder="0" custom-class="py-[10px]" label="Savol uchun ball belgilang" class="w-full" v-model="form.score" :error="$v.score.$error"/>
            </div>
            <div class="flex justify-end mt-6 ">
                <SButton variant="secondary" class="w-[250px]" @click="onSubmit">Saqlash</SButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import Textarea from "@/components/input/textarea.vue";
import UploadImages from "@/components/input/uploadImages.vue";
import {ref} from "@vue/runtime-core";
import {useToast} from "vue-toastification";
import FormInput from "@/components/input/FormInput.vue";
import {computed, reactive} from "vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const toast = useToast()

const form = reactive({
    questions : "",
    answer:"",
    score:null
})

const rule = computed(()=> {
    return{
        answer:{required},
        score:{required}
    }
})

const $v = useVuelidate(rule,form)

const questionImage = ref("")
function getQuestionImages(e){
    questionImage.value = e
    console.log(e,"emit")
}

function onSubmit(){
    $v.value.$validate()
    if(!$v.value.$error){
        console.log("ishladi")
    }
}

</script>