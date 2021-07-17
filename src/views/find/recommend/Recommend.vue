<template>
  <div>
    <banner-box></banner-box>
    <recom-list></recom-list>
  </div>
</template>
<script>
import BannerBox from './BannerBox' // 轮播
import RecomList from './RecomList' // 推荐歌单
export default {
  data () {
    return {}
  },
  components: {
    BannerBox,
    RecomList
  },
  mounted () {
    // 判断是否有发现页数据，如果有，使用缓存数据，没有则请求数据
    if (this.$store.state.homeData === null) {
      this.$store.dispatch('getHomeData')
    } else {
      console.log('使用缓存')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
