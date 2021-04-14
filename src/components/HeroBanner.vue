<template>
  <div class="banner">
    <div class="banner-image">
      <img :src="bannerImage" alt="click'n'co" />
    </div>
    <h1 class="banner-text">
      Find your favorite foods from your favorite restaurants
    </h1>
  </div>
</template>

<script>
import bannerImage from "../assets/bannerImage.png";
export default {
  name: "HeroBanner",
  data() {
    return {
      bannerImage,
    };
  },
};
</script>

<style lang="scss">
.banner {
  width: 80%;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.banner-image img {
  max-width: 320px;
}
.banner-text {
  text-align: center;
}

@media screen and (min-width: 768px) {
  .banner {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .banner-text {
    width: 45%;
  }
  .banner-image img {
    max-width: none;
  }
}

@media screen and (min-width: 1024px) {
  .banner-text {
    width: 40%;
    text-align: end;
    font-size: 3rem;
    font-weight: 900;
  }
}
</style>
