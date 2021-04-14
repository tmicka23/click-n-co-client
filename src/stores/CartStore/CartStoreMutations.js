const mutations {
    createId(id) {
      this.state.cart_id = id;
    },
  
  totalItemsCount() {
    if (!this.state.line_items.length) {
      this.state.total_items = 0;
    } else {
      const items = this.state.line_items.map((i) => parseInt(i.quantity));
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const count = items.reduce(reducer);
      this.state.total_items = count;
    }
  },

  totalPrice() {
    if (!this.state.line_items.length) {
      this.state.total_price = 0;
    } else {
      const items = this.state.line_items.map((i) => parseFloat(i.price));
      const reducer = (accumulator, currentValue) =>
        rounded(accumulator + currentValue);
      const total = items.reduce(reducer);
      this.state.total_price = total;
    }
  },

  addItem(CartItem) {
    this.state.line_items.push(CartItem);
    this.totalPrice();
    this.totalItemsCount();
  },

  removeItem(id) {
    this.state.line_items = this.state.line_items.filter(
      (item) => item.id !== id
    );
    this.totalPrice();
    this.totalItemsCount();
  },
}
