<!--<script setup lang="ts">-->
<!--import { markRaw, ref, watch } from 'vue'-->
<!--import { useRoute } from 'vue-router'-->
<!--import DefaultLayout from "@/layouts/DefaultLayout.vue";-->
<!--import LoginLayout from "@/layouts/LoginLayout.vue";-->


<!--const layout = ref()-->
<!--const route = useRoute()-->

<!--watch(-->
<!--    () => route.meta?.layout as string | undefined,-->
<!--    async (metaLayout) => {-->
<!--        try {-->
<!--            const component = metaLayout && await import(/* @vite-ignore */ `./${metaLayout}.vue`)-->
<!--            layout.value = markRaw(component?.default || DefaultLayout)-->
<!--        } catch (e) {-->
<!--            layout.value = markRaw(DefaultLayout)-->
<!--        }-->
<!--    },-->
<!--    { immediate: true }-->
<!--)-->
<!--</script>-->

<!--<template>-->
<!--    <component :is="layout"> <router-view /> </component>-->
<!--</template>-->

<!--new code-->

<template>
    <RouterView v-slot="{ Component }">
        <transition :name="route.meta.transition || 'layout'" mode="out-in">
            <div :key="route.name">
                <component :is="detectLayout">
                    <transition mode="out-in" name="fade">
                        <div class="min-h-[100vh]">
                            <Component :is="Component" />
                        </div>
                    </transition>
                </component>
            </div>
        </transition>
    </RouterView>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LoginLayout from "@/layouts/LoginLayout.vue";







const layouts: { [key: string]: any } = {
    default: DefaultLayout,
    login: LoginLayout,
};

const route = useRoute();

const detectLayout = computed(() => {
    return layouts[route.meta.layout || ("default" as string)];
});


</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.3s ease-out;
}
.page-enter,
.page-leave-to {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease-out;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.75s ease-out;
}

.slide-enter-to {
    position: absolute;
    right: 0;
}

.slide-enter-from {
    position: absolute;
    right: -100%;
}

.slide-leave-to {
    position: absolute;
    left: -100%;
}

.slide-leave-from {
    position: absolute;
    left: 0;
}


.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

a,
button {
    cursor: pointer;
}
</style>

