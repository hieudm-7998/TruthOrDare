<template>
  <div class="w-screen h-screen">
    <div
      v-if="count > 0"
      :class="[
        'flex items-center justify-center w-full h-full text-white text-2xl',
        backgroundColorClass,
      ]"
    >
      {{ count }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 5,
      target: this.$route.query.target,
    };
  },
  computed: {
    backgroundColorClass() {
      switch (this.count) {
        case 5:
          return "bg-salmon";
        case 4:
          return "bg-red";
        case 3:
          return "bg-blue";
        case 2:
          return "bg-green";
        case 1:
          return "bg-purple";
        default:
          return "";
      }
    },
  },
  created() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const countdownInterval = setInterval(() => {
        if (this.count === 1) {
          clearInterval(countdownInterval);
          this.redirect();
        } else {
          this.count -= 1;
        }
      }, 1000);
    },
    redirect() {
      this.target
        ? this.$router.push(`/${this.target}`)
        : this.$router.push(`/`);
    },
  },
};
</script>
<style lang="scss">
.bg-salmon {
  background-color: salmon;
}
.bg-red {
  background-color: red;
}
.bg-blue {
  background-color: blue;
}
.bg-green {
  background-color: green;
}
.bg-purple {
  background-color: purple;
}
</style>
