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
    <div>
      <!-- <h1 class="text-center text-xl">Turn : {{ selectQuestion.length }}</h1> -->
    </div>
    <div class="py-10" v-if="!isPlayerSelect && canSelectOption">
      <div class="flex items-center justify-center gap-4 mb-5">
        <Button variant="primary" @click="selectTruth">Truth 😇</Button>
        <Button variant="secondary" @click="selectDare">Dare 😈</Button>
      </div>
      <p v-if="isPlayerSelect" class="text-center italic text-gray-300">
        Pick a challenge.
      </p>
    </div>
    <div v-if="selectedQuestion">
      <p class="text-center question my-5">
        {{ selectedQuestion }}
      </p>
      <div
        class="flex items-center justify-center gap-4 mb-5"
        v-if="canSelectAction && !isTurnFinished"
      >
        <Button variant="primary" @click="doOrDrink('do')">Do</Button>
        <Button variant="secondary" @click="doOrDrink('drink')">Drink</Button>
      </div>
    </div>
    <div v-if="playerDoOrDrink !== ''">
      <h1 class="text-center" v-html="playerDoOrDrink"></h1>
    </div>
    <div
      v-if="isTurnFinished"
      class="flex items-center justify-center mt-5 gap-4"
    >
      <Button variant="secondary" @click="nextPlayer">Next player</Button>
      <Button variant="primary">End game</Button>
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
      selectedOption: null,
      canSelectOption: true,
      selectedAction: null,
      canSelectAction: true,
      usedQuestions: [],
      isPlayerSelect: false,
      limitTime: this.$store.state.gameData.limitTime,
      playerDoOrDrink: "",
      isCounting: null,
      isTurnFinished: false,
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
          this.playerDoOrDrink = `Timeout ! Player <span style="color: salmon;">${this.currentPlayerName}</span> have to drink !`;
          this.isTurnFinished = true;
          this.canSelectOption = false;
          this.canSelectAction = false;
        } else {
          this.limitTime -= 1;
        }
      }, 1000);
    },
    selectTruth() {
      if (this.canSelectOption && this.selectedOption === null) {
        this.selectedOption = "truth";
        this.selectQuestion(truthQuestions);
        this.canSelectOption = false;
      }
    },
    selectDare() {
      if (this.canSelectOption && this.selectedOption === null) {
        this.selectedOption = "dare";
        this.selectQuestion(dareQuestions);
        this.canSelectOption = false;
      }
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
          this.isTurnFinished = true;
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
      if (this.canSelectAction && this.selectedAction === null) {
        if (choice === "do") {
          this.selectedAction = "do";
          this.resetLimitTime();
          this.playerDoOrDrink = `<span style="color: salmon;">${this.currentPlayerName}</span> choose to do the challenge !!!`;
          this.isTurnFinished = true;
        } else {
          this.selectedAction = "drink";
          this.resetLimitTime();
          this.playerDoOrDrink = `<span style="color: salmon;">${this.currentPlayerName}</span> choose drink !!!`;
          this.isTurnFinished = true;
        }
        this.canSelectAction = false;
      }
    },
    nextPlayer() {
      this.$store.commit("nextPlayer");

      this.selectedOption = null;
      this.canSelectOption = true;
      this.selectedAction = null;
      this.canSelectAction = true;
      this.isPlayerSelect = false;
      this.isTurnFinished = false;
      this.playerDoOrDrink = "";
      this.selectedQuestion = null;
    },
  },
};
</script>

<style lang="scss">
.question {
  color: green;
  font-size: 1.7rem;
}
</style>
