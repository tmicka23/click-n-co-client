<template>
  <li class="food">
    <img :src="food.image" :alt="food.title" />
    <h3>{{ food.title }}</h3>
    <p v-html="food.summary"></p>
    <div class="food-price">
      $ {{ parseFloat(food.pricePerServing / food.servings / 4).toFixed(2) }}
    </div>
    <Button :method="handleClick">Add to cart</Button>
  </li>
</template>

<script>
import Button from "./Button";
import { CartItem } from "../services/cartItem";
import CartStore from "../stores/CartStore/CartStore";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Food",
  components: { Button },
  store: CartStore,
  props: {
    food: { type: Object },
  },
  computed: { ...mapGetters(["cart"]) },
  methods: {
    ...mapActions(["addItem", "removeItem", "totalItemsCount", "totalPrice"]),

    handleClick() {
      const existingFood = this.cart.line_items.find(
        (i) => i.id === this.food.id
      );
      if (!existingFood) {
        const cartItem = new CartItem(this.food, 1);
        this.addItem(cartItem);
      } else {
        existingFood.updateQuantity(existingFood.quantity + 1);
        this.totalItemsCount();
        this.totalPrice();
      }
    },
  },
};
</script>

<style lang="scss">
.food {
  width: 320px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 2rem;
}

.food img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.food h3 {
  width: calc(100% - 70px);
  font-size: 1.2rem;
  text-align: end;
}

.food p {
  width: 100%;
  height: 80px;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
}

.food-price {
  font-weight: 700;
  color: black;
}
</style>
