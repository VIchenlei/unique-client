interface Userinfo {
  name: string;
  deptID: number;
  roleID: number;
}

export default class DataStore {
  public username: string | null;
  public deptID: number | null;
  public roleID: number | null;

  constructor() {
    this.username = null;
    this.deptID = null;
    this.roleID = null;
  }

  public userinfoUpdate(user: Userinfo) {
    const {name, deptID, roleID} = user;
    this.username = name;
    this.deptID = deptID;
    this.roleID = roleID;
  }
}
