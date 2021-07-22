<template>
  <div>
    <nav ref="nav">
      <span class="clicked" @click="getSong(0, $event)">全部</span>
      <span @click="getSong(7, $event)">华语</span>
      <span @click="getSong(96, $event)">欧美</span>
      <span @click="getSong(8, $event)">日本</span>
      <span @click="getSong(16, $event)">韩国</span>
    </nav>
    <newmusic-list :listType="type" :key="type"></newmusic-list>
  </div>
</template>
<script>
import NewmusicList from "./NewmusicList.vue";
export default {
  data() {
    return {
      type: 0,
    };
  },
  components: {
    NewmusicList,
  },
  methods: {
    getSong(type, event) {
      // 改变样式
      let navBtns = this.$refs.nav.children;
      [...navBtns].map((item) => {
        item.classList.remove("clicked");
      });
      event.currentTarget.classList.add("clicked");
      this.type = type;
    },
  },
};
</script>
<style lang="scss" scoped>
nav {
  width: 100%;
  margin-bottom: 20px;
  span {
    display: inline-block;
    width: 60px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    font-size: 12px;
    color: #878787;
    &:hover {
      color: #ccc;
    }
  }
}
.clicked {
  color: #ccc;
  font-size: 15px;
}
</style>
