<template>
  <div class="pagination-box">
    <vue-awesome-paginate
      :total-items="total"
      v-model="currentPage"
      :items-per-page="limit"
      :max-pages-shown="5"
      @click="onClickHandler"
    >
      <template #prev-button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>

      <template #next-button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { VueAwesomePaginate } from "vue-awesome-paginate";

interface Props {
  total?: number;
  currentPage?: number;
  limit?: number;
}
const props = defineProps<Props>();

const emit = defineEmits(["fetchPage"]);

const currentPage = ref(props.currentPage);

watch(
  () => currentPage.value,

  () => {
    emit("fetchPage", currentPage.value);
  }
);

function onClickHandler(page) {
  // console.log(page,"e")
}
</script>

<style>
.pagination-box .pagination-container {
  column-gap: 10px;
  align-items: center;
}
.pagination-box .paginate-buttons {
  height: 35px;
  width: 35px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #d8d8d8;
  /*border: 1px solid black;*/
  color: black;
}

.pagination-box .back-button,
.pagination-box .next-button {
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: none;
  height: 35px;
  width: 35px;
}
.pagination-box .active-page {
  background-color: rgba(0, 0, 0, 0.7);
  /*border: 1px solid #000;*/
  color: white;
}
.pagination-box .paginate-buttons:hover {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
}
.pagination-box .active-page:hover {
}

.pagination-box .back-button svg {
  transform: rotate(180deg) translateY(-2px);
}
.pagination-box .next-button svg {
  transform: translateY(2px);
}

.pagination-box .back-button:hover,
.pagination-box .next-button:hover {
  background-color: rgb(45, 45, 45);
}

.pagination-box .back-button:active,
.pagination-box .next-button:active {
  background-color: rgb(85, 85, 85);
}
</style>
