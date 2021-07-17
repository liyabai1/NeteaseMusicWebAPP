<template>
  <div class="scroll-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <p
          v-for="(item, index) in filterLrc(lrc)"
          :key="item.sec"
          class="scroll-item"
          :ref="'lrc' + index"
        >
          {{ item.txt }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'

BScroll.use(MouseWheel)
BScroll.use(ScrollBar)

export default {
  data () {
    return {}
  },
  component: {},
  props: {
    id: Number,
    lrc: {
      type: [Array, String]
    }
  },
  mounted () {
    console.log(this.$store.state.privatefm[0].lrcId)
    if (this.$store.state.privatefm[0].lrcId !== 0) {
      console.log('歌词渲染成功')
      this.bs = new BScroll('.scroll-wrapper', {
        probeType: 3,
        click: true,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },
        scrollbar: true
      })
      /**
       * des: 根据歌曲时间判断当前需要滚动到那个DOM 注意判断暂无歌词
       */
      // setTimeout(() => {
      //   console.log(this.$refs["lrc1"]);
      //   this.bs.scrollToElement(this.$refs["lrc1"][0], 300, true, true, undefined);
      // }, 2000);
    }
  },
  methods: {
    filterLrc (lrc) {
      if (lrc === '暂无歌词') {
        lrc = [{ sec: '0', txt: '暂无歌词' }]
      }
      return lrc
    }
  }
}
</script>
<style lang='scss' scoped>
.scroll-container {
  width: 100%;
  height: 100%;
  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative; /* 控制滚动条，必须 */
    .scroll-item {
      text-align: center;
      margin-bottom: 10px;
    }
  }
}
</style>
