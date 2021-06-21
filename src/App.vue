<template>
  <div id="app">
    <page-login v-if="!logined" @doLogined="loginedState"></page-login>
    <page-main v-if="logined"></page-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageLogin from '@/login/page-login.vue';
import PageMain from '@/main/page-main.vue';

@Component({
  components: {
    PageLogin,
    PageMain,
  },
})
export default class App extends Vue {
  public logined: boolean = false;

  public loginedState(state: boolean) {
    this.logined = state;
  }
}
</script>

<style lang="sass">
html, body
  font-size: 100px
html, body, #app
  margin: 0
  padding: 0
  width: 100%
  height: 100%
input, button
  border: none
  height: .3rem
input
  padding-left: .1rem
</style>
