<template>
  <div id="app">
    <header>
      <Navbar :handleCartOpen="handleCartOpen" />
      <HeroBanner />
      <img class="shape" :src="shape" alt="click'n'co shape" />
    </header>
    <main>
      <Cart :isOpen="cartIsOpen" :handleClose="handleClose" />
      <Foods :foods="foods" />
    </main>
  </div>
</template>

<script>
import FOODS_API from "./services/FOODS_API";
import shape from "./assets/shape.svg";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import Foods from "./components/Foods";
import Cart from "./components/Cart";
export default {
  name: "App",
  components: { Navbar, HeroBanner, Foods, Cart },
  data() {
    return {
      foods: [],
      shape,
      cartIsOpen: false,
    };
  },
  mounted() {
    FOODS_API.get(
      "/recipes/complexSearch?cuisine=italian&number=20&addRecipeInformation=true"
    ).then((res) => (this.foods = res.data.results));
  },

  methods: {
    handleClose() {
      this.cartIsOpen = false;
    },

    handleCartOpen() {
      this.cartIsOpen = true;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;1,900&display=swap");
.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito", sans-serif;
  color: #3f3f3f;
  font-size: 18px;
  overflow-x: hidden;
}
a {
  color: black;
}
p {
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 1px;
}

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
