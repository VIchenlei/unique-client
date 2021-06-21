import Vue from 'vue';
import Vuex from 'vuex';

import {PushChannelData} from '@/ts/utils/interfaceUtils';
import { getStat } from '@/ts/utils/utils';

Vue.use(Vuex);

interface StateInterface {
  channelData: any;
  alarmData: any;
  channelSuccess?: PushChannelData[];
  channelError?: PushChannelData[];
  socket: any;
  count: number;
  channelData1: PushChannelData | null;
  channelData2: PushChannelData | null;
  channelData3: PushChannelData | null;
  channelData4: PushChannelData | null;
  lowPowerAlarms: any;
  [propName: string]: any;
  svNumber: {
    sNumber: number,
    vNumber: number,
    sStat: any,
  };
  leaderArrange: any;
  meta: any;
}

const moduleState: StateInterface = {
  channelData: new Map(),
  alarmData: new Map(),
  socket: null,
  count: 0,
  channelData1: null,
  channelData2: null,
  channelData3: null,
  channelData4: null,
  svNumber: {
    sNumber: 0,
    vNumber: 0,
    sStat: [],
  },
  leaderArrange: {},
  lowPowerAlarms: [],
  meta: {},
};

export default new Vuex.Store({
  state: moduleState,
  mutations: {
    dealChannelData(state, channelData) {
      const { code, data } = channelData;
      const { channel } = data;
      if (code === 0) {
        state.channelData.set(channel, data);
      } else {
        state.channelData.delete(channel);
        state.alarmData.set(channel, data);
        window.localStorage.setItem('alarmData', JSON.stringify(Array.from(state.alarmData.values())));
      }
      state[`channelData${channel}`] = data;
    },
    // storeThis(msg) {
    //   window.xdata.socket = msg.socket;
    // },
    sendMsg(state, rows: any) {
      // window.localStorage.getItem('socket')
      const socket: any = window.opener.socket;
      rows.key = ++state.count;
      rows.username = window.xdata ? window.xdata.username : '';
      let ret = false;
      if (socket && socket.connected) {
        console.log('开门指令', rows);
        socket.emit('CHANNEL', rows);
        ret = true;
      } else {
        console.warn('Socket.js : The socket is disconnected.');
      }
    },
    removeAlarm(state, rows) {
      const {code, data} = rows;
      const {alarm_code, channel} = data;
      if ((code === -1 && alarm_code === 'open_dore_front') || (code === 0 && alarm_code === 'remove_light_alarm')) {
        state.alarmData.delete(channel);
        window.localStorage.setItem('alarmData', JSON.stringify(Array.from(state.alarmData.values())));
      }
    },
    posMap(state, rows) {
      const {code, data} = rows;
      if (code === 0 && data) {
        // const testData = [
        //   [6, 3, '安装二队'],
        //   [7, 4, '机电科'],
        //   [8, 3, '机运队'],
        //   [9, 3, '救护队'],
        //   [10, 3, '掘锚五队'],
        //   [11, 9, '掘锚四队'],
        //   [12, 6, '掘锚三队'],
        //   [13, 3, '掘锚二队'],
        //   [14, 1, '掘锚一队'],
        //   [15, 2, '生产技术科'],
        //   [16, 3, '地测科'],
        //   [17, 7, '通风队'],
        //   [18, 5, '维修车间'],
        //   [19, 9, '巷修队'],
        //   [20, 5, '中宇公司'],
        //   [21, 4, '车队'],
        //   [22, 3, '综采二队'],
        //   [23, 6, '综采一队'],
        //   [24, 3, '综掘二队'],
        //   [25, 1, '综掘一队'],
        //   [26, 3, '矿业'],
        //   [27, 2, '应急备用'],
        //   [28, 3, '华泰车队'],
        //   [29, 7, '硬化队'],
        //   [30, 3, '搬家公司'],
        //   [31, 6, 'QSHE赋能群'],
        //   [32, 3, '财务赋能群'],
        //   [33, 5, '公司领导'],
        //   [34, 8, '机电信息群'],
        //   [35, 7, '机电信息群-信息化'],
        //   [36, 3, '生产运行中心'],
        // ];
        state.svNumber.sNumber = data.sNumber;
        state.svNumber.vNumber = data.vNumber;
        data.sStat = getStat(data.sStat);
        state.svNumber.sStat = data.sStat;
        // data.sStat.dept = [...data.sStat.dept, ...testData];
        console.log(state.svNumber.sStat);
        window.localStorage.setItem('svNumber', JSON.stringify(data));
      }
    },
    leaderArrange(state, rows) {
      state.leaderArrange = {};
      const {code, data} = rows;
      if (code === 0 && data) {
        const onDutyLeader: any = [];
        const planLeader: any = [];
        const morningShift: any = [];
        const middleShift: any = [];
        const eveningShift: any = [];
        for (const row of data.names) {
          if (row.type === 1) {
            onDutyLeader.push(row);
          } else if (row.type === 2) {
            if (row.shift_id === 1) {
              morningShift.push(row);
            }
            if (row.shift_id === 2) {
              middleShift.push(row);
            }
            if (row.shift_id === 3) {
              eveningShift.push(row);
            }
          }
        }
        planLeader.push({title: '早班', rows: morningShift});
        planLeader.push({title: '中班', rows: middleShift});
        planLeader.push({title: '晚班', rows: eveningShift});
        state.leaderArrange = { onDutyLeader, planLeader };
        window.localStorage.setItem('leaderArrange', JSON.stringify(state.leaderArrange));
      }
    },
    dealUniqueAlarm(state, msg) {
      if (msg.code === 0) {
        const rows = msg.data.rows.filter((item: any) => !item.detail.includes(';') && item.name);
        state.lowPowerAlarms = rows;
      }
    },
    saveMetaDataAll(state, data) {
      console.log('res all', data);
      const rows: any = {};
      for (const key in data) {
        if (data[key]) {
          rows[key] = new Map(data[key]);
        }
      }
      state.meta = rows;
    },
    saveMetaData(state, res) {
      const name = res.data.name;
      const keyName = res.data.key;
      const rows = res.data.rows;
      const tmp = new Map();
      for (const row of rows) {
        const value = row[keyName];
        tmp.set(value, row);
      }
      state.meta[name] = tmp;
    },
  },
});
