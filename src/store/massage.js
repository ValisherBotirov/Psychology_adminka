import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";

export const useMassageStore = defineStore("massageStore", {
  state: () => ({
    data: [],
    newData: [],
    coundMassage: null,
  }),
  actions: {
    async getMassage() {
      try {
        const getData = await axios.get(`suggestions/get-all`);
        this.data = getData.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getNewMassage() {
      try {
        const getNew = await axios.get(`suggestions/get-all-news`);
        this.newData = getNew.data;
        this.coundMassage = getNew.data.length;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
