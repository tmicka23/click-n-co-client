<template>
  <p class="loader">loading ...</p>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 80%;
  color: black;
  font-weight: 600;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: bright 1.5s infinite ease;
}

@keyframes bright {
  0% {
    color: black;
  }

  50% {
    color: darkgrey;
    letter-spacing: 3px;
  }

  100% {
    color: black;
  }
}
</style>
