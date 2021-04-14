<template>
  <nav class="navbar">
    <div class="brand">
      <img :src="logo" alt="click'n'co" />
    </div>

    <div class="navbar-end">
      <a href="#foods">Foods</a>

      <img class="navbar-cart" :src="cart" alt="cart" @click="handleCartOpen" />
    </div>
  </nav>
</template>

<script>
import logo from "../assets/click-n-co.png";
import cart from "../assets/cart.svg";
export default {
  name: "Navbar",
  props: {
    handleCartOpen: Function,
  },
  data() {
    return {
      logo,
      cart,
    };
  },
};
</script>

<style lang="scss">
.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar {
  width: 80%;
  @extend .space-between;
  margin: 20px auto;
}

.navbar-end {
  display: flex;
  align-items: center;
}

.navbar-end img {
  margin-left: 1rem;
}

.brand img {
  height: 24px;
}

.navbar-cart {
  &:hover {
    cursor: pointer;
  }
}

@media screen and (min-width: 768px) {
  .brand img {
    height: 36px;
  }
  .navbar-end {
    width: 10%;
  }

  .navbar-end img {
    margin-left: 2rem;
  }
}
</style>
