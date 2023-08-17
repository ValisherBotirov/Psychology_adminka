
import { defineStore } from 'pinia'
import axios from "@/plugins/axios.js";

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        categories: [] ,
        loading:false
    }),
    actions: {
        fetchCategoryAll() {
            return new Promise((resolve, reject) => {
                this.loading = true
                axios
                    .get('/category/get/all')
                    .then((res) => {
                        this.categories = res.data
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    }).finally(()=>{
                    this.loading = false
                })
            })
        },
    },
})