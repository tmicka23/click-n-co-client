<template>
  <div>
    <aside class="cart" id="cart" :class="handleOpen">
      <button class="close" @click="handleClose">X</button>
      <h2>My Order</h2>
      <div class="cart-total-count">Total items : {{ cart.total_items }}</div>
      <p v-if="!cart.line_items[0]" class="no-cart-item">No food selected</p>
      <div class="cart-items" v-if="cart.line_items[0]">
        <CartItem
          :img="cartItem.item.image"
          :name="cartItem.item.title"
          :summary="cartItem.item.summary"
          :price="cartItem.price"
          :quantity="cartItem.quantity"
          :id="cartItem.id"
          v-for="cartItem in cart.line_items"
          :key="cartItem.id"
        />
      </div>
      <div class="cart-total-price">To paid : $ {{ cart.total_price }}</div>

      <div v-if="cart.line_items[0]" class="cart-email">
        <label for="email">To order, please enter your email :</label>
        <input
          type="email"
          name="email"
          id="email"
          @change="handleEmail"
          placeholder="your@email.com"
        />
      </div>
      <Button v-if="cart.line_items[0]" :method="handleClick">Buy</Button>
    </aside>
    <div id="overlay" v-if="isOpen" @click="handleClose"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartStore from "../stores/CartStore/CartStore";
import Button from "./Button.vue";
import CartItem from "./CartItem";
export default {
  name: "Cart",
  store: CartStore,
  components: { Button, CartItem },

  props: {
    isOpen: Boolean,
    handleClose: Function,
  },

  methods: {
    ...mapActions(["addEmail"]),
    handleClick() {
      console.log(this.cart);
    },

    handleEmail(e) {
      this.addEmail(e.target.value);
    },
  },

  computed: {
    ...mapGetters(["cart"]),
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
  background: whitesmoke;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: -70vw;
  bottom: 0;
  z-index: 100;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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

.cart-total-price {
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: black;
}

.cart-total-count {
  width: 100%;
  text-align: center;
  color: black;
}

.cart-items {
  margin: 24px auto;
}

.cart-email {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.cart-email label {
  width: 100%;
  margin: 24px 0;
  text-align: center;
}

.cart-email input {
  width: 80%;
  padding: 0.8rem 0.5rem;
  border-radius: 12px;
  border: none;
  background: white;
  border-bottom: 1px solid gray;
  outline-color: #ffb800;
  font-size: 1.1rem;
  font-weight: 300;

  &::placeholder {
    color: darkgrey;
    font-weight: 300;
  }
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
