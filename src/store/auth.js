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

        await this.getUserRole(token)
        this.user.isRegiter = 1
        sessionStorage.setItem('isRegister',1)
        toast.success("Tizimga muvaffaqiyatli kirdingiz!")
        await router.push("/")
      }
      catch (err){
       toast.error("Telefon raqam yoki parol xato!")
      }
    },
    async getUserRole(token){
      try{
        const userRole = await currentAxios.get("http://185.74.5.188:8081/api/v1/users/current",{
          headers:{
            Authorization : `Bearer ${token}`
          }
        })
        this.user.userRole = userRole.data.role
        sessionStorage.setItem('userRole',userRole.data.role)
        console.log(userRole,"role user")
      }
      catch(err){
        console.log(err)
      }
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
