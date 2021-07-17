<template>
  <!-- 发现页顶部导航栏 -->
  <div>
    <ul>
      <router-link tag="li" to="/home/recommend" active-class="active"
        >个性推荐</router-link
      >
      <router-link tag="li" to="/home/customers" active-class="active"
        >专属定制</router-link
      >
      <!-- <router-link tag="li" to="/home/musiclist" active-class="active"
        >歌单</router-link
      > -->
      <router-link tag="li" to="/home/rank" active-class="active"
        >排行榜</router-link
      >
      <router-link tag="li" to="/home/newmusic" active-class="active"
        >最近音乐</router-link
      >
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
div {
  height: 60px;
  width: 100%;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    list-style: none;
    justify-content: flex-start;
    align-items: center;
    li {
      width: 80px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
.active {
  box-sizing: border-box;
  border-bottom: 2px solid #ec4141;
  font-size: 16px;
  font-weight: bold;
}
</style>
