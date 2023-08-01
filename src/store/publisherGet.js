import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";

export const usePublisherGet = defineStore("getPublisher", {
  state: () => ({
    publisherGetList: [],
  }),
  actions: {
    getPublisher() {
      return new Promise((resolve, reject) => {
        axios
          .get("publisher/all")
          .then((res) => {
            this.publisherGetList = res.data
            resolve(res);
          })
          .catch((err) => {
            reject(err);
            console.log(err);
          });
      });
    },
  },
});
