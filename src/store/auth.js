import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";
import currentAxios from "axios";
import { useToast } from "vue-toastification";
import router from "@/routes/index.js";
const toast = useToast();
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      userRole: "",
      isRegister: 0,
      massageCount: null,
    },
  }),
  actions: {
    async getUser(option) {
      try {
        const user = await axios.post("auth/access/token", option);
        const token = user.data.accessToken;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("refreshToken", user.data.refreshToken);
        await this.getUserRole(token);
      } catch (err) {
        toast.error("Telefon raqam yoki parol xato!");
      }
    },

    async getUserRole() {
      axios
        .get("user/current")
        .then((res) => {
          console.log(res.data.role, "user role");
          if (res.data.role === "ADMIN") {
            sessionStorage.setItem("userRole", "ADMIN");
            this.user.isRegiter = 1;
            sessionStorage.setItem("isRegister", 1);
            toast.success("Tizimga muvaffaqiyatli kirdingiz!");
            router.push("/");
          } else {
            toast.error("Tizimga faqat admin kiroladi!");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Telefon raqam yoki parol xato!");
        });
    },

    async refreshToken() {
      try {
        const newToken = await axios.post("auth/refresh/token", {
          refreshToken: sessionStorage.getItem("refreshToken"),
        });
        sessionStorage.setItem("token", newToken.data.accessToken);
      } catch (err) {
        console.log(err.response.status, "err");
        if (err.response.status === 401 || err.response.status === 500) {
          this.logOut();
          window.location.reload();
        }
      }
    },

    async logOut() {
      this.user.userRole = "";
      this.user.isRegiter = 0;
      sessionStorage.setItem("isRegister", 0);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");
    },
    checkUser() {
      return this.user;
    },
    massage() {
      return (this.massageCount = localStorage.getItem("massage"));
    },
  },
});
