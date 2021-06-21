import Socket from './Socket';
import {Logintip} from './utils/interfaceUtils';

interface Loginmsg {
  user: string;
  pwd: string;
}

interface User {
  cmd: string;
  data: Loginmsg;
  cb: (data: Logintip) => Logintip;
}

interface USERMSG {
  code: number;
  msg?: string | undefined;
  data: {
    name: string;
    roleID: number;
    deptID: number;
    sid: string;
  };
}

export default class UserService {
  public sock: any;
  public logined: boolean;
  private name: string;
  private pwd: string | null;

  constructor(name: string = 'UNKONW') {
    this.name = name;
    this.pwd = null;
    this.sock = null;
    this.logined = false;
  }

  public users(msg: User) {
    const {cmd, data, cb} = msg;
    switch (cmd) {
      case 'LOGIN':
        return this.login(data, cb);
    }
  }

  public login(msg: Loginmsg, cb: (data: Logintip) => Logintip) {
    const {user, pwd} = msg;
    if (!this.sock) {
      this.sock = new Socket();
    }
    // window.store.commit('storeThis', this.sock); // 存储在socketStore中
    window.socket = this.sock.socket;
    // window.localStorage.setItem('socket', JSON.stringify(this.sock.socket));
    const reqMsg = {
      cmd: 'login',
      data: {
        user_name: user,
        user_pass: pwd,
      },
    };
    this.sock.socket.emit('USER', reqMsg, (data: USERMSG) => {
      cb(this.doLogin(data));
    });
  }

  private doLogin(res: USERMSG): Logintip {
    if (this.logined) {
      return {code: 0};
    }

    if (res) {
      const {code, data, msg} = res;
      if (code === 0) {
        const {name, roleID, deptID, sid} = data;
        const socket: any = this.sock.socket;
        socket.username = name;
        socket.sid = sid;

        const userinfo = {
          name,
          roleID,
          deptID,
        };
        window.xdata.userinfoUpdate(userinfo);
        this.logined = true;
        return {code: 0};
      } else {
        this.logined = false;
        return {code: -1, message: '用户名或密码错误'};
      }
    } else {
      console.warn('LOGIN: 系统错误');
      return {code: -1, message: '系统错误，请联系管理员'};
    }
  }
}
