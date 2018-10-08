import Vue from 'vue';
import Vuex from 'vuex';

import { storeKey, storeType } from './variable';

Vue.use(Vuex);

const searchHistory = (store) => {
  let user = localStorage.getItem(storeKey.userKey);
  if (user) {
    user = JSON.parse(user);
    store.dispatch('login', user);
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: null,
    chatObject: null,
  },
  mutations: {
    [storeType.LOGIN](state, payload) {
      const user = JSON.stringify(payload);
      localStorage.setItem(storeKey.userKey, user);
      state.user = payload;
    },
    [storeType.LOGOUT](state) {
      state.user = null;
      localStorage.removeItem(storeKey.userKey);
    },
  },
  actions: {
    login({ commit }, payload) {
      commit(storeType.LOGIN, payload);
    },
    logout({ commit }) {
      commit(storeType.LOGOUT);
    },
  },
  getters: {
    user: state => state.user,
  },

  plugins: [searchHistory],
});
