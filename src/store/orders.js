import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";

export const useOrdersStore = defineStore("departmentStore", {
  state: () => ({
    orders: [],
    pagination: null,
    loading: false,
  }),
  actions: {
    fetchOrderList(limit, page) {
      return new Promise((resolve, reject) => {
        axios
          .get("/orders", {
            params: {
              _limit: limit,
              _page: page,
            },
          })
          .then((res) => {
            console.log(res);
            this.orders = res.data;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.loading = true;
          });
      });
    },
    fetchOrdersAll() {
      return new Promise((resolve, reject) => {
        axios
          .get("/orders")
          .then((res) => {
            console.log(res);
            this.pagination = res.data.length;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.loading = true;
          });
      });
    },
  },
});
