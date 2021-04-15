import Vue from "vue";
import App from "./App.vue";
import dotenv from "dotenv";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Order from "./components/Order.vue";

dotenv.config();

Vue.config.productionTip = false;
Vue.use(VueRouter);

const options = {
  position: "top-center",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

Vue.use(Toast, options);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/orders/:id",
      component: Order,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
