<template>
  <div>
    <h1>My order</h1>
    <Loader v-if="!order.id" />
    <div v-if="order.id" class="order">
      <div class="address">
        <input
          name="address"
          id="address"
          type="search"
          @input="handleSearch"
          placeholder="Enter your address"
        />

        <div
          class="option"
          v-for="option in options"
          :key="option"
          @click.self="handleAddress"
        >
          {{ option }}
        </div>
      </div>
      <div class="email">
        <span>Your email :</span> &nbsp; <span>{{ order.email }}</span>
      </div>
      <table>
        <thead>
          <th>Item</th>
          <th>Quantity</th>
          <th>Total item price</th>
        </thead>
        <tbody>
          <tr v-for="item in order.line_items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
          </tr>
          <tr>
            <td></td>
            <td class="total"><strong>Total items :</strong></td>
            <td class="total">{{ order.total_items }}</td>
          </tr>
          <tr>
            <td></td>
            <td class="total"><strong>Total price :</strong></td>
            <td class="total">{{ order.total_price }}</td>
          </tr>
        </tbody>
      </table>
      <Button v-if="address" :method="handleUpdate">Confirm Order</Button>
    </div>
  </div>
</template>

<script>
import API from "../services/API";
import Loader from "./Loader.vue";
import Button from "./Button.vue";
import { normalize } from "../services/functions";
import axios from "axios";

export default {
  components: { Loader, Button },
  name: "Order",

  data() {
    return {
      order: {},
      searchTerm: "",
      options: [],
      address: null,
    };
  },

  mounted() {
    API.get(`/orders/${this.$route.params.id}`)
      .then((res) => {
        this.order = res.data;
      })
      .catch((err) => {
        this.$router.push("/");
        this.$toast.warning("Order not found");
        console.error(err);
      });
  },

  methods: {
    handleSearch(e) {
      const value = normalize(e.target.value);
      axios
        .get(`https://api-adresse.data.gouv.fr/search/?q=${value}&limit=5`)
        .then((res) => {
          const options = res.data.features.map((f) => f.properties.label);
          this.options = options;
        })
        .catch((err) => console.error(err));
    },

    handleAddress(e) {
      this.address = e.target.innerText;
      const searchInput = document.getElementById("address");
      searchInput.value = e.target.innerText;
      this.searchTerm = "";
      this.options = [];
    },

    handleUpdate() {
      API.put(`/orders/${this.$route.params.id}`, {
        address: this.address,
      })
        .then(() => {
          this.$toast.success("Order updated successfully");
          this.$router.push("/");
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error("An error has occured during updating the order");
        });
    },
  },
};
</script>

<style lang="scss">
h1 {
  text-align: center;
}

table {
  width: 100%;
  margin: 24px auto;
}

.address {
  width: 80%;
  margin: 24px auto;
  text-align: center;
}

th,
td {
  border: 1px solid grey;
}

thead {
  background: #ffb800;
}

.email {
  color: black;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 24px auto;
}

.total {
  background: whitesmoke;
}

.address input {
  width: 100%;
  padding: 0.8rem 0.5rem;
  border-radius: 12px;
  border: none;
  background: white;
  border-bottom: 1px solid gray;
  outline-color: #ffb800;
  font-size: 1.1rem;
  font-weight: 300;
}

.option {
  padding: 16px 0;
  background: whitesmoke;
  border-top: 1px solid grey;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background: rgba(255, 184, 0, 0.5);
  }
}
@media screen and(min-width: 992px) {
  table {
    width: 80%;
  }

  .email {
    width: 80%;
  }

  .address {
    width: 80%;
  }
}
</style>
