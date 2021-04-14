import { rounded } from "./functions";

export class CartItem {
  constructor(item, quantity) {
    this.item = item;
    this.id = this.item.id;
    this.quantity = quantity;
    this.price = rounded(
      parseFloat(this.item.pricePerServing / this.item.servings / 4) *
        this.quantity
    );
  }

  updateQuantity(value) {
    rounded((this.quantity = parseInt(value)));
  }
}
