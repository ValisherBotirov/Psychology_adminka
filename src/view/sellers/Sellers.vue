<template>
  <div>
    <div class="mt-20 mb-5">
      <h3 class="text-gray-700 text-3xl font-medium">Sotuvchilar</h3>
    </div>
    <div class="flex items-end gap-3"></div>
    <table class="w-full text-sm text-left text-gray-500 mt-4">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="p-4">#</th>
          <th scope="col" class="px-6 py-3">Sotuvchilar</th>
          <th scope="col" class="px-6 py-3">Role</th>
          <th scope="col" class="px-6 py-3 text-end">Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b hover:bg-gray-50"
          v-for="(item, index) in data"
          :key="index"
        >
          <td class="w-4 p-4">
            <p class="font-bold cursor-pointer">{{ index + 1 }}.</p>
          </td>
          <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ item?.name }}
          </th>
          <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ item?.role }}
          </th>
          <td class="flex items-center px-6 py-4 space-x-4 justify-end">
            <div class="cursor-pointer hover:text-blue-700 font-medium">
              <RouterLink to="/singSellers">
                <p>more</p>
              </RouterLink>
            </div>
            <div
              @click="itemEditPublisher(item)"
              class="font-medium text-blue-600 hover:underline cursor-pointer"
            >
              <i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i>
            </div>
            <div
              class="font-medium text-red-600 hover:underline cursor-pointer"
            >
              <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
const data = [
  {
    name: "Nodir Ikromov",
    role: "sotuvchi",
  },
  {
    name: "Nodir Ikromov",
    role: "oluvchi",
  },
  {
    name: "Nodir Ikromov",
    role: "sotuvchi",
  },
  {
    name: "Nodir Ikromov",
    role: "optomchi",
  },
  {
    name: "Nodir Ikromov",
    role: "kattasi",
  },
  {
    name: "Nodir Ikromov",
    role: "vapshi kattasi",
  },
];
</script>
