<template>
  <nav>
    <div>
      <ul>
        <router-link tag="li" to="/home" active-class="selected"
          >发现音乐</router-link
        >
        <router-link tag="li" to="/privatefm" active-class="selected"
          >私人FM</router-link
        >
      </ul>
    </div>
    <div class="songsheetList" v-if="this.$store.state.userInfo.isLogin">
      <songsheet-list></songsheet-list>
    </div>
  </nav>
</template>
<script>
import SongsheetList from '@/components/SongsheetList.vue'
export default {
  data () {
    return {}
  },
  components: {
    SongsheetList
  }
}
</script>
<style lang="scss" scoped>
nav {
  width: 200px;
  height: auto;
  border-right: 1px solid #555;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #444;
    border-radius: 3px;
  }

  div:nth-child(1) > ul > li {
    display: block;
    height: 36px;
    width: 172px;
    line-height: 36px;
    margin-left: 15px;
    padding-left: 8px;
    margin-top: 5px;
    cursor: pointer;
    &:hover {
      background-color: #333;
      border-radius: 5px;
    }
  }
}
.selected {
  background-color: #333;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
</style>
