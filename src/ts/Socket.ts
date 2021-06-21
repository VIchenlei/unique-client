import io from 'socket.io-client';

const url: string = 'localhost:9000';
// const url: string = window.location.host;

import {
  toJson,
} from './utils/utils';

const connectionOpts: any = {
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
};

export default class Socket {
  public socket: any;
  constructor() {
    this.socket = io(url, connectionOpts);
    this.registerSocketEventHandlers();
  }

  public getConnection(timeout: number): any {
    const self = this;
    return new Promise((resolve: any, reject: any) => {
      if (self.socket && self.socket.connected) {
        console.log('Socket.getConnection: Aready connected.');
        resolve(self.socket);
      } else {
        console.log('Socket.getConnection: Socket do NOT connect.');
      }

      let timer: any = setTimeout(() => {
        timer = null;
        error('Socket.getConnection: local timeout.');
      }, timeout);

      function error(data: string): void {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        reject(data);
      }

      self.socket.on('connect', (): void => {
        clearTimeout(timer);
        resolve(self.socket);
      });

      // errors
      self.socket.on('connect_error', error);
      self.socket.on('connect_timeout', error);
      self.socket.on('error', error);
      self.socket.on('disconnect', (err: any): void => {
        console.log(err);
      });

      self.socket.connect();
    });
  }

  public registerSocketEventHandlers() {
    this.socket.on('connect', () => {
      console.log('Socket connected');
      window.socket = self.socket;
    });
    // Fired upon an attempt to reconnect.
    this.socket.on('reconnecting', (num: number) => {
      console.log('Trying to reconnect to the server... ', num);
    });

    // Fired upon a successful reconnection.
    this.socket.on('reconnect', (num: number) => {
      console.log('Reconnect succeed : ', num);
    });

    // Fired upon a connection error
    this.socket.on('error', (error: string) => {
      console.warn('Connection error : ', error);
    });

    // 数据不做缓存 登录后server端往前端推送全部的基础数据。20m推一次增量基础数据，用于更新。
    this.socket.on('META', (res: any) => {
      const cmd = res.cmd;
      switch (cmd) {
        case 'meta_data':
          console.log('res拉取数据', res);
          window.store.commit('saveMetaData', res);
          break;
        case 'meta_data_all':
          window.store.commit('saveMetaDataAll', res.data);
          break;
        default:
          console.warn(`未知的 META 指令：cmd = ${cmd}`);
          break;
      }
    });

    // PUSH
    this.socket.on('PUSH', (res: any) => {
      const resData = toJson(res);
      if (!resData) { return console.warn('PUSH null message.'); }
      const {cmd} = resData;

      // console.log(cmd, resData);

      switch (cmd) {
        case 'channel_data':
          window.store.commit('dealChannelData', resData);
          break;
        case 'alarm_msg':
          window.store.commit('removeAlarm', resData);
          break;
        case 'pos_map':
          window.store.commit('posMap', resData);
          break;
        case 'leader_arrange':
          window.store.commit('leaderArrange', resData);
          break;
        case 'unique_alarm_msg': // 检测通道低电量告警
          // console.log('检测通道低电量告警', res);
          window.store.commit('dealUniqueAlarm', resData);
          break;
        default:
          console.warn(`未知的 PUSH 消息指令：cmd = ${cmd}`);
          break;
      }
    });
  }
}
