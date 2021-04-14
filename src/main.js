import Vue from "vue";
import App from "./App.vue";
import dotenv from "dotenv";
import Vuex from "vuex";

Vue.use(Vuex);

dotenv.config();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
