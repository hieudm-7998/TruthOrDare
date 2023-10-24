<template lang="">
  <button :class="variantClass" class="transition">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    variant: {
      type: String,
      default: "default",
    },
  },
  computed: {
    variantClass() {
      return {
        "primary-button": this.variant === "primary",
        "secondary-button": this.variant === "secondary",
        "my-button-success": this.variant === "success",
        "my-button-danger": this.variant === "danger",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  line-height: normal;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  box-shadow: 0 0.2em gray;
  text-shadow: -1px -1px black, 1px 1px white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    box-shadow: none;
    position: relative;
    top: 0.2em;
  }
}
.primary-button {
  background: salmon;
  color: white;
}
.secondary-button {
  background-color: lightgray;
  color: gray;
}
</style>
