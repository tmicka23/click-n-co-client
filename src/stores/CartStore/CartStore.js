import Vuex from "vuex";
import Vue from "vue";
import { rounded } from "../../services/functions";
import { CartItem } from "../../services/cartItem";

Vue.use(Vuex);

const state = {
  email: null,
  line_items: [],
  total_items: 0,
  total_price: 0,
};

const getters = {
  cart(state) {
    return state;
  },
};

const mutations = {
  ADD_EMAIL(state, email) {
    state.email = email;
  },

  UPDATE_ITEMS_COUNT(state, count) {
    state.total_items = count;
  },

  UPDATE_TOTAL_PRICE(state, price) {
    state.total_price = price;
  },

  ADD_ITEM(state, item) {
    state.line_items.push(item);
  },

  REMOVE_ITEM(state, id) {
    state.line_items = state.line_items.filter((i) => i.id !== id);
  },

  SAVE_CART(state) {
    const savedCart = window.localStorage.getItem("CART");
    if (savedCart) {
      window.localStorage.removeItem("CART");
    }
    window.localStorage.setItem("CART", JSON.stringify(state));
  },

  INIT_CART(state, savedCart) {
    const newState = JSON.parse(savedCart);
    state.email = newState.email;
    state.line_items = newState.line_items.map((i) => {
      const cartItem = new CartItem(i.item);
      cartItem.updateQuantity(i.quantity);
      return cartItem;
    });
    state.total_items = newState.total_items;
    state.total_price = newState.total_price;
  },
};

const actions = {
  addEmail(store, email) {
    store.commit("ADD_EMAIL", email);
    store.dispatch("saveCartInLocalStorage");
  },

  totalItemsCount(store) {
    if (!store.state.line_items.length) {
      store.commit("UPDATE_ITEMS_COUNT", 0);
    } else {
      const items = store.state.line_items.map((i) => parseInt(i.quantity));
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const count = items.reduce(reducer);
      store.commit("UPDATE_ITEMS_COUNT", count);
    }
    store.dispatch("saveCartInLocalStorage");
  },

  totalPrice(store) {
    if (!store.state.line_items.length) {
      store.commit("UPDATE_TOTAL_PRICE", 0);
    } else {
      const items = store.state.line_items.map((i) => parseFloat(i.price));
      const reducer = (accumulator, currentValue) =>
        rounded(accumulator + currentValue);
      const total = items.reduce(reducer);
      store.commit("UPDATE_TOTAL_PRICE", total);
    }
    store.dispatch("saveCartInLocalStorage");
  },

  addItem(store, CartItem) {
    store.commit("ADD_ITEM", CartItem);
    store.dispatch("totalPrice");
    store.dispatch("totalItemsCount");
    store.dispatch("saveCartInLocalStorage");
  },

  removeItem(store, id) {
    store.commit("REMOVE_ITEM", id);
    store.dispatch("totalPrice");
    store.dispatch("totalItemsCount");
    store.dispatch("saveCartInLocalStorage");
  },

  saveCartInLocalStorage(store) {
    store.commit("SAVE_CART");
  },

  initCart(store) {
    const savedCart = window.localStorage.getItem("CART");
    if (savedCart) {
      store.commit("INIT_CART", savedCart);
    }
  },
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
