<template>
  <div class="page-main">
    <div class="alarm">
      <div class="show-page">
        <header class="show-header">
          <div class="show-head">
            <i></i>
            <span>低电量人员信息</span>
          </div>
        </header>
        <div class="page-lists">
          <table id="alarm-list">
            <thead>
              <tr>
                <th v-for="(label, index) in labels" :key="index">
                  {{label}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in lowPowerAlarms" :key="index">
                <td v-for="(value, j) in names" :key="j">
                  <span class='grey-scroll'>{{getData(value, row)}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="page-warp">
      <show-page class="page-list"
        v-for="(value, name) in pageList" 
        :key="name"
        :dataIndex="Number(name)"
        :dataValue="value">
      </show-page>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { PushChannelData } from '@/ts/utils/interfaceUtils';
import ShowPage from './show-page.vue';

@Component({
  components: {
    ShowPage,
  },
  computed: mapState({
    channelData1: (state: any) => state.channelData1,
    channelData2: (state: any) => state.channelData2,
    channelData3: (state: any) => state.channelData3,
    channelData4: (state: any) => state.channelData4,
    // sNumber: (state: any) => state.svNumber.sNumber,
    // vNumber: (state: any) => state.svNumber.vNumber,
    // leaderArrange: (state: any) => state.leaderArrange,
    lowPowerAlarms: (state: any) => state.lowPowerAlarms,
  }),
})
export default class PageMain extends Vue {
  public labels: string [] = ['卡号', '员工编号', '姓名', '通道', '部门', '详情', '告警时间'];
  public names: string [] = ['card_id', 'staff_id', 'name', 'channel', 'dname', 'detail', 'cur_time'];
  public rows: any = [];

  public pageList: any = {1: null, 2: null, 3: null, 4: null};

  public cdata1: any = null;
  public cdata2: any = null;
  public cdata3: any = null;
  public cdata4: any = null;

  @Watch('channelData1', { deep: true, immediate: true })
  public getChannelData1(newVal: any, oldVal: any) {
    console.log(newVal, oldVal);
    this.cdata1 = newVal;
    this.pageList[1] = newVal;
  }

  @Watch('channelData2', { deep: true, immediate: true  })
  public getChannelData2(newVal: any, oldVal: any) {
    this.cdata2 = newVal;
    this.pageList[2] = newVal;
  }

  @Watch('channelData3', { deep: true, immediate: true  })
  public getChannelData3(newVal: any, oldVal: any) {
    this.cdata3 = newVal;
    this.pageList[3] = newVal;
  }

  @Watch('channelData4', { deep: true, immediate: true  })
  public getChannelData4(newVal: any, oldVal: any) {
    this.cdata4 = newVal;
    this.pageList[4] = newVal;
  }

  public getValue(index: number) {
    switch (index) {
      case 1:
        return this.cdata1;
      case 2:
        return this.cdata2;
      case 3:
        return this.cdata3;
      case 4:
        return this.cdata4;
    }
  }

  public getData(value: string, row: any) {
    let text = row[value];
    if (value === 'cur_time') {
      text = text;
    } else if (value === 'card_id') {
      text = parseInt(text.substring(3), 10);
    }
    return text;
  }
}
</script>
<style lang="sass" scoped>
.page-main
  width: 100%
  height: 100%
  background: url('../assets/bj.png') no-repeat center
  background-size: cover
  color: #fff
  display: flex
  flex-direction: column
  .page-warp
    display: flex
    flex-wrap: wrap
    flex: 1
    .page-list
      box-sizing: border-box
      width: 50%
      height: 50%
      overflow: hidden
      &:nth-child(odd)
        border-right: 1px solid #09f
  .monitor
    display: flex
    justify-content: space-around
    align-items: center
    font-size: 0.42rem
    flex: 0 0 100px
    .monitor-item
      padding: 10px
      border: 1px solid #F0A03C
      .font-span
        font-weight: 700
  .alarm
    display: flex
    justify-content: space-around
    align-items: center
    font-size: 0.42rem
    flex: 0 0 300px
    .show-page
      width: 100%
      height: 100%
      font-size: .24rem
      display: flex
      flex-direction: column
      header
        padding: .1rem
        display: flex
        flex: 0 0 .2rem
        align-items: center
        justify-content: space-between
        background: rgba(0, 153, 255, .4)
      .show-head
        i
          display: inline-block
          width: .24rem
          height: .24rem
          background: url('../assets/group.png') no-repeat center
          margin-right: .1rem
      .page-lists
        padding: 0.1rem 0.3rem
        width: 100%
        box-sizing: border-box
        overflow: hidden
        height: 300px
        table
          width: 100%
          text-overflow: ellipsis
          white-space: nowrap
          text-align: center
          margin: 0
          border-collapse: collapse
          font-size: 0.24rem
          // border: 1px solid #00498F
          thead tr
            color: #0099FF
            border: 1px solid #00498F
            height: 0.42rem
            th
              padding: 0 2px
          tbody
            tr 
              height: 0.42rem
              color: #FFFFFF
              // border-bottom: 1px solid #00498F
              td
                padding: 0 2px
                button
                  width: 1.14rem
                  height: 0.4rem
                  background-color: rgba(0, 153, 255, 0.5)
                  border: 1px solid #0099ff
                  border-radius: 4px
                  &:hover,&:active
                    background-color: rgba(0, 153, 255)
              td:nth-child(4) span
                position: relative
                display: inline-block
                max-width: 6rem
                overflow: auto
                white-space: nowrap
</style>