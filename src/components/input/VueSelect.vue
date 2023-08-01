<template>
    <div
            class="w-full"
            :class="{ 'z-1': isDropdownOpen, '!cursor-not-allowed ': disabled }"
    >
        <FormDropdown
                class="w-full "
                :class="{ '!pointer-events-none': disabled }"
                full
                @on-toggle="onToggleDropdown"
        >
            <template #head>
                <FormInput
                        class="p-[10px]"
                        :readonly="true"
                        :model-value="labelKey ? currentItem[labelKey] : currentItem"
                        input-class="cursor-pointer"
                        :class="{ '!bg-[#EBEBEB] !text-[#8390A6]': disabled }"
                        v-bind="{ error, placeholder }"
                >
                    <template #suffix>
                        <svg
                                class="transition-300"
                                :class="{ 'rotate-180': isDropdownOpen }"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                    d="M19.92 8.94995L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07996 8.94995"
                                    :class="{ 'stroke-blue': isDropdownOpen }"
                                    stroke="#1C1F20"
                                    stroke-width="1.5"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                            />
                        </svg>
                    </template>
                </FormInput>
            </template>
            <template v-if="!disabled" #body>
                <div
                        class="h-full max-h-[270px]"
                        style="box-shadow: 0 4px 44px rgba(56, 56, 56, 0.16)"
                >
                    <div
                            v-for="(item, index) in list"
                            :key="index"
                            :class="[
              'px-3 py-2.5 border-grey-400 transition duration-300 font-medium text-dark leading-20 first:border-t-0 border-t ',
              currentItem[valueKey] === item[valueKey]
                ? 'bg-blue/10 cursor-not-allowed'
                : 'hover:bg-blue/10 hover:text-blue cursor-pointer',
            ]"
                            @click="handleSelect(item, index)"
                    >
                        {{ labelKey ? item[labelKey] : item }}
                    </div>
                    <div v-if="observe" ref="allItemsTarget"></div>
                </div>
            </template>
        </FormDropdown>
    </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useIntersectionObserver} from "@vueuse/core";
import {onMounted} from "@vue/runtime-core";

interface Props {
    list: Array<object>;
    label?: string;
    valueKey?: string;
    labelKey?: string;
    iconKey?: string;
    error?: boolean;
    disabled?: boolean;
    placeholder?: string;
    modelValue?: number | string;
    observe?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    valueKey: undefined,
    iconKey: "",
    labelKey: "",
    disabled: false,
});

const emit = defineEmits<{
    (e: "update:modelValue", value: any): void;
    (e: "fetchData"): void;
}>();

const isDropdownOpen = ref(false);
const currentItem = ref("");

const allItemsTarget = ref(null);
const allItemsIsVisible = ref(false);
const allItemsObserver = ref();

if (props.observe) {
    allItemsObserver.value = useIntersectionObserver(
        allItemsTarget,
        ([{isIntersecting}]) => {
            allItemsIsVisible.value = isIntersecting;
        }
    );
}

watch(
    () => allItemsIsVisible.value,
    (newValue) => {
        if (newValue) {
            emit("fetchData");
        }
    }
);

function handleSelect(item: any, idx: number) {
    if (currentItem.value[props.valueKey] !== item[props.valueKey]) {
        currentItem.value = item;
        let current = undefined;

        props.valueKey ? (current = item[props.valueKey]) : (current = item);

        emit("update:modelValue", current);
    }
}

function onToggleDropdown(isOpened: boolean) {
    isDropdownOpen.value = isOpened;
}

async function getCurrent() {
    if (props.modelValue) {
        currentItem.value = props.list.find(
            (e) => e[props.valueKey] == props.modelValue
        );
    }
}

onMounted(async () => {
    await getCurrent();
});

// watch(
//   () => props.modelValue,
//   (newValue) => {
//     if (![undefined, null].includes(props.modelValue) && newValue?.length) {
//       currentItem.value = props.list.find(
//         (e: { id: number }) => e.id == newValue
//       );
//     }
//   },
//   { immediate: true }
// );
</script>
