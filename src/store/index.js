import { createStore } from "vuex";

const store = createStore({
  state: {
    players: [],
  },
  mutations: {
    setPlayers(state, players) {
      state.players = players;
    },
  },
  actions: {
    addPlayers({ commit }, players) {
      commit("setPlayers", players);
    },
  },
  getters: {},
});

export default store;
