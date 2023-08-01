<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">Sotuvchi</h3>
    </div>
    <div class="flex gap-4 items-end">
      <FormInput
        placeholder="(00) 000-00-00"
        type="phone"
        v-model="formModal.phone"
        :error="v$.phone.$error"
        label="Sotuvchini ro'yxatdan o'tgan telefon raqamini kiriting!"
        customClass="!p-2 bg-white"
        class="w-full"
        v-maska="'(##) ###-##-##'"
      >
        <template #prefix>
          <span class="font-semibold mr-2"> +998 </span>
        </template>
      </FormInput>
      <SButton variant="info" @click="addUserSeller"
        >Yangi sotuvchi qo'shish</SButton
      >
    </div>
    <div>
      <el-checkbox v-model="formModal.isChecked"
        ><span class="text-black">Global books sotuvchisi !</span></el-checkbox
      >
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
      <BlockPreloader
        v-if="false"
        width="100%"
        margin="10px 0"
        height="40px"
        :loading="false"
        v-for="i in 10"
        :key="i"
      ></BlockPreloader>

      <table class="w-full text-sm text-left text-gray-500" v-else>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-4">#</th>
            <th scope="col" class="px-6 py-3">F.I.SH</th>
            <th scope="col" class="px-6 py-3">UserName</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">sotuvchi turi</th>
            <th scope="col" class="px-6 py-3 text-center">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(item, index) in sellerUsers"
            :key="index"
          >
            <td class="w-4 p-4">
              <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
            </td>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.fullName }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.username }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.role }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.status }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item?.gbEmployee ? "Global Books" : "Hamkor"  }} sotuvchisi
            </th>
            <td class="flex items-center px-6 py-4 space-x-4 justify-center">
              <div
                class="font-medium text-red-600 hover:underline cursor-pointer"
                @click="productDelete(item?.ID)"
              >
                <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
              </div>
              <DeleteModal
                title="Haqiqatdan ham ushbu foydalanuvchini o'chirmoqchimisiz?"
                :is-open="openDeleteModal"
                @delete="fetchDeleteModal"
                @closeModal="openDeleteModal = $event"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <VuePagination
      :total="sellerUsersTotal"
      :limit="limit"
      :current-page="currentPage"
      @fetchPage="fetchPaginationSeller"
      class="flex justify-end mt-5"
    />

    <!--      <VuePagination v-if="sellerStore.pagination  > limit" :total="sellerStore.pagination" :limit="limit" :current-page="currentPage" @fetchPage="fetchPagination" class="flex justify-end mt-5" />-->

    <!--      sotuvchilar-->

    <div class="mt-[70px]">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-gray-700 text-3xl font-medium">Optimchilar</h3>
      </div>
      <div class="flex gap-4 items-end">
        <FormInput
          placeholder="(00) 000-00-00"
          type="phone"
          v-model="formMore.phone"
          :error="$vMore.phone.$error"
          label="Optimchini ro'yxatdan o'tgan telefon raqamini kiriting!"
          customClass="!p-2 bg-white"
          class="w-full"
          v-maska="'(##) ###-##-##'"
        >
          <template #prefix>
            <span class="font-semibold mr-2"> +998 </span>
          </template>
        </FormInput>
        <SButton variant="info" @click="addSeller"
          >Yangi optomchi qo'shish</SButton
        >
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <BlockPreloader
          v-if="!sellerStore?.loading"
          width="100%"
          margin="10px 0"
          height="40px"
          :loading="!sellerStore?.loading"
          v-for="i in 10"
          :key="i"
        ></BlockPreloader>

        <table class="w-full text-sm text-left text-gray-500" v-else>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="p-4">#</th>
              <th scope="col" class="px-6 py-3">F.I.SH</th>
              <th scope="col" class="px-6 py-3">Telefon raqami</th>
              <th scope="col" class="px-6 py-3">Role</th>
              <th scope="col" class="px-6 py-3">Balance</th>
              <th scope="col" class="px-6 py-3 text-center">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b hover:bg-gray-50"
              v-for="(item, index) in sellerList"
              :key="index"
            >
              <td class="w-4 p-4">
                <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
              </td>
              <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ item?.fullName }}
              </th>
              <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ PhoneNumberFormatter(item?.username) }}
              </th>
              <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ item?.role }}
              </th>
              <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ item?.balance }}
              </th>
              <td class="flex items-center px-6 py-4 space-x-4 justify-center">
                <div
                  class="font-medium text-red-600 hover:underline cursor-pointer"
                  @click="productDelete(item?.ID)"
                >
                  <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
                </div>
                <DeleteModal
                  title="Haqiqatdan ham ushbu foydalanuvchini o'chirmoqchimisiz?"
                  :is-open="openDeleteModal"
                  @delete="fetchDeleteModal"
                  @closeModal="openDeleteModal = $event"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <VuePagination
        :total="sellerAll"
        :limit="limit"
        :current-page="currentPage"
        @fetchPage="fetchPagination"
        class="flex justify-end mt-5"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import SButton from "../../components/buttons/SButton.vue";
import DeleteModal from "../../components/modal/DeleteModal.vue";
import VuePagination from "@/components/pagination/VuePagination.vue";

import FormInput from "@/components/input/FormInput.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from "@/plugins/axios.js";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";
import { PhoneNumberFormatter } from "@/helpers/formatNumber.js";
import { useSellerStore } from "@/store/users.js";
const toast = useToast();

const sellerStore = useSellerStore();

const openDeleteModal = ref(false);
const deleteId = ref(null);

function fetchDeleteModal(emit) {
  if (emit) {
    axios
      .delete(`/users/deactivation/${deleteId.value}`)
      .then((res) => {
        toast.success("Hamkorlar muvaffaqiyatli o'chirildi");
        sellerStore.fetchExclusiveClient(limit.value, currentPage.value);
        sellerStore.fetchClientSellers(limit.value, currentPage.value);
      })
      .catch((res) => {
        toast.error("Xatolik yuz berdi");
      });
  }
}

function productDelete(id) {
  openDeleteModal.value = true;
  deleteId.value = id;
  console.log(id, "delete id");
}

// for  modal

const formModal = reactive({
  phone: "",
  isChecked: false,
});

const rules = computed(() => {
  return {
    phone: { required },
  };
});

const v$ = useVuelidate(rules, formModal);

// Sotuvchilar

const limit = ref(5);
// const offset = ref(1)
const currentPage = ref(1);
function fetchPagination(page) {
  currentPage.value = page;
  sellerStore.fetchExclusiveClient(limit.value, currentPage.value);
}
function fetchPaginationSeller(page) {
  currentPage.value = page;
  sellerStore.fetchClientSellers(limit.value, currentPage.value);
}

// optomchi
const sellerList = computed(() => sellerStore.exclusiveClient.content);
const sellerAll = computed(() => sellerStore.exclusiveClient.totalElements);

// sotuvchi
const sellerUsers = computed(() => sellerStore.seller.content);
const sellerUsersTotal = computed(() => sellerStore.seller.totalElements);
const formMore = reactive({
  phone: "",
});

const ruleMore = computed(() => {
  return {
    phone: { required },
  };
});

const $vMore = useVuelidate(ruleMore, formMore);
//Sotuvchi

function addUserSeller() {
  v$.value.$validate();
  if (!v$.value.$error) {
    let dataSeller = {
      phoneNumber:
        "+998" +
        formModal.phone.replaceAll("-", "").replace("(", "").replace(") ", ""),
      gbEmployee: formModal.isChecked,
    };
    axios
      .post("admin/addSeller", dataSeller)
      .then((res) => {
        toast.success("Muvavvaqiyatli qo'shildi");
        sellerStore.fetchClientSellers(limit.value, currentPage.value);
        formModal.phone = "";
        formModal.isChecked = false;
        v$.value.$reset();
      })
      .catch((err) => {
        toast.error("Qo'shishda xatolik yuz berdi");
      });
  }
}

// Optomchi

function addSeller() {
  $vMore.value.$validate();
  if (!$vMore.value.$error) {
    let phoneNumber =
      "+998" +
      formMore.phone.replaceAll("-", "").replace("(", "").replace(") ", "");
    axios
      .post("admin/addExclusiveClient", { phoneNumber })
      .then((res) => {
        toast.success("Muvavvaqiyatli qo'shildi");
        sellerStore.fetchExclusiveClient(limit.value, currentPage.value);
        formMore.phone = "";
        $vMore.value.$reset();
      })
      .catch((err) => {
        toast.error("Qo'shishda xatolik yuz berdi");
      });
  }
}

onMounted(() => {
  sellerStore.fetchExclusiveClient(limit.value, currentPage.value);
  sellerStore.fetchClientSellers(limit.value, currentPage.value);
});
</script>
