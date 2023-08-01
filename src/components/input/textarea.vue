<template>
  <div class="">
    <label
      for="password"
      class="mb-1 font-medium text-gray-500 flex justify-start" :class="error?'text-[red]':''"
      >{{ placeholder }}</label
    >
    <textarea
      id="password"
      v-model="inputVal"
      placeholder="Qisqacha malumot kiriting..."
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

  placeholder: {
    type: String,
  },
});

const emit = defineEmits(["on-change"]);

const inputVal = ref(props.modelValue);

watch(
  () => inputVal.value,
  (val) => {
    emit("update:modelValue", val);
  }
);
</script>
