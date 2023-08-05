<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium text-center">Test qo'shish </h3>
        <router-link to="/list">
        <SButton variant="info"> Testlar bo'limiga o'tish</SButton>
        </router-link>
    </div>
      <div class="mt-5 flex gap-4 text-white  max-w-[900px] py-3 mx-auto justify-around">
          <router-link to="/test/one" class="bg-blue-500 py-3 px-4 transition duration-500" :active-class="'bg-blue-800'">Bir to'g'ri javobli test qo'shish</router-link>
          <router-link to="/test/more" class="bg-blue-500 py-3 px-4 transition duration-500" :active-class="'bg-blue-800'">Ko'p to'g'ri javobli test qo'shish</router-link>
          <router-link to="/test/close" class="bg-blue-500 py-3 px-4 transition duration-500" :active-class="'bg-blue-800'">Yopiq variantlik test qo'shish</router-link>
      </div>

      <div class="mt-4">
          <transition name="fade">
              <router-view></router-view>
          </transition>
      </div>

  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import SButton from "@/components/buttons/SButton.vue";
import SingleSelect from "@/components/select/SingleSelect.vue";
import {ref} from "vue";




</script>

<style>
.fade-enter-from{
    transform: translateX(-500px);
}
.fade-enter-to{
    transform: translate(0px);
}
.fade-enter-active{
    transition: all 0.7s;
}

</style>