<template>
  <div class="page-success">
    <div class="success-left">
      <img :src="getPic(showData.pic)" alt="">
      <p>
        <i></i>
        <span>{{dataIndex>2?"欢迎出井":"欢迎入井"}}</span>
      </p>
    </div>
    <div class="success-right">
      <div class="success-p-warp">
        <h3>{{showData.name}}</h3>
        <p v-for="(item, index) in list.labels" :key="index">
          <span>{{item}}：</span>
          <span>{{getValue(index)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class PageSuccess extends Vue {
  public list = {
    labels: ['部门', '卡号'],
    names: ['dname', 'card_id'],
  };
  public showData: any = {};
  @Prop() public dataIndex!: number;
  @Prop() public cdata: any;

  @Watch('cdata', { deep: true, immediate: true })
  public getShowData(oldVal: any, newVal: any) {
    this.showData = oldVal || {};
  }

  public getPic(pic: string) {
    return pic ? `/resource/staff/${pic}` : '../assets/artboard-success.png';
  }

  public getValue(index: number) {
    const name = this.list.names[index];
    let data = this.showData[this.list.names[index]];
    if (name === 'card_id') {
     data = parseInt(data.substring(3), 10);
    }
    return data;
  }
}
</script>
<style lang="sass" scoped>
.page-success
  // padding: 1rem
  width: 100%
  height: 85%
  box-sizing: border-box
  display: flex
  align-items: center
.success-left 
  flex: 0 0 2rem
  color: #09f
  text-align: center
  margin-left: 1rem
  img
    width: 1.5rem
    height: 1.5rem
    border-radius: 100%
  i
    display: inline-block
    width: .26rem
    height: .26rem
    background: url('../assets/icon-success.png') no-repeat center
    background-size: cover
    margin-right: .1rem
.success-right
  display: flex
  flex: auto
  box-sizing: border-box
  margin-right: 1rem
  img
    width: 1.5rem
    margin-right: .2rem
  .success-p-warp
    padding-left: 0.6rem
    h3
      font-size: .25rem
      margin: .1rem 0
    p
      font-size: .25rem
      white-space: nowrap
      margin: .1rem 0
</style>