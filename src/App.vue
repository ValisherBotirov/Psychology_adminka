<template>
    <AppLayout/>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import {onMounted} from "@vue/runtime-core";
import {useAuthStore} from "@/store/auth.js";

const authStore =  useAuthStore()

function checkToken(){
    const token = sessionStorage.getItem('refreshToken')
    if(token){
        console.log("run 1")
        authStore.refreshToken()
    }
    setInterval(()=>{
        if(token){
            console.log("run 2")
            authStore.refreshToken()
        }
    },28*60*1000)
}

onMounted(()=>{
    checkToken()
})
</script>
