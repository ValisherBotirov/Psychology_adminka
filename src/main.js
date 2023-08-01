import { createApp } from "vue";
import { createPinia } from "pinia";
import "./plugins/axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";

import router from "./routes";
import "./style.css";

// vueAwesomePagination
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

// maska
import Maska from "maska";

// element plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(Toast);
app.use(Maska);
app.use(ElementPlus);
app.use(VueAwesomePaginate);
app.mount("#app");
