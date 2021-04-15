<template>
  <div id="app">
    <Navbar :handleCartOpen="handleCartOpen" />
    <Cart :isOpen="cartIsOpen" :handleClose="handleClose" />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import CartStore from "./stores/CartStore/CartStore";
export default {
  name: "App",
  components: { Navbar, Cart },
  store: CartStore,
  data() {
    return {
      cartIsOpen: false,
    };
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
</style>
