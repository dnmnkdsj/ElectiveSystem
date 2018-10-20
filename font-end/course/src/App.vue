<template>
  <div id="app">
    <i-header />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./style/main";
</style>

<script>
import IHeader from './components/iHeader.vue';

export default {
  components: {
    IHeader,
  },


};
</script>
