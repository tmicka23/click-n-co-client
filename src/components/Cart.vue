<template>
  <div>
    <aside class="cart" id="cart" :class="handleOpen">
      <button class="close" @click="handleClose">X</button>
      <h2>My Orders</h2>
      <p v-if="!cartItems[0]" class="no-cart-item">No food selected</p>
      <div class="cart-items" v-if="cartItems[0]">
        <div class="line-item" v-for="cartItem in cartItems" :key="cartItem.id">
          <div class="item-name">{{ cartItem.item.title }}</div>
          <button @click="handleDelete(cartItem.id)">
            Delete
          </button>
        </div>
      </div>
      <div class="cart-total-count">To paid : $ {{ totalCount }}</div>
      <Button :method="handleClick">Buy</Button>
    </aside>
    <div id="overlay" v-if="isOpen" @click="handleClose"></div>
  </div>
</template>

<script>
import CartStore from "../stores/cartStore";
import Button from "./Button.vue";
export default {
  name: "Cart",
  components: { Button },
  data() {
    return {
      cartItems: CartStore.state.line_items,
      totalCount: CartStore.state.total_price,
    };
  },
  props: {
    isOpen: Boolean,
    handleClose: Function,
  },

  methods: {
    handleClick() {
      console.log("Buy !");
    },

    handleDelete(id) {
      CartStore.removeItem(id);
      this.cartItems = CartStore.state.line_items;
    },
  },

  computed: {
    handleOpen() {
      return { cartOpened: this.isOpen };
    },
  },
};
</script>

<style lang="scss">
.cart {
  width: 70vw;
  height: 100vh;
  background: white;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: -70vw;
  bottom: 0;
  z-index: 100;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.cart.cartOpened {
  transform: translateX(70vw);
}

#overlay {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  cursor: pointer;
}

.cart h2 {
  width: 100%;
  text-align: center;
}

.cart .close {
  width: 50px;
  height: 50px;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  color: black;
  font-size: 24px;
  font-weight: 700;
}

.no-cart-item {
  width: 100%;
  font-size: 24px;
  text-align: center;
}

.cart-total-count {
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: black;
}

@media screen and (min-width: 768px) {
  .cart {
    width: 50vw;
    left: -50vw;
  }

  .cart.cartOpened {
    transform: translateX(50vw);
  }
}

@media screen and (min-width: 1024px) {
  .cart {
    width: 40vw;
    left: -40vw;
    transition: transform 0.4s ease;
  }

  .cart.cartOpened {
    transform: translateX(40vw);
  }
}

@media screen and (min-width: 1366px) {
  .cart {
    width: 30vw;
    left: -30vw;
    transition: transform 0.6s ease;
  }

  .cart.cartOpened {
    transform: translateX(30vw);
  }
}
</style>
