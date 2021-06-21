<template>
  <div class="page-main">
    <div class="monitor">
      <div class="monitor-item">
        <span>井下人数：</span>
        <span class="font-span">{{sv.sNumber}}</span>
      </div>
      <div class="monitor-item">
        <span>井下车数：</span>
        <span class="font-span">{{sv.vNumber}}</span>
      </div>
    </div>
    <div class="page-panel">
      <div class="page-panel-body leader">
        <div class="leader-content">
          <div class="onduty-leader">
            <span class="title">井下带班领导</span>
            <div v-for="(item, index) in onDutyLeader" :key="index" class="page-panel-list">
              <span class="font-span">{{item.name}}：</span>
              <img :src="getImgUrl(item)" alt="">
            </div>
          </div>
          <div class="plan-leader">
            <!-- <span class="plan-leader-title">计划带班领导</span> -->
            <div v-for="(list, index) in planLeader" :key="index">
              <span class="title" v-if="list.rows.length > 0">{{ list.title }}</span>
              <div v-for="(row, idx) in list.rows" :key="idx" class="page-panel-list">
                <span class="font-span">{{row.name}}：</span>
                <img :src="getImgUrl(row)" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="leader-content1"></div>
      </div>
      <div class="page-panel-body dept-divide">
        <span class="title">人员按部门分布</span>
        <div class="page-lists">
          <div id="alarm-list">
            <div class="alarm-list-title">
              <span v-for="(label, index) in deptlabels" :key="index">
                  {{label}}
                </span>
            </div>
            <div class="list-content">
              <ul class="dept">
                <li v-for="(row, index) in deptRows" :key="index" class="list-dept">
                  <span>{{row[2]}}</span>
                  <span>{{row[1]}}</span>
                </li>
              </ul>
              <ul class="dept1"></ul>
            </div>
          </div>
        </div>
      </div>
      <div class="page-panel-body area-divide">
        <span class="title">人员按区域分布</span>
        <div class="page-lists">
          <div id="alarm-list">
            <div class="alarm-list-title">
              <span v-for="(label, index) in arealabels" :key="index">
                  {{label}}
                </span>
            </div>
            <div class="list-content">
              <ul class="area">
                <li v-for="(row, index) in areaRows" :key="index"  class="list-area">
                  <span>{{row[2]}}</span>
                  <!-- <span>{{row[3]}}</span> -->
                  <span>{{row[1]}}</span>
                </li>
              </ul>
              <ul class="area1"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({})
export default class PageMainAlarm extends Vue {
  public deptlabels: string [] = ['部门', '人数'];
  public arealabels: string [] = ['区域', '人数'];
  public rows: any = [];
  public sv: any = {};
  public leader: string = '';
  public deptRows: any = [];
  public areaRows: any = [];
  public timerOne: any = null;
  public timerTwo: any = null;
  public timerLearder: any = null;
  public timer: any = null;
  public onDutyLeader: string = '';
  public planLeader: string = '';

  public getImgUrl(row: any) {
    const pic = row.pic;
    return pic;
  }

  public getValue(value: string, row: any) {
    let text = row[value];
    if (value === 'cur_time') {
      text = text;
    }
    return text;
  }

  public resizeClientHeight() {
    const clientHeight = document.documentElement.clientHeight;
    const headerHeight: any = document.getElementsByClassName('monitor')[0].clientHeight;
    const panelTag: any = document.getElementsByClassName('page-panel')[0];
    const titleTag: any = document.getElementsByClassName('title')[0].clientHeight;
    const listTitleTag: any = document.getElementsByClassName('alarm-list-title')[0].clientHeight;
    const listTagOne: any = document.getElementsByClassName('list-content')[0];
    const listTagTwo: any = document.getElementsByClassName('list-content')[1];
    if (panelTag) {
      panelTag.style.height = `${clientHeight - headerHeight - 40}px`;
    }
    if (listTagOne) {
      listTagOne.style.height = `${clientHeight - headerHeight - titleTag - listTitleTag - 40}px`;
    }
    if (listTagTwo) {
      listTagTwo.style.height = `${clientHeight - headerHeight - titleTag - listTitleTag - 40}px`;
    }
  }

  public rollStart(tag: any) {
    if (tag.scrollTop + tag.clientHeight >= tag.scrollHeight) {
      tag.scrollTop = 0;
    } else {
      tag.scrollTop = tag.scrollTop + 20;
    }
  }

  public doRoll(tag: any, timer: any) {
    const t = 1000;
    const self = this;
    timer = setInterval(() => {
      self.rollStart(tag);
    }, t);
    return timer;
  }

  public checkDeptTag() {
    console.log('部门滚动');
    const liTag: any = document.getElementsByClassName('list-dept')[0];
    if (liTag) {
      const deptTag: any = document.getElementsByClassName('dept')[0];
      const tagOne: any = document.getElementsByClassName('list-content')[0];
      const deptTag1: any = document.getElementsByClassName('dept1')[0];
      if (deptTag.clientHeight > tagOne.clientHeight) {
        deptTag1.innerHTML = deptTag.innerHTML;
        this.timerOne = this.doRoll(tagOne, this.timerOne);
      } else {
        deptTag1.innerHTML = '';
        clearInterval(this.timerOne);
        this.timerOne = null;
      }
      if (!this.timer) {
        clearTimeout(this.timer);
      }
    } else {
      this.timer = setTimeout(this.checkDeptTag, 0);
    }
  }

  public checkAreaTag() {
    const liTag: any = document.getElementsByClassName('list-area')[0];
    if (liTag) {
      const areaTag: any = document.getElementsByClassName('area')[0];
      const tagTwo: any = document.getElementsByClassName('list-content')[1];
      const areaTag1: any = document.getElementsByClassName('area1')[0];
      if (areaTag.clientHeight > tagTwo.clientHeight) {
        areaTag1.innerHTML = areaTag.innerHTML;
        this.timerTwo = this.doRoll(tagTwo, this.timerTwo);
      } else {
        areaTag1.innerHTML = '';
        clearInterval(this.timerTwo);
        this.timerTwo = null;
      }
      if (!this.timer) {
        clearTimeout(this.timer);
      }
    } else {
      this.timer = setTimeout(this.checkAreaTag, 0);
    }
  }

  public checkLeaderTag() {
    const leaderTag: any = document.getElementsByClassName('leader-content')[0];
    if (leaderTag) {
      const tagOne: any = document.getElementsByClassName('leader')[0];
      const leaderTag1: any = document.getElementsByClassName('leader-content1')[0];
      if (leaderTag.clientHeight > tagOne.clientHeight) {
        leaderTag1.innerHTML = leaderTag.innerHTML;
        this.timerLearder = this.doRoll(tagOne, this.timerOne);
      } else {
        leaderTag1.innerHTML = '';
        clearInterval(this.timerLearder);
        this.timerLearder = null;
      }
      if (!this.timer) {
        clearTimeout(this.timer);
      }
    } else {
      this.timer = setTimeout(this.checkLeaderTag, 0);
    }
  }

  private mounted() {
    this.resizeClientHeight();
    window.addEventListener('resize', (e) => {
      this.resizeClientHeight();
      this.checkDeptTag();
      this.checkAreaTag();
      this.checkLeaderTag();
    });
    window.addEventListener('storage', (e) => {
      const svNumber: any = window.localStorage.getItem('svNumber');
      if (svNumber) {
        // clearInterval(this.timerOne);
        // clearInterval(this.timerTwo);
        this.sv =  JSON.parse(svNumber);
        this.deptRows = this.sv.sStat.dept;
        this.areaRows = this.sv.sStat.area;
        // this.checkDeptTag();
        // this.checkAreaTag();
      }

      const leaderArrange: any = window.localStorage.getItem('leaderArrange');
      if (leaderArrange) {
        this.leader = JSON.parse(leaderArrange);
        const leaderMine: any = this.leader;
        this.onDutyLeader = leaderMine.onDutyLeader;
        this.planLeader = leaderMine.planLeader;
        this.checkLeaderTag();
      }
    });
    const sStat: any = window.localStorage.getItem('svNumber');
    this.sv = Object.keys(this.sv).length > 0 ? this.sv : JSON.parse(sStat);
    this.deptRows = this.sv.sStat.dept;
    this.areaRows = this.sv.sStat.area;

    const leaders: any = window.localStorage.getItem('leaderArrange');
    this.leader = this.leader ? this.leader : JSON.parse(leaders);
    if (this.leader) {
      const leaderMine: any = this.leader;
      this.onDutyLeader = leaderMine.onDutyLeader;
      this.planLeader = leaderMine.planLeader;
    }

    this.checkDeptTag();
    this.checkAreaTag();
    this.checkLeaderTag();
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
  .monitor
    width: 100%
    display: flex
    justify-content: space-around
    align-items: center
    font-size: 0.42rem
    padding: 10px 0
    .monitor-item
      padding: 10px
      border: 1px solid #F0A03C
      border-radius: 3px
      margin-left: 5px
      display: flex
      align-items: center
      .font-span
        font-weight: 700
      img
        width: auto
        height: 160px
  .page-panel
    display: flex
    justify-content: space-around
    align-items: center
    font-size: 0.42rem
    margin-top: 10px
    .dept-divide
      width: 25%
    .area-divide
      width: 40%
    .page-panel-body
      height: 100%
      border: 1px solid #F0A03C
      box-shadow: 0 1px 6px 1px #F0A03C
      border-radius: 3px
      padding: .1rem
      overflow: hidden
      .title
        display: block
        text-align: center
      img
        width: auto
        height: 160px
      .page-panel-list
        padding: 10px
        border-radius: 3px
        margin-left: 5px
        display: flex
        align-items: center
        justify-content: space-around
        span
          width: 200px
          display: inline-block
      .page-lists
        padding: 0.1rem
        width: 100%
        box-sizing: border-box
        overflow: hidden
        #alarm-list
          width: 100%
          text-overflow: ellipsis
          white-space: nowrap
          text-align: center
          margin: 0
          border-collapse: collapse
          font-size: 0.24rem
          .alarm-list-title
            display: flex
            justify-content: space-around
            align-items: center
            color: #0099FF
            border: 1px solid #00498F
            height: 0.6rem
            span:nth-child(1)
              flex: 2
            span:nth-child(2)
              flex: 1
          .list-content
            overflow-y: auto
          .list-content::-webkit-scrollbar
            width: 0 !important
            height: 0 !important
            color: transparent !important
          ul
            width: 100%
            padding: 0
            margin: 0
            overflow: hidden
            li
              height: 0.7rem
              list-style: none
              display: flex
              justify-content: space-around
              align-items: center
              span
                text-overflow: ellipsis
                white-space: nowrap
                text-align: center
              span:nth-child(1)
                flex: 2
              span:nth-child(2)
                flex: 1
      .onduty-leader, .plan-leader
        border-bottom: 1px solid #09f
        .title
          border: 1px solid #00498F
    .leader
      width: 25%
      overflow: auto
    .leader::-webkit-scrollbar
      width: 0 !important
      height: 0 !important
      color: transparent !important
                
  </style>