<template>
  <div class="container">
    <div class="mb-5">
      <h2 class="text-center text-xl">
        <span class="text-red-300">{{ currentPlayerName }}</span
        >'s turn !
      </h2>
    </div>
    <div v-if="!isPlayerSelect">
      <h1 class="text-center text-xl">Timer : {{ limitTime }}</h1>
    </div>
    <div class="py-10">
      <div
        class="flex items-center justify-center gap-4 mb-5"
        v-if="!isPlayerSelect"
      >
        <Button variant="primary" @click="selectTruth">Truth 😇</Button>
        <Button variant="secondary" @click="selectDare">Dare 😈</Button>
      </div>
      <p class="text-center italic text-gray-300">Pick a challenge.</p>
    </div>
    <div v-if="selectedQuestion">
      <p class="text-center text-pink-400 text-xl mb-5">
        {{ selectedQuestion }}
      </p>
      <div class="flex items-center justify-center gap-4">
        <Button variant="primary" @click="doOrDrink('do')">Do</Button>
        <Button variant="secondary" @click="doOrDrink('drink')">Drink</Button>
      </div>
    </div>
    <div v-if="playerDoOrDrink !== ''">
      <h1 class="text-center">
        <span class="text-red-300">{{ currentPlayerName }}</span>
        {{ playerDoOrDrink }}
      </h1>
    </div>
  </div>
</template>

<script>
import truthQuestions from "@/data/truth";
import dareQuestions from "@/data/dare";
import Button from "@/components/common/Button.vue";

export default {
  components: { Button },
  data() {
    return {
      selectedQuestion: null,
      usedQuestions: [],
      isPlayerSelect: false,
      limitTime: this.$store.state.gameData.limitTime,
      playerDoOrDrink: "",
      isCounting: null,
    };
  },
  computed: {
    currentPlayerName() {
      return this.$store.state.gameData.players[
        this.$store.state.gameData.currentPlayerIndex
      ];
    },
  },
  methods: {
    startCountdown() {
      this.isCounting = setInterval(() => {
        if (this.limitTime === 1) {
          clearInterval(this.isCounting);
          this.playerDoOrDrink = `Timeout ! Player ${this.currentPlayerName} have to drink !`;
        } else {
          this.limitTime -= 1;
        }
      }, 1000);
    },
    selectTruth() {
      this.selectQuestion(truthQuestions);
    },
    selectDare() {
      this.selectQuestion(dareQuestions);
    },
    resetLimitTime() {
      clearInterval(this.isCounting);
      this.limitTime = this.$store.state.gameData.limitTime;
    },
    selectQuestion(questionArray) {
      if (questionArray.length === 0) {
        this.selectedQuestion = "No questions available.";
      } else {
        const availableQuestions = questionArray.filter(
          (question) => !this.usedQuestions.includes(question)
        );
        if (availableQuestions.length === 0) {
          this.selectedQuestion = "No new questions available.";
        } else {
          const randomIndex = Math.floor(
            Math.random() * availableQuestions.length
          );
          const randomQuestion = availableQuestions[randomIndex];
          this.usedQuestions.push(randomQuestion);
          this.selectedQuestion = randomQuestion;
          this.playerDoOrDrink = "";
          this.startCountdown();
        }
      }
    },
    doOrDrink(choice) {
      if (choice === "do") {
        this.resetLimitTime();
        this.playerDoOrDrink = `choose to do the challenge !!!`;
      } else {
        this.resetLimitTime();
        this.playerDoOrDrink = `choose drink !!!`;
      }
    },
  },
};
</script>

<style></style>
