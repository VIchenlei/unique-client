<template>
  <div id="app">
    <page-main-alarm></page-main-alarm>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PageMainAlarm from '@/main/page-main-alarm.vue';

@Component({
  components: {
    PageMainAlarm,
  },
})

export default class App extends Vue {
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
