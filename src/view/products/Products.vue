<template>
  <div>
      <div class="flex justify-between items-center mb-4">
          <h3 class="text-gray-700 text-3xl font-medium">Mahsulotlar</h3>
          <SButton variant="info" @click="redirectCreatePage"
          >Yangi mahsulot qo'shish</SButton
          >
      </div>


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
<!--          <BlockPreloader v-if="!userStore?.loading" width="100%" margin="10px 0" height="40px" :loading="!userStore?.loading" v-for="i in 10" :key="i"></BlockPreloader>-->

          <table class="w-full text-sm text-left text-gray-500" >
              <thead
                      class="text-xs text-gray-700 uppercase bg-gray-50"
              >
              <tr>
                  <th scope="col" class="p-4">#</th>
                  <th scope="col" class="px-6 py-3">Rasmi</th>
                  <th scope="col" class="px-6 py-3">Nomi</th>
                  <th scope="col" class="px-6 py-3">Avtor nomi</th>
                  <th scope="col" class="px-6 py-3">Kategoriyasi</th>
                  <th scope="col" class="px-6 py-3">Narxi</th>
                  <th scope="col" class="px-6 py-3">Optom Narx</th>
                  <th scope="col" class="px-6 py-3">Nashriyoti</th>
                  <th scope="col" class="px-6 py-3">Bazadagi soni</th>
                  <th scope="col" class="px-6 py-3">Tili</th>
                  <th scope="col" class="px-6 py-3">Sahifalar soni</th>
                  <th scope="col" class="px-6 py-3 text-end">
                      Amallar
                  </th>
              </tr>
              </thead>
              <tbody>
              <tr
                      class="bg-white border-b  hover:bg-gray-50"
                      v-for="(item, index) in fakeData"
                      :key="index"
              >
                  <td class="w-4 p-4">
                      <p class="font-bold ">{{ index + 1 }}.</p>
                  </td>
                  <th
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                      <img
                          src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip"
                          alt="images"
                          class="w-[50px] h-[40px] object-cover"
                      />
                  </th>
                  <th
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                          O'tkan kunlar
                  </th>
                  <th
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                     Abdulla Qodiriy
                  </th>

                  <th
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >

                      Biznes
                  </th>
                  <th
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                      60 000 SUM
                  </th>  <th
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                      50 000 SUM
                  </th>
                  <th
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                      Hilol Nashr
                  </th>  <th
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                  >
                     200
                  </th>
                  <th
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                     Uzbekcha
                  </th>
                  <th
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                  >
                     860
                  </th>
                  <td class="flex items-center px-6 py-4 space-x-4 justify-end">
<!--                      <div-->
<!--                          class="font-medium text-red-600 hover:underline cursor-pointer"-->
<!--                      >-->
<!--                          <i class="fa-sharp fa-regular fa-eye text-[20px] text-[green]"></i>-->
<!--                      </div>-->
                      <div
                              @click="itemEdit(item)"
                              class="font-medium text-blue-600  hover:underline cursor-pointer"
                      >
                          <i
                                  class="fa-solid fa-pen-to-square text-[blue] text-[20px]"
                          ></i>
                      </div>
                      <div
                              class="font-medium text-red-600 hover:underline cursor-pointer"
                              @click="productDelete(item?.id)"
                      >
                          <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
                      </div>


                      <DeleteModal title="Haqiqatdan ham ushbu foydalanuvchini o'chirmoqchimisiz?"
                                   :is-open="openDeleteModal"
                                   @delete="fetchDeleteModal"
                                   @closeModal="openDeleteModal = $event"
                      />
                  </td>
              </tr>
              </tbody>
          </table>
      </div>

      <VuePagination v-if="total  > limit" :total="total" :limit="limit" :current-page="currentPage" @fetchPage="fetchPagination" class="flex justify-end mt-5" />
  </div>
</template>
<script setup>
import SButton from "@/components/buttons/SButton.vue";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";
import VuePagination from "@/components/pagination/VuePagination.vue";
import DeleteModal from "@/components/modal/DeleteModal.vue";
import { ref} from "vue";
import axios from "@/plugins/axios.js";

import {useRouter} from "vue-router";
const router = useRouter()

// pagination
const limit = ref(5)
const total = ref(50)
const currentPage = ref(1)
function fetchPagination(page){
    currentPage.value = page
    // offset.value =  (currentPage.value - 1) * limit.value;
}

function redirectCreatePage(){
    router.push('/products/add')
}

// fake data

const fakeData = [
    {
        id : 1,
        name:"O'tgan kunlar",
        price:60000,
        nashriyot:"Munit Nashriyoti",
        category:"Biznes"
    },
    {
        id : 2,
        name:"O'tgan kunlar",
        price:60000,
        nashriyot:"Munit Nashriyoti",
        category:"Biznes"
    },
    {
        id : 3,
        name:"O'tgan kunlar",
        price:60000,
        nashriyot:"Munit Nashriyoti",
        category:"Biznes"
    },
    {
        id : 4,
        name:"O'tgan kunlar",
        price:60000,
        nashriyot:"Munit Nashriyoti",
        category:"Biznes"
    },
    {
        id : 5,
        name:"O'tgan kunlar",
        price:60000,
        nashriyot:"Munit Nashriyoti",
        category:"Biznes"
    }
]



</script>