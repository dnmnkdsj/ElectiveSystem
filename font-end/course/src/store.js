import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const userKey = "user";

const searchHistory = store => {
  let user = localStorage.getItem(userKey);
  if (user) {
    user = JSON.parse(user);
    store.dispatch("login", user);
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    user: null,
    chatObject: null
  },
  mutations: {
    [LOGIN](state, payload) {
      const user = JSON.stringify(payload);
      localStorage.setItem(userKey, user);
      state.user = payload;
    },
    [LOGOUT](state) {
      state.user = null;
      localStorage.removeItem(userKey);
    }
  },
  actions: {
    login({ commit }, payload) {
      commit(LOGIN, payload);
    },
    logout({ commit }) {
      commit(LOGOUT);
    }
  },
  getters: {
    user: state => state.user
  },

  plugins: [searchHistory]
});
