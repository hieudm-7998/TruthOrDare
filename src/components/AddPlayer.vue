<template>
  <div>
    <div class="mb-4 text-center">
      <h1 class="text-2xl" :style="{ color: currentColor }">Truth or Dare ?</h1>

      <p class="text-sm mb-6">
        by
        <a
          class="hover:underline"
          href="https://www.facebook.com/virgoccasionally/"
          target="_blank"
          >@virgoccasionally</a
        >
      </p>

      <h1 class="text-sm italic">
        "I made this
        <span class="line-through text-gray-400">while high as fuck</span> just
        because there are so many bullshit apps that we have to pay to use. Feel
        free to play up to 5 players, select the timer and let's start.<br />Happy
        drinking ! <span class="not-italic">🥂</span>"
      </h1>
    </div>

    <div class="mb-10">
      <h1 class="text-sm text-center mb-4" v-if="isNoPlayerError">
        Add at least 1 player !
      </h1>
      <div
        class="flex items-center gap-4 mb-4"
        v-for="(player, index) in players"
        :key="index"
      >
        <input
          class="block w-full p-2 border-radius rounded outline-none bg-gray-200 focus:bg-white transition"
          v-model="players[index]"
          :placeholder="`Player ${index + 1} name...`"
          ref="textInputs"
        />
        <Button @click="deletePlayer(index)" variant="secondary">-</Button>
      </div>
      <Button
        variant="secondary"
        @click="addMorePlayer"
        v-show="players.length < 5"
        class="mx-auto"
      >
        ADD PLAYER
      </Button>
    </div>

    <div class="mb-10">
      <h1 class="text-sm text-center mb-4">
        Select limit time to decide drink or not (lol)
      </h1>
      <select
        class="block mx-auto p-2 rounded outline-none appearance-none cursor-pointer"
        v-model="limitTime"
      >
        <option value="10">10s</option>
        <option value="15">15s</option>
        <option value="20">20s</option>
        <option value="25">25s</option>
        <option value="30">30s</option>
      </select>
    </div>

    <Button
      variant="primary"
      :style="{ backgroundColor: currentColor }"
      class="mx-auto"
      @click="openConfirmationModal"
      >START</Button
    >
    <Modal v-if="showConfirmationModal" @close="showConfirmationModal = false">
      <div>
        <h1>Total players: {{ players.length }}</h1>
        <h1 class="mb-6">Limit time : {{ limitTime }}s</h1>
        <div v-for="(player, index) in players" :key="index">
          {{ player }}
        </div>

        <h1 class="my-6">Are you guys ready ?</h1>

        <div class="flex items-center justify-center gap-4">
          <Button variant="secondary" @click="closeConfirmationModal"
            >Cancel</Button
          >
          <Button variant="primary" @click="updateStoreAndCloseModal"
            >START!</Button
          >
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Button from "@/components/common/Button.vue";
import Modal from "@/components/common/Modal.vue";
import router from "@/router";

export default {
  components: { Button, Modal },
  data() {
    return {
      players: [],
      limitTime: 10,
      colors: ["#FF5733", "#33FF57", "#5733FF"],
      currentIndex: 0,
      currentColor: "#FF5733",
      showConfirmationModal: false,
      isNoPlayerError: false,
    };
  },
  created() {
    setInterval(this.changeColor, 1000);
  },
  methods: {
    changeColor() {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      this.currentColor = this.colors[this.currentIndex];
    },
    addMorePlayer() {
      if (this.players.length < 5) {
        this.players = [...this.players, ""];
      }
    },
    deletePlayer(index) {
      this.players.splice(index, 1);
      this.players = [...this.players];
    },
    openConfirmationModal() {
      if (!this.isNoPlayerError) {
        this.showConfirmationModal = true;
      }
    },
    closeConfirmationModal() {
      this.showConfirmationModal = false;
    },
    async updateStoreAndCloseModal() {
      if (!this.isNoPlayerError) {
        await this.$store.dispatch("updateGamePlayers", this.players);
        await this.$store.dispatch("updateGameLimitTime", this.limitTime);
        this.closeConfirmationModal();
        router.push({
          name: "loading-screen",
          query: { target: "start-game" },
        });
      }
    },
  },
  watch: {
    players: {
      handler(newPlayers) {
        if (newPlayers.length === 0) {
          this.isNoPlayerError = true;
        } else {
          this.isNoPlayerError = false;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss">
input,
select {
  box-shadow: 0 0.2em gray;
}

select {
  text-shadow: -1px -1px black, 1px 1px white;
  background-color: lightgray;
  color: gray;
}
</style>
