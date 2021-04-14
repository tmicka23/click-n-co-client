<template>
  <button class="button" @click="method">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    method: { type: Function },
  },
};
</script>

<style lang="scss" scoped>
$bg-color: #ffb800;
.button {
  width: 100%;
  border: none;
  border-radius: 25px;
  padding: 0.6rem 15px;
  margin: 1rem 0;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.25);
  background: $bg-color;
  color: black;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    background: lighten($bg-color, 12);
  }
}
</style>
