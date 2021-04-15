<template>
  <div>
    <HeroBanner />
    <img class="shape" :src="shape" alt="click'n'co shape" />
    <Foods :foods="foods" />
  </div>
</template>

<script>
import shape from "../assets/shape.svg";
import HeroBanner from "./HeroBanner";
import Foods from "./Foods";
import CartStore from "../stores/CartStore/CartStore";
import FOODS_API from "../services/FOODS_API";
import { mapActions } from "vuex";
export default {
  name: "Home",
  components: { HeroBanner, Foods },
  store: CartStore,
  data() {
    return {
      foods: [],
      shape,
    };
  },
  methods: {
    ...mapActions(["saveCartInLocalStorage", "initCart"]),
  },
  mounted() {
    FOODS_API.get(
      "/recipes/complexSearch?cuisine=italian&number=20&addRecipeInformation=true"
    ).then((res) => (this.foods = res.data.results));
    this.initCart();
  },
};
</script>

<style lang="scss">
.shape {
  display: none;
}

@media screen and (min-width: 992px) {
  .shape {
    display: block;
    width: 70vw;
    position: absolute;
    top: -50px;
    right: 0;
    z-index: -1;
  }
}
</style>
