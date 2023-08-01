<template>
  <div>
      <div class="relative search-box w-full sm:w-auto">
          <span
                  class="
              fa-sharp fa-solid fa-magnifying-glass
              text-xl text-[#7D7E8D]
              absolute
              ml-3
              sm:mt-2
              mt-1
            "
                  :class="{ 'search-icon': focused }"
          />
          <span
                  class="
              fa-solid fa-xmark
              text-[#7D7E8D] text-base
              right-2.5
              sm:top-2.5
              top-2
              transition
              duration-300
              absolute
              cursor-pointer
              hover:text-red
            "
                  :class="search !== '' ? 'opacity-100' : 'opacity-0'"
                  @click="clearInput"
          />

          <input
                  v-model="search"
                  type="text"
                  placeholder="search"
                  style="caret-color: #35abb2; outline: none"
                  class="
              placeholder:text-[#7D7E8D]
              outline-offset-0 outline-0
              w-full
              transition
              duration-300
              focus:outline-0
              hover:border-[#35ABB2]
              focus:!border-[#35ABB2] focus:!border
              text-[#18182F]
              font-medium
              leading-130
              text-sm
              rounded-lg
              border border-[#E9EBF4]
              bg-white
              sm:py-[11px]
              py-[9px]
              min-w-[278px]
              sm:pl-10
              px-9
            "
                  @focus="onFocus"
                  @blur="onBlur"
          />
      </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import {debounce} from "@/helpers/debounce";

const router = useRouter()

const search = ref("")

watch(
    () => search.value,
    (newValue) => {
        debounce(
            'search',
            () => {
                if(search.value === ""){
                    router.replace({query:{}})
                }
                if (newValue) {
                    router.replace({ query: { search: newValue } })
                }
                // newsStore.fetchMainNews({ search: newValue }).finally(() => {
                //     loading.value = false
                // })
            },
            20
        )
    }
)
function clearInput() {
    search.value = ''
    // newsStore.fetchMainNews().finally(() => {
    //     loading.value = false
    // })
    router.replace({ query: {} })
}

const focused = ref(false)
const onFocus = () => {
    focused.value = true
}
const onBlur = () => {
    focused.value = false
}
</script>

<style scoped>
*:focus {
    border: inherit;
}
.search-icon {
    transition: all 0.3s;
    color: #35abb2;
}
</style>