import {Md5} from 'ts-md5/dist/md5';

function encrypt(username: string, userpwd: string): string {
  const value = `${username}-${userpwd}`;
  const start = 5;
  const end = 16;
  return Md5.hashStr(value).toString().slice(start, end);
}


function toJson(data: any): any {
  if (typeof data === 'object') {
    return data;
  }
  let ret = null;
  if (data && (typeof data === 'string')) {
    try {
      ret = JSON.parse(data);
    } catch (error) {
      console.warn('Can NOT parse the input data to be JSON : ', data);
    }
  } else {
    console.warn('The input data\'s type is NOT string : ', data);
  }
  return ret;
}

function getStat(sStat: any): any {
  sStat.area = addName(sStat.area, 'area');
  sStat.dept = addName(sStat.dept, 'dept');
  return sStat;
}

function addName(data: any, type: string): any {
  data.forEach((item: any) => {
    const name = window.store.state.meta[type].get(item[0]).name;
    item.push(name);
    if (type === 'area') {
      const area = window.store.state.meta[type].get(item[0]);
      const mapName = window.store.state.meta.map.get(area.map_id).name;
      item.push(mapName);
    }
  });
  return data;
}

export {encrypt, toJson, getStat};
