import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";

export const useSellerStore = defineStore("sellerStore", {
  state: () => ({
    seller: [],
    exclusiveClient: [],
    loading: false,
  }),
  actions: {
    fetchExclusiveClient(size, page) {
      return new Promise((resolve, reject) => {
        axios
          .get("admin/exclusiveClients", {
            params: {
              pageNum: page - 1,
              pageSize: size,
            },
          })
          .then((res) => {
            this.exclusiveClient = res.data;
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
    fetchClientSellers(size, page) {
        return new Promise((resolve, reject) => {
          axios
            .get("admin/sellers", {
              params: {
                pageNum: page - 1,
                pageSize: size,
              },
            })
            .then((res) => {
              this.seller = res.data;
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
