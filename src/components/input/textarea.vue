<template>
  <div class="">
    <label
      for="password"
      class="mb-1 font-medium text-gray-500 flex justify-start" :class="error?'text-[red]':''"
      >{{ label }}</label
    >
    <textarea
      id="password"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      :class="[error ? '!border-[red]' : 'border-gray-500  focus-within:border-[blue]',customClass]"
      class="shadow-sm bg-gray-50 border text-gray-900 outline-0 text-sm rounded-[6px] resize-none h-[140px]  block w-full p-2.5 "
    >
    </textarea>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String || Number,
    required: true,
  },

    error:{
      type: Boolean,
        default:false ,
    },

    customClass:{
      type:String,
    },
placeholder:{
      type:String,
    default:'Savol matnini kiriting..'
},
  label: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);


function handleInput(e){
    emit("update:modelValue", e.target.value);
}

</script>
