
import { defineStore } from 'pinia'
import axios from "@/plugins/axios.js";

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        categories: [] ,
        subCategories:[],
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
        fetchSubCategoryAll(){
            return new Promise((resolve,reject)=>{
                this.loading = true
                axios.get('/test/get/all').then((res)=>{
                    this.subCategories = res.data
                    resolve(res)
                }).catch((err)=>{
                    reject(err)
                }).finally(()=>{
                    this.loading = false
                })
            })
        }
    },
})