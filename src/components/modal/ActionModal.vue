<template>
  <div
    id="popup-modal"
    :class="{ 'modal-class': isOpen }"
    class="fixed top-0 hidden items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full h-[100vh]"
  >
    <div
      class="relative w-full h-full max-w-md md:h-auto mx-auto"
      :class="customClass"
    >
      <div class="relative bg-white rounded-lg shadow">
        <p class="py-2 px-3 font-medium">{{ modalTitle }}:</p>
        <div class="px-4 py-2 text-center w-full">
          <form class="mb-4">
            <slot></slot>
          </form>
          <div class="flex justify-end">
            <SButton variant="danger" class="mr-2" @click="cancelModal"
              >Bekor qilish</SButton
            >
            <SButton variant="info" @click="fetch" :loading="loading"
              >Saqlash</SButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import SButton from "../buttons/SButton.vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  customClass: String,
  modalTitle: {
    type: String,
    default: "Ko'rsatgich qo`shish",
  },
});

const emit = defineEmits(["closeModal", "saveModal"]);

const openCondition = ref(props.isOpen);

function cancelModal() {
  openCondition.value = false;
  emit("closeModal", openCondition.value);
}

function fetch() {
  emit("saveModal", true);
  if (props.loading) {
    cancelModal();
  }
}

watch(
  () => props.loading,
  () => {
    if (!props.loading) {
      cancelModal();
    }
  }
);

watch(
  () => props.value,
  () => {
    modalValue.value = props.value;
  }
);
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
