<template>
  <div id="main">
    <div>
      <home-header></home-header>
      <div class="maincontainer">
        <sider-bar></sider-bar>
        <router-view
          class="routerView"
          :key="this.$store.state.path"
        ></router-view>
      </div>
      <music-player></music-player>
    </div>
    <sign-in v-if="this.$store.state.loginIng"></sign-in>
  </div>
</template>
<script>
// 顶部信息
import HomeHeader from './components/HomeHeader'
// 中间siderbar
import SiderBar from './components/SiderBar'
// 底部播放器
import MusicPlayer from './components/MusicPlayer.vue'

// 登录组件
import SignIn from './components/SignIn'

export default {
  data () {
    return {
      logining: false
    }
  },
  components: {
    HomeHeader,
    SiderBar,
    MusicPlayer,
    SignIn
  },
  mounted () {}
}
</script>
<style scoped>
#main {
  height: 670px;
  width: 1022px;
  background-color: #2b2b2b;
  margin: auto;
  border-radius: 5px;
  overflow: hidden;
  color: #ccc;
  position: relative;
  top: 50px;
}
#main > div {
  height: 670px;
  width: 1022px;
  display: flex;
  flex-direction: column;
}
.maincontainer {
  flex: 1;
  display: flex;
  overflow: auto;
}
.routerView {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
<style>
* {
  margin: 0px;
  padding: 0px;
}
</style>
