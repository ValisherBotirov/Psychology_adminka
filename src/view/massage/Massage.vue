<template>
  <div class="bg-[#fff] p-8 rounded-md">
    <table class="w-full text-sm text-left text-gray-500 mt-4">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="p-4">#</th>
          <th scope="col" class="px-6 py-3">F.I.Sh</th>
          <th scope="col" class="px-6 py-3">Tel nomer</th>
          <th scope="col" class="px-6 py-3 text-start">Tasnif</th>
          <th scope="col" class="px-6 py-3 text-end">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b hover:bg-gray-50"
          v-for="(item, index) in data"
          :key="index"
        >
          <td class="w-4 p-4">
            <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
          </td>
          <th
            class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[450px] break-words overflow-x-scroll"
          >
            {{ item?.name }}
          </th>
          <th
            class="test-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[450px] break-words overflow-x-scroll"
          >
            {{ item?.tel }}
          </th>
          <th class="font-medium text-gray-900">
            {{ item?.text }}
          </th>
          <td class="flex items-center justify-center px-6 py-4 space-x-4">
            <i class="fa-solid fa-circle text-xl text-[red]"></i>
            <i class="fa-solid fa-circle text-xl text-[green]"></i>
            <DeleteModal
              :isOpen="openDeleteModal"
              @closeModal="(e) => (openDeleteModal = e)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import Textarea from "@/components/input/textarea.vue";
import { ref, reactive, computed } from "vue";
import { useToast } from "vue-toastification";
import FormInput from "@/components/input/FormInput.vue";

// validator
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const aboutData = reactive({
  title: "",
  text: "",
});

const rules = computed(() => {
  return {
    title: { required, minLength: minLength(3) },
    text: { required, minLength: minLength(3) },
  };
});

const $v = useVuelidate(rules, aboutData);
const addWinnerBtn = async () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    try {
      // function
    } catch (error) {
      console.log(error);
    } finally {
      aboutData.title = "";
      aboutData.text = "";
      $v.value.$reset();
    }
  }
};

const toast = useToast();
const openDeleteModal = ref(false);
// test data
const data = [
  {
    id: 1,
    name: "Nodir Ikromov Shomurod o'gli",
    tel: '+99899 105 92 01',
    text: `lorem10 zo'r ekan daxshat bomba  ekanmiz voooy dooodddddd lorem10 zo'r ekan daxshat bomba ekanmiz voooy dooodddddd lorem10 zo'r
      ekan daxshat bomba ekanmiz voooy dooodddddd lorem10 zo'r
      ekan daxshat bomba ekanmiz voooy dooodddddd 
      lorem10 zo'r ekan daxshat bomba ekanmiz 
      voooy dooodddddd`,
  },
];
</script>
<style>
.test-name::-webkit-scrollbar {
  display: none;
}
</style>
