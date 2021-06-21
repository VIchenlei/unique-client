<template>
  <div class="page-login">
    <div class="page-body">
      <div class="page-content">
        <div ref="username">
          <span class="text-label">用户名</span>
          <input type="text">
        </div>
        <div ref="userpwd">
          <span class="text-label">密码</span>
          <input type="password">
        </div>
        <div class="login-tip">{{message}}</div>
        <button @click="doLogin">登录</button>
      </div>
    </div>
    <div class="page-foot">
      <img src="../assets/logo.png" alt="永安信通">
      <span>©2017 永安信通</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {encrypt} from '@/ts/utils/utils';
import {Logintip} from '@/ts/utils/interfaceUtils';

@Component
export default class PageLogin extends Vue {
  public $refs!: {
    username: HTMLDivElement;
    userpwd: HTMLDivElement;
  };

  private message: string | undefined = '';

  public loginRes(msg: Logintip) {
    const {code, message} = msg;
    if (code === 0) {
      this.$emit('doLogined', true);
      window.open('index-admin.html');
      window.open('index-alarm.html');
      window.localStorage.removeItem('alarmData');
    } else {
      this.message = message;
    }
  }

  public doLogin() {
    const self = this;
    const usernameTag = this.$refs.username;
    const userpwdTag = this.$refs.userpwd;
    const user = (usernameTag.querySelector('input') as HTMLInputElement).value;
    const userpwd = (userpwdTag.querySelector('input') as HTMLInputElement).value;
    const pwd = encrypt(user, userpwd);
    if (!user || !pwd) {
      this.message = '请输入用户名和密码，再登陆';
    } else {
      const tips = window.user.users({
        cmd: 'LOGIN',
        data: {user, pwd},
        cb: self.loginRes,
      });
    }
  }
}
</script>
<style lang="sass" scoped>
.page-login
  width: 100%
  height: 100%
  background: url('../assets/bj@2x.jpg') no-repeat center center
  background-size: cover
  color: #fff
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  font-size: .2rem
  .page-body
    display: flex
    align-items: center
    flex: auto
  .page-content
    display: flex
    flex-direction: column
    align-items: center
    padding: .3rem .6rem
    background: rgba(0, 0, 0, .4)
    box-shadow: 0px 0px 50px 0px rgba(255, 255, 255, .2)
    &>div
      display: flex
      align-items: center
      .text-label
        text-align: justify
        display: inline-block
        width: .8rem
        height: .5rem
        line-height: .5rem
        margin-right: .2rem
        &::after
          display: inline-block
          width: 100%
          content: ''
          height: 0
    .login-tip
      color: #ff0000
    button
      width: 3rem
      margin-top: .2rem
      background: #09f
      color: #fff
      cursor: pointer
  .page-foot
    display: flex
    align-items: center
    flex: 0 0 1rem
    img
      width: 1.6rem
      height: auto
</style>