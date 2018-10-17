import Vue from 'vue';
import Vuex from 'vuex';

import { storeKey, storeType } from './variable';

Vue.use(Vuex);

const searchHistory = (store) => {
  let user = localStorage.getItem(storeKey.userKey);
  const token = localStorage.getItem(storeKey.tokenKey);
  if (user && token) {
    user = JSON.parse(user);
    store.dispatch('login', { user, token });
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: null,
    courseState: -1,
    token: null,
  },
  mutations: {
    [storeType.LOGIN](state, { user, token }) {
      const userInfo = JSON.stringify(user);
      localStorage.setItem(storeKey.userKey, userInfo);
      localStorage.setItem(storeKey.tokenKey, token);
      state.user = user;
      state.token = token;
    },
    [storeType.LOGOUT](state) {
      state.user = null;
      localStorage.removeItem(storeKey.userKey);
      localStorage.removeItem(storeKey.tokenKey);
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
