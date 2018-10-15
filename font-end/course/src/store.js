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
    courseState: -1,
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
    [storeType.CHANGE_STATE](state, newState) {
      state.courseState = newState;
    },
  },
  actions: {
    login({ commit }, payload) {
      commit(storeType.LOGIN, payload);
    },
    logout({ commit }) {
      commit(storeType.LOGOUT);
    },
    changeState({ commit }, newState) {
      commit(storeType.CHANGE_STATE, newState);
    },
  },
  getters: {
    user: state => state.user,
    courseState: state => state.courseState,
  },

  plugins: [searchHistory],
});
