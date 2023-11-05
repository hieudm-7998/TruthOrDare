import { createStore } from "vuex";

const store = createStore({
  state: {
    gameData: {
      players: [],
      limitTime: 10,
      currentPlayerIndex: 0,
      questions: [],
      currentQuestionIndex: 0,
      gameStarted: false,
    },
    redirectTarget: "",
  },
  mutations: {
    updateGamePlayers(state, payload) {
      state.gameData.players = payload;
    },
    updateGameLimitTime(state, payload) {
      state.gameData.limitTime = payload;
    },
    nextPlayer(state) {
      state.gameData.currentPlayerIndex =
        (state.gameData.currentPlayerIndex + 1) % state.gameData.players.length;
    },
    handleRedirectTarget(state, data) {
      state.redirectTarget = data;
    },
  },
  actions: {
    updateGamePlayers({ commit }, payload) {
      commit("updateGamePlayers", payload);
    },
    updateGameLimitTime({ commit }, payload) {
      commit("updateGameLimitTime", payload);
    },
    startGame({ commit }) {
      commit("nextPlayer");
      commit("gameStarted", true);
    },
    redirectTarget({ commit }, data) {
      commit("handleRedirectTarget", data);
    },
  },
  getters: {},
});

export default store;
