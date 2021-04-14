<template>
  <nav class="navbar">
    <div class="brand">
      <img :src="logo" alt="click'n'co" />
    </div>

    <div class="navbar-end">
      <a href="#foods">Foods</a>

      <div class="navbar-cart">
        <img :src="cartImg" alt="cart" @click="handleCartOpen" />
        <span v-if="cart.total_items > 0" class="badge">{{
          cart.total_items
        }}</span>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from "../assets/click-n-co.png";
import cartImg from "../assets/cart.svg";
import CartStore from "../stores/CartStore/CartStore";
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  store: CartStore,
  props: {
    handleCartOpen: Function,
  },
  data() {
    return {
      logo,
      cartImg,
    };
  },

  computed: {
    ...mapGetters(["cart"]),
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
  position: relative;
  &:hover {
    cursor: pointer;
  }
}

.navbar .badge {
  position: absolute;
  width: 16px;
  height: 16px;
  top: -10px;
  right: -10px;
  background: #ee5253;
  color: white;
  font-size: 12px;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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
