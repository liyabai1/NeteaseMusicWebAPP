<template>
  <div class="headerBox">
    <h1>
      <img src="../../public/null.png" alt="Hi！" />
      <span></span>
    </h1>
    <div class="navBotton">
      <i class="iconfont" @click="pageBack()">&#xe63a;</i>
      <i class="iconfont" @click="pageForward()">&#xe639;</i>
    </div>
    <div class="searchBox">
      <i class="iconfont">&#xe627;</i>
      <input
        type="text"
        value=""
        placeholder="搜索"
        v-model="searchKeyWords"
        @keyup="inputWords"
      />
    </div>
    <div class="loginBox">
      <div>
        <i class="iconfont" v-if="!this.$store.state.userInfo.isLogin"
          >&#xe65f;</i
        >
        <img :src="this.$store.state.userInfo.profile.avatarUrl" v-else />
        <span @click="signin">{{
          this.$store.state.userInfo.profile.nickname
        }}</span>
      </div>
      <div>
        <i class="iconfont">&#xe7c0;</i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        name: "未登录登录登录",
        isLogin: false,
      },
      searchKeyWords: "",
    };
  },
  methods: {
    // 弹出登录框
    signin() {
      this.$store.commit("login", true);
    },
    // 检测用户是否输入了回车键
    inputWords(data) {
      if (data.keyCode === 13) {
        // 点击了回车
        if (!this.searchKeyWords) {
          alert("请输入搜索关键字");
        } else {
          this.$store.commit("changePage", this.searchKeyWords);
          this.$router.push({
            name: "search",
            params: { keywords: this.searchKeyWords },
          });
        }
      }
    },
    pageBack() {
      window.history.back();
    },
    pageForward() {
      window.history.forward();
    },
  },
};
</script>
<style lang="scss" scoped>
.headerBox {
  width: 100%;
  height: 60px;
  border-bottom: 2px #9f1b1b solid;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #222225;
}
h1 {
  width: 203px;
  height: 50px;
}
h1 > img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.navBotton {
  width: 70px;
  margin-left: 25px;
  i {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #999;
    margin: 5px;
    cursor: pointer;
    &:hover{
      color: red;
    }
  }
}
.searchBox {
  margin-left: 5px;
  background-color: #29292c;
  height: 34px;
  width: 163px;
  border-radius: 17px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  i {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    color: #eee;
  }
  input {
    width: 120px;
    height: 34px;
    border: none;
    background-color: #29292c;
    outline: none;
    color: #535356;
  }
}
.loginBox {
  width: 300px;
  height: 50px;
  margin-left: 100px;
  line-height: 50px;
  display: flex;
  color: #aaa;
  div:nth-child(1) {
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    i,
    img {
      font-size: 30px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
    i {
      align-self: flex-start;
    }
    span {
      width: 150px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span:hover {
      cursor: pointer;
      color: #eee;
    }
  }
  div:nth-child(2) {
    i:hover {
      cursor: pointer;
      color: #eee;
    }
  }
}
</style>
