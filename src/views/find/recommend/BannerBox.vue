<template>
  <div>
    <swiper :key="this.$store.state.bannerData.length">
      <li
        class="swiper-slide"
        v-for="items in this.$store.state.bannerData"
        :key="items.bannerId"
      >
        <img :src="items.pic + '?param=540y200'" alt="" />
      </li>
    </swiper>
  </div>
</template>
<script>
import swiper from '@/components/swiper.vue'
export default {
  data () {
    return {}
  },
  components: {
    swiper
  },
  filters: {
    filterbanner (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  width: 760px;
  height: 200px;
  margin: auto;
  overflow: hidden;
}
</style>
