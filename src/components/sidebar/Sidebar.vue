<template>
  <div
    v-cloak
    :class="sidebarOpen ? 'block' : 'hidden'"
    @click="emit('closeSidebar')"
    class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
  ></div>

  <div
    v-cloak
    :class="
      sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
    "
    class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto border-r border-black transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0"
  >
    <div class="flex items-center px-6 mt-8">
      <p class="font-medium text-2xl flex justify-start">
        <router-link to="/"> Dashboard </router-link>
      </p>
    </div>

    <nav class="mt-10">
      <div v-if="userRole === 'ADMIN'">
          <RouterLink
                  class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-500"
                  :class="
          route.path === '/'
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
                  to="/"
          >
              <svg
                      class="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
              >
                  <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
              </svg>
              <span class="mx-3">Bosh sahifa</span>
          </RouterLink>

          <RouterLink
                  class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                  :class="
          route.path.includes('/users')
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
                  to="/users"
          >
              <svg
                      class="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
              >
                  <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                  />
              </svg>

              <span class="mx-3">Foydalanuvchilar</span>
          </RouterLink>

          <RouterLink
                  class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                  :class="
          route.path.includes('/products')
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
                  to="/products"
          >
              <svg
                      class="h-6 w-6"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                          d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linejoin="round"
                  />
                  <path
                          d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                          stroke="currentColor"
                          stroke-width="2"
                  />
              </svg>

              <span class="mx-3">Mahsulotlar</span>
          </RouterLink>

          <RouterLink
                  class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                  :class="
          route.path.includes('/category')
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
                  to="/category"
          >
              <svg
                      class="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
              >
                  <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                  />
              </svg>

              <span class="mx-3">Kategoriya qo'shish</span>
          </RouterLink>
          <RouterLink
                  class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                  :class="
          route.path.includes('/sellers')
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
                  to="/sellers"
          >
              <i class="fa-solid fa-handshake text-xl"></i>
              <span class="mx-3">Sotuvchilar</span>
          </RouterLink>
      </div>
        <div v-if="userRole==='SELLER'">
            <RouterLink
                    class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-500"
                    :class="
          route.path === '/'
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
                    to="/"
            >
                <svg
                        class="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                >
                    <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                </svg>
                <span class="mx-3">Bosh sahifa</span>
            </RouterLink>
            <RouterLink
                    class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                    :class="
          route.path.includes('/products')
            ? 'text-gray-100 bg-opacity-25 bg-gray-700'
            : 'text-gray-500'
        "
                    to="/products"
            >
                <svg
                        class="h-6 w-6"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                            d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linejoin="round"
                    />
                    <path
                            d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                            stroke="currentColor"
                            stroke-width="2"
                    />
                </svg>

                <span class="mx-3">Mahsulotlar</span>
            </RouterLink>
        </div>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const emit = defineEmits(["closeSidebar"]);
const props = defineProps(["sidebarOpen"]);
// ADMIN, SELLER
const userRole = sessionStorage.getItem('userRole')
</script>
