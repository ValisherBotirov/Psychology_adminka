<template>
  <div class="w-full">
    <label
      for=""
      class="mb-1 font-medium text-gray-500 flex justify-start"
      :class="error ? 'text-[red]' : ''"
      >{{ label }}</label
    >
    <el-select
      v-model="value"
      @change="handleSelect"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :placeholder="placeholder"
      class="w-full border border-gray-500 rounded-[4px]"
      :class="error ? 'border border-[red] rounded-[4px]' : ''"
    >
      <el-option
        v-for="item in options"
        :key="item?.value"
        :label="item?.label"
        :value="item?.value"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  placeholder: string;
  error: boolean;
  label: string;
  options?: {
    value: string;
    label: string;
  };
  modelValue?: Array<string[]>;
}
const props = defineProps<Props>();

const value = ref(props.modelValue);

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

function handleSelect(e) {
  emit("update:modelValue", e);
}
</script>

<style>
.el-select .el-input {
  height: 40px !important;
}
</style>
