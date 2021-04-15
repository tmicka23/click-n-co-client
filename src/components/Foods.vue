<template>
  <section id="foods">
    <h2>Featured foods</h2>
    <Loader v-if="!foods.length" />
    <ul class="foods-list" v-if="foods.length">
      <Food v-for="food in foods" :key="food.id" :food="food"></Food>
    </ul>
  </section>
</template>

<script>
import Food from "./Food";
import Loader from "./Loader";
export default {
  components: { Food, Loader },
  name: "Foods",
  props: {
    foods: { type: Array },
  },
};
</script>

<style lang="scss">
.foods-list {
  width: 80%;
  margin: 2rem auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

#foods h2 {
  width: 100%;
  text-align: center;
}
</style>
