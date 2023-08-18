import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";
import currentAxios from "axios"
import {useToast} from "vue-toastification";
import router from "@/routes/index.js"
const toast =  useToast()
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      userRole: "",
      isRegister: 0,
    },
  }),
  actions: {
    async  getUser(option){
      try {
        const user = await axios.post('auth/access/token',option)
        const token = user.data.accessToken
        sessionStorage.setItem('token',token)
        sessionStorage.setItem('refreshToken',user.data.refreshToken)
        sessionStorage.setItem('userRole','ADMIN')
        // await this.getUserRole(token)
        this.user.isRegiter = 1
        sessionStorage.setItem('isRegister',1)
        toast.success("Tizimga muvaffaqiyatli kirdingiz!")
        await router.push("/")
      }
      catch (err){
       toast.error("Telefon raqam yoki parol xato!")
      }
      // sessionStorage.setItem('userRole','ADMIN')
      // sessionStorage.setItem('isRegister',1)
      // toast.success("Tizimga muvaffaqiyatli kirdingiz!")
      // await router.push("/")
    },

    async logOut(){
      this.user.userRole = ""
      this.user.isRegiter = 0
      sessionStorage.setItem("isRegister",0)
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('refreshToken')
    },
    checkUser() {
      return this.user;
    },
  },
});
