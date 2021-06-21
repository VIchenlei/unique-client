interface Logintip {
  code: number;
  message?: string;
  msg?: string;
  data?: {
    name: string;
    roleID: number;
    deptID: number;
    sid: string;
  };
}

interface PushChannelData {
  cmd: string;
  code: number;
  msg: string;
  data: {
    staff_id: number;
    name: string;
    card_id: number;
    pic: string;
    dname: string;
    cards: number[];
    temperature: number;
    channel: number;
  };
}

export {Logintip, PushChannelData};
