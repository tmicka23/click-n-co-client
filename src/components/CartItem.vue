<template>
  <div class="cart-item">
    <button class="item-delete" @click="handleDelete">
      <img :src="trash" alt="delete item" />
    </button>
    <img :src="img" :alt="name" class="item-img" />
    <div class="item-content">
      <h4 class="item-name">{{ name }}</h4>
      <div class="item-summary" v-html="summary" />
      <div class="item-footer">
        <div class="item-quantity">
          <button class="item-button" @click="handleDecrease">-</button>
          <span class="item-quantity-value">{{ quantity }}</span>
          <button class="item-button" @click="handleIncrease">+</button>
        </div>
        <span class="item-price">$ {{ price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import trash from "../assets/trash.svg";
import CartStore from "../stores/CartStore/CartStore";
export default {
  name: "CartItem",
  store: CartStore,
  data() {
    return {
      trash,
    };
  },
  computed: {
    ...mapGetters(["cart"]),
  },
  props: {
    id: Number,
    img: String,
    name: String,
    summary: String,
    price: Number,
    quantity: Number,
  },
  methods: {
    ...mapActions(["addItem", "removeItem", "totalItemsCount", "totalPrice"]),

    handleDecrease() {
      const currentFood = this.cart.line_items.find((i) => i.id === this.id);
      if (currentFood.quantity === 1) {
        this.removeItem(this.id);
      } else {
        currentFood.updateQuantity(currentFood.quantity - 1);
        this.totalItemsCount();
        this.totalPrice();
      }
    },

    handleIncrease() {
      const currentFood = this.cart.line_items.find((i) => i.id === this.id);
      currentFood.updateQuantity(currentFood.quantity + 1);
      this.totalItemsCount();
      this.totalPrice();
    },

    handleDelete() {
      this.removeItem(this.id);
    },
  },
};
</script>

<style lang="scss">
.cart-item {
  position: relative;
  width: 95%;
  box-sizing: border-box;
  overflow: hidden;
  margin: 16px auto;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: white;
  box-shadow: 0 0 25px rgba(0, 0, 25, 0.25);
  font-size: 0.8rem;
}

.item-img {
  width: 60px;
  height: 60px;
  margin-right: 16px;
  border-radius: 50%;
  object-fit: cover;
}

.item-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item-name {
  width: 90%;
  text-align: start;
  color: black;
}

.item-summary {
  width: 100%;
  height: 40px;
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  margin-bottom: 16px;
}

.item-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.item-quantity {
  display: flex;
  align-items: center;
}

.item-button {
  border: none;
  width: 20px;
  height: 20px;
  padding: 5px;
  border-radius: 50%;
  background: #ffb800;
  color: black;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-quantity-value {
  margin: 0 8px;
}

.item-price {
  color: black;
  font-weight: 600;
}

.item-delete {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  color: black;
}

@media screen and (min-width: 992px) {
  .cart-item {
    width: 85%;
    padding: 16px;
    font-size: 1rem;
  }

  .item-img {
    width: 80px;
    height: 80px;
    margin-right: 24px;
  }

  .item-button {
    width: 30px;
    height: 30px;
    padding: 5px;
    font-size: 24px;
    font-weight: 700;
  }

  .item-summary {
    font-size: 16px;
    letter-spacing: 2px;
    line-height: 25px;
    height: 70px;
  }

  .item-delete {
    width: 40px;
    height: 40px;
    top: 0;
    right: 0;
  }

  .item-name {
    width: 100%;
  }
}
</style>
