import Vue from 'vue';
import App from './App-alarm.vue';
import UserService from './ts/UserService';
import DataStore from './ts/store/DataStore';
import store from './ts/store/store';
import './style/basic.sass';
// 声明全局变量
declare global {
  interface Window {
    user: any;
    xdata: any;
    store: any;
    socket: any;
  }
}

Vue.config.productionTip = false;
window.user = new UserService();
window.xdata = new DataStore();
window.store = store;
new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
