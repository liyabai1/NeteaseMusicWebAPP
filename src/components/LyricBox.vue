<template>
  <div class="scroll-container">
    <div class="scroll-wrapper" ref="scroll">
      <div
        class="scroll-content"
        ref="lrcBox"
        :key="this.$store.state.FMAudio.playingId"
      >
        <p v-for="item in filterLrc(lrc)" :key="item.sec" class="scroll-item">
          {{ item.txt }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import ScrollBar from "@better-scroll/scroll-bar";

BScroll.use(MouseWheel);
BScroll.use(ScrollBar);

export default {
  data() {
    return {
      lrcTime: null,
    };
  },
  component: {},
  props: {
    id: Number,
    lrc: {
      type: [Array, String],
    },
  },
  mounted() {
    console.log(this.$store.state.privatefm[0].lrcId);
    if (this.$store.state.privatefm[0].lrcId !== 0) {
      this.bs = new BScroll(".scroll-wrapper", {
        probeType: 3,
        click: true,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300,
        },
        scrollbar: true,
      });
    }

    // 正在播放，歌词滚动
    this.$store.state.FMAudio.audio.ontimeupdate = this.goLrc;

    // 设置私人FM播放结束的动作
    var _this = this;
    this.$store.state.FMAudio.audio.onended = this.FMnext;
  },
  methods: {
    filterLrc(lrc) {
      if (lrc === "暂无歌词") {
        lrc = [{ sec: "0", txt: "暂无歌词" }];
      }
      return lrc;
    },
    // 歌词滚动
    goLrc() {
      console.log("zhengzaibofang")
      let currentTime = this.$store.state.FMAudio.getCurrentTime();
      let lrcBox = this.$refs.lrcBox;
      let lrcArr = this.$store.state.privatefm[0].lrc;

      // 改变字体颜色
      [...lrcBox.children].forEach((item) => {
        item.style.color = "#535356";
      });

      // 获取当前已经有多少歌词被播放了，将最后播放的那句歌词显示出来
      let filterLrc = lrcArr.filter((item) => currentTime >= item.sec);
      let index = filterLrc.length;

      lrcBox.children[index-1].style.color = "#ccc";

      this.bs.scrollToElement(
        lrcBox.children[index-1],
        300,
        true,
        true,
        undefined
      );
    },

    // 下一曲
    FMnext() {
      console.log("播放完了");
      this.$store.dispatch("nextFM");
    },
  },
  computed: {
    fmplaying: function () {
      return this.$store.state.FMAudio.playing;
    },
  },
  watch: {},
};
</script>
<style lang='scss' scoped>
.scroll-container {
  width: 100%;
  height: 100%;
  color: #535356;
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
