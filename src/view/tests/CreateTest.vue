<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium text-center">
        Test qo'shish
      </h3>
      <router-link to="/list">
        <SButton variant="info"> Testlar bo'limiga o'tish</SButton>
      </router-link>
    </div>
    <div
      class="mt-5 flex gap-4 text-white  py-3 mx-auto justify-between"
    >
      <router-link
        to="/test/one"
        class="bg-blue-500 py-3 px-4 transition duration-500 rounded-md"
        :active-class="'bg-red-800'"
        >Bir to'g'ri javobli test qo'shish</router-link
      >
      <router-link
        to="/test/more"
        class="bg-blue-500 py-3 px-4 transition duration-500 rounded-md"
        :active-class="'bg-red-800'"
        >Ko'p to'g'ri javobli test qo'shish</router-link
      >
      <router-link
        to="/test/close"
        class="bg-blue-500 py-3 px-4 transition duration-500 rounded-md"
        :active-class="'bg-red-800'"
        >Yopiq variantlik test qo'shish</router-link
      >
        <router-link
                to="/test/category"
                class="bg-blue-500 py-3 px-4 transition duration-500 rounded-md"
                :active-class="'bg-red-800'"
        >Kategoriyali test qo'shish</router-link
        >
    </div>

    <div class="mt-4">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import SButton from "@/components/buttons/SButton.vue";

</script>

<style>
.fade-enter-from {
  transform: translateX(-500px);
}
.fade-enter-to {
  transform: translate(0px);
}
.fade-enter-active {
  transition: all 0.7s;
}
</style>
