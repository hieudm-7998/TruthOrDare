<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <slot></slot>
      <div class="flex items-center justify-center gap-4">
        <Button variant="secondary" @click="cancel">GO BACK</Button>
        <Button variant="primary" @click="confirm">LET'S GO !!!</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  components: { Button },
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    cancel() {
      this.showModal = false;
      this.$emit("close");
    },
    confirm() {
      this.showModal = false;
      this.$emit("confirmed");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  max-width: 620px;
  width: 90%;
  text-align: center;
  position: relative;
}
</style>
