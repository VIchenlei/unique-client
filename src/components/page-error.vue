<template>
  <div class="page-error">
    <div class="error-left">
      <img src="../assets/artboard-error.png">
      <div v-for="(list, index) in alarmTips" :key="index">
        <i></i>
        <span>{{list}}</span>
      </div>
    </div>
    <div class="error-right grey-scroll">
      <h5>{{title}}</h5>
      <div v-for="(list, index) in alarmList" :key="index">
        {{list}}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class PageError extends Vue {
  @Prop() public cdata: any;

  public alarmTips: string[] = [];
  public alarmList: string[] = [];

  public title: string = '检测到的异常';

  @Watch('cdata', { deep: true, immediate: true })
  public getShowData(newVal: any, oldVal: any) {
    if (newVal) {
      const list: string[] = [];
      const {
        msg,
        warnTemperature,
        abnormalTemperature,
        temperature,
        name,
        dname,
        cards,
        alcoholResult,
        alcoholStandard} = newVal;
      this.alarmTips = msg.split(';');
      if (cards instanceof Array) {
        for (const card of cards) {
          list.push(`${card.name}    ${card.dname}    ${card.card_id}`);
        }
      } else if (cards instanceof Object) {
        let showText = cards.card_id[0][0];
        if (warnTemperature === -1 && abnormalTemperature === -1) {
          showText = temperature;
        } else if (alcoholResult > alcoholStandard) {
          showText = `酒精浓度：${alcoholResult}`;
        }
        list.push(`${name}    ${dname}    ${showText}`);
      }
      this.alarmList = list;
    }
  }
}
</script>
<style lang="sass" scoped>
.page-error
  width: 100%
  height: 100%
  box-sizing: border-box
  display: flex
  align-items: center
.error-left 
  flex: 0 0 2rem
  color: #09f
  text-align: center
  font-size: 0.26rem
  margin-left: 1rem
  & > img
    width: 1.5rem
    height: 1.5rem
    border-radius: 100%
  & > div
    color: #F0A03C
    margin-top: 5px
    i
      display: inline-block
      width: .26rem
      height: .26rem
      background: url('../assets/icon-error.png') no-repeat center
      background-size: cover
      margin-right: .1rem
      vertical-align: middle
    span
      margin-left: 5px
.error-right
  display: flex
  flex: auto
  flex-direction: column
  align-items: center
  color: #F0A03C
  height: 100%
  overflow-y: auto
  overflow-x: hidden
  box-sizing: border-box
  padding-top: 0.5rem
  margin-right: 1rem
  h5
    margin: 0
    font-size: 0.2rem
  & > div
    width: 100%
    background-color: rgba(96,80,70, 0.7)
    border: 1px solid #F09F3C
    width: 5rem
    height: 0.5rem
    margin-top: 8px
    text-align: center
    line-height: 0.5rem
    font-size: 0.25rem
@media screen and (min-width:2160px)
  .error-right > div
    width: 8rem
</style>