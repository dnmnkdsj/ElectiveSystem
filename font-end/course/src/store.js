import Vue from 'vue';
import Vuex from 'vuex';
import * as Cookies from 'js-cookie';
import { storeKey, storeType } from './variable';

Vue.use(Vuex);

const searchHistory = (store) => {
  let user = localStorage.getItem(storeKey.userKey);
  let hasLogin = !!Cookies.get('Authorization');
  hasLogin = true; // TODO: test
  if (hasLogin && user) {
    user = JSON.parse(user);
    store.dispatch('login', user);
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: null,
    timeData: null,
    courseState: -1,
  },
  mutations: {
    [storeType.LOGIN](state, user) {
      const userInfo = JSON.stringify(user);
      localStorage.setItem(storeKey.userKey, userInfo);
      state.user = user;
    },
    [storeType.LOGOUT](state) {
      state.user = null;
      localStorage.removeItem(storeKey.userKey);
    },
    [storeType.CHANGE_STATE](state, { courseState, timeData }) {
      state.courseState = courseState;
      state.timeData = timeData;
    },
  },
  actions: {
    login({ commit }, payload) {
      commit(storeType.LOGIN, payload);
    },
    logout({ commit }) {
      commit(storeType.LOGOUT);
    },
    changeState({ commit }, payload) {
      commit(storeType.CHANGE_STATE, payload);
    },
  },
  getters: {
    user: state => state.user,
    courseState: state => state.courseState,
    timeData: state => state.timeData,
  },

  plugins: [searchHistory],
});
