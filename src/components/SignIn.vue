<template>
  <div class="loginBox">
    <form action="">
      <p>手机号：</p>
      <input type="text" placeholder="请输入手机号" v-model.number="phone" />
      <p>密码：</p>
      <input type="password" placeholder="请输入密码" v-model="password" />
      <div>
        <button type="button" @click="login">登录</button>
        <button type="button" @click="cancelLogin">取消</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    // 取消登录 ==> 关闭登录弹窗
    cancelLogin () {
      this.$store.commit('login', false)
    },
    // 登录
    login () {
      if (this.phone && this.password) {
        if (typeof this.phone === 'string') {
          alert('请检查手机号格式')
        } else {
          const _this = this
          const data = {
            phone: _this.phone,
            password: _this.password
          }
          this.$store.dispatch('getUserInfo', data)
        }
      } else {
        alert('请检查信息是否输入完整')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.loginBox {
  color: #ccc;
  width: 100%;
  height: 100%;
  background-color: rgba(170, 170, 170, 0.212);
  position: absolute;
  top: 0px;
  z-index: 99;
  form {
    width: 500px;
    height: 200px;
    background-color: #222;
    position: relative;
    top: 50%;
    margin-top: -150px;
    left: 50%;
    margin-left: -250px;
    border-radius: 10px;
    border: 1px solid #9f1b1b;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 9px #222;
    text-align: center;
    p {
      display: inline-block;
      width: 200px;
      height: 20px;
    }
    input {
      display: block;
      margin: auto;
      height: 30px;
      width: 200px;
      margin-bottom: 20px;
      border-radius: 5px;
      padding-left: 5px;
    }
    div {
      width: 200px;
      height: 50px;
      margin: auto;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        width: 70px;
        height: 30px;
        color: #222;
        border: none;
        cursor: pointer;
        &:nth-child(1) {
          background-color: #9f1b1b;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
