import axios from "axios";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

const token = sessionStorage.getItem("token");
$axios.interceptors.request.use(
  (config) => {
    // if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default $axios;
