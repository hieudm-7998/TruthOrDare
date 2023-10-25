import { createStore } from "vuex";

const store = createStore({
  state: {
    gameData: {
      players: [],
      limitTime: 10,
    },
  },
  mutations: {
    updateGameData(state, payload) {
      state.gameData = payload;
    },
  },
  actions: {
    updateGameData({ commit }, payload) {
      commit("updateGameData", payload);
    },
  },
  getters: {},
});

export default store;
