<template>
  <div class="container py-5">
    <h2 class="text-center text-red-500 text-2xl">Game finished !</h2>
    <p class="text-center mb-10">Here's all players statistic.</p>
    <div
      v-for="(playerStats, index) in playerStatistics"
      :key="index"
      class="text-center mb-5 p-4 rounded hover:bg-slate-100 border-[1px] border-black border-solid"
    >
      <h3 class="mb-4">
        Player: <span class="salmon">{{ playerStats.playerName }}</span>
      </h3>
      <p class="text-xs">
        Truths:
        <span class="text-red-500">{{ playerStats.truths }}</span> times.
      </p>
      <p class="text-xs">
        Dares: <span class="text-red-500">{{ playerStats.dares }}</span> times.
      </p>
      <p class="text-xs">
        Drinks:
        <span class="text-red-500">{{ playerStats.drinks }}</span> shots.
      </p>
    </div>
    <h2 class="text-center">Thanks for playing ! ;)</h2>
  </div>
</template>

<script>
export default {
  computed: {
    playerStatistics() {
      return this.$store.state.gameData.playerStatistics;
    },
  },
};
</script>

<style scoped>
.salmon {
  color: salmon;
}
</style>
