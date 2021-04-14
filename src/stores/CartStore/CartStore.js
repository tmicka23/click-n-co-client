import Vuex from "vuex";
import mutations from "./CartStoreMutations";
import actions from "./CartStoreActions";
import getters from "./CartStoreGetters";

const store = new Vuex.Store({
  state: {
    cart_id: "",
    line_items: [],
    total_items: 0,
    total_price: 0,
  },
  mutations,
  actions,
  getters,
});

export default store;
