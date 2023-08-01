<template>
  <div class="container mx-auto min-h-screen">
    <div class="flex justify-between items-end my-6 sx:mt-[60px] md:mt-10">
      <p class="sx:text-2xl md:text-3xl text-primary">Shaxsiy kabinet</p>
      <div>
        <button class="text-[red] text-lg font-medium">Chiqish</button>
      </div>
    </div>
    <div class="sx:block md:flex sx:gap-2 md:gap-7 bg-[#fff] p-7 rounded-xl">
      <div>
        <div
          class="cursor-pointer bg-[#00000014] rounded-full sx:w-[50%] md:w-[100%] sx:mx-auto overflow-hidden"
        >
          <img :src="profile" alt="profile" class="w-[100%]" />
        </div>
      </div>
      <div class="sx:w-[100%] sx:flex sx:justify-center md:w-[100%] lg:w-[40%]">
        <ul
          class="flex flex-col gap-2 sx:text-sm sm:text-base md:text-[18px] font-medium text-[#333] relative pt-10"
        >
          <li class="flex items-center gap-7">
            <span>Lavozim</span
            ><i
              class="translation text-amber-500 text-lg cursor-pointer hover:translate-x-[15px] fa-solid fa-arrow-right"
            ></i
            ><span class="w-[100%] text-left">{{
              getDataProfile?.fullName
            }}</span>
          </li>
          <li class="flex items-center gap-7">
            <span>Tel</span
            ><i
              class="translation text-amber-500 text-lg cursor-pointer hover:translate-x-[15px] fa-solid fa-arrow-right"
            ></i
            ><span class="w-[100%] text-left">{{
              getDataProfile?.username
            }}</span>
          </li>
          <li class="flex items-center gap-7">
            <span>Role</span
            ><i
              class="translation text-amber-500 text-lg cursor-pointer hover:translate-x-[15px] fa-solid fa-arrow-right"
            ></i
            ><span class="w-[100%] text-left">{{ getDataProfile?.role }}</span>
          </li>
          <li class="flex items-center gap-7">
            <span>Status</span
            ><i
              class="translation text-amber-500 text-lg cursor-pointer hover:translate-x-[15px] fa-solid fa-arrow-right"
            ></i
            ><span class="w-[100%] text-left">{{
              getDataProfile?.status
            }}</span>
          </li>
          <li @click="isOpen = true" class="text-[red] cursor-pointer pt-6">
            Ma'lumotlarni o'zgartirish
          </li>
        </ul>
      </div>
    </div>
  </div>
  <ActionModal
    :isOpen="isOpen"
    @closeModal="isOpen = false"
    :modalTitle="`Edite profile`"
  >
    <FormInput />
  </ActionModal>
  <LoadingVue v-if="isLoading" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import profile from "../../assets/svg/profile.svg";
import axios from "@/plugins/axios.js";
import ActionModal from "../../components/modal/ActionModal.vue";
import FormInput from "@/components/input/FormInput.vue";

// get profile data
const getDataProfile = ref([]);
async function getProfileData() {
  try {
    await axios.get("/users/current").then((res) => {
      getDataProfile.value = res.data;
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getProfileData();
});

const isOpen = ref(false);
const isLoading = ref(false);
const closeModal = ref(false);
</script>
<style scoped>
.translation {
  transition: all 0.5s linear;
}
</style>
