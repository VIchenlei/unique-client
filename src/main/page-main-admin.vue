<template>
  <div class="page-main">
    <div class="show-page">
      <header>
        <div class="show-head">
          <i></i>
          <span>出入井信息操作</span>
        </div>
      </header>
      <div class="page-lists">
        <table>
          <thead>
            <tr>
              <th v-for="(label, index) in labels" :key="index">
                {{label}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="index">
              <td v-for="(value, j) in names" :key="j">
                <span class='grey-scroll'>{{getValue(value, row)}}</span>
              </td>
              <td>
                <button :data-channel="row.channel" @click="sendMsg">打开</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({})
export default class PageMainAdmin extends Vue {
  public labels: string [] = ['通道', '姓名', '部门', '卡号', '不能出入井原因', '操作'];
  public names: string [] = ['channel', 'name', 'dname', 'card_id', 'msg'];
  public rows: any = [];
  // public sv: any = {};
  // public leader: string = '';

  public getValue(value: string, row: any) {
    let text = row[value];
    if (row.msg.includes('携带多卡') && value === 'card_id') {
      if (row.cards instanceof Array) {
        const cards = [];
        for (const card of row.cards) {
          cards.push(card.card_id);
        }
        text = cards.join(';');
      } else if (row.cards instanceof Object) {
        text = row.cards.card_id;
      }
    }
    return text;
  }

  public sendMsg(evt: any) {
    const target = evt.currentTarget;
    const channel = target.getAttribute('data-channel');
    this.$store.commit('sendMsg', { cmd: 'open_channel', data: { channel: Number(channel) }});
  }

  private mounted() {
    window.addEventListener('storage', () => {
      // const svNumber: any = window.localStorage.getItem('svNumber');
      // if (svNumber) {
      //   this.sv =  JSON.parse(svNumber);
      // }
      // console.log('svNumber', svNumber);

      // const leaderArrange: any = window.localStorage.getItem('leaderArrange');
      // if (leaderArrange) {
      //   this.leader = leaderArrange;
      // }

      const alarmData: any = window.localStorage.getItem('alarmData');
      if (alarmData) {
        this.rows =  JSON.parse(alarmData);
      }
    });
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
  flex-wrap: wrap
  .show-page
    width: 100%
    height: 100%
    font-size: .24rem
    display: flex
    flex-direction: column
    header
      padding: .1rem
      display: flex
      flex: 0 0 .5rem
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
      padding: 0.3rem
      width: 100%
      height: 100%
      box-sizing: border-box
      overflow-x: hidden
      overflow-y: auto
      table
        width: 100%
        text-overflow: ellipsis
        white-space: nowrap
        text-align: center
        margin: 0
        border-collapse: collapse
        font-size: 0.24rem
        border: 1px solid #00498F
        thead tr
          color: #0099FF
          border-bottom: 1px solid #00498F
          height: 0.9rem
          th
            padding: 0 2px
        tbody
          tr 
            height: 0.8rem
            color: #FFFFFF
            border-bottom: 1px solid #00498F
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