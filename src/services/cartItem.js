import { rounded } from "./functions";

export class CartItem {
  constructor(item, quantity) {
    this.item = item;
    this.id = this.item.id;
    this.quantity = quantity;
    this.defaultPrice = 0;
  }

  updateQuantity(value) {
    rounded((this.quantity = parseInt(value)));
  }

  get price() {
    const newPrice = rounded(
      parseFloat(this.item.pricePerServing / this.item.servings / 4) *
        this.quantity
    );
    this.defaultPrice = newPrice;
    return this.defaultPrice;
  }
}
