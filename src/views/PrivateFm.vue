<template>
  <div class="privaFmBox" :key="this.$store.state.privatefm[0].id">
    <div class="ablumImgBox">
      <div class="fmPlayingBtn">
        <i v-if="fmplaying" class="iconfont" @click="FMPause()">&#xe633;</i>
        <i v-else class="iconfont" @click="FMPlaying()">&#xe601;</i>
      </div>
      <img
        :src="this.$store.state.privatefm[0].album.picUrl + '?param=300y300'"
      />
      <div class="btns">
        <!-- <i class="iconfont">&#xe631;</i> -->
        <i class="iconfont" @click="next()">&#xe62c;</i>
      </div>
    </div>
    <div class="lyricBox">
      <div class="songInfoBox">
        <h3>{{ this.$store.state.privatefm[0].name }}</h3>
        <p>
          <span>专辑：</span>
          <span>{{ this.$store.state.privatefm[0].album.name }}</span>
        </p>
        <p>
          <span>歌手：</span>
          <span>{{ this.$store.state.privatefm[0].artists[0].name }}</span>
        </p>
      </div>
      <div class="topLine"></div>
      <div class="lycContainer" :key="this.$store.state.privatefm[0].length">
        <lrc-box
          :key="this.$store.state.privatefm[0].lrcId"
          :id="this.$store.state.privatefm[0].id"
          :lrc="this.$store.state.privatefm[0].lrc"
        ></lrc-box>
      </div>
      <div class="bottomLine"></div>
    </div>
  </div>
</template>
<script>
import LrcBox from "@/components/LyricBox.vue";
export default {
  data() {
    return {};
  },
  components: {
    LrcBox,
  },
  mounted() {
    // 判断用户是否登录
    console.log(this.$store.state.privatefm[0].id);
    if (!this.$store.state.userInfo.isLogin) {
      alert("请先登录！");
      this.$store.state.loginIng = true;
    } else if (this.$store.state.privatefm[0].id === 0) {
      // 当重新回到私人FM页面时，ID为0表示第一次进入私人FM，需要进行搜索
      this.$store.dispatch("getFmdata");
    }
  },
  methods: {
    // 播放私人FM
    FMPlaying() {
      // 播放私人FM歌曲数组的第一个
      this.$store.commit("playFMAudioMut");
    },
    // 暂停FM
    FMPause() {
      this.$store.commit("pauseFMAudioMut");
    },
    // 下一曲
    next() {
      this.$store.dispatch("nextFM");
    },
  },
  computed: {
    prifmdata() {
      return this.$store.state.userInfo.isLogin;
    },
    fmplaying() {
      return this.$store.state.FMAudio.playing;
    },
  },
  watch: {
    prifmdata: function (newV) {
      if (newV) {
        this.$store.dispatch("getFmdata");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.privaFmBox {
  display: flex;
  align-items: center;
  .ablumImgBox {
    width: 390px;
    height: 370px;
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    position: relative;
    .fmPlayingBtn {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 230px;
      right: 20px;
      i {
        width: 50px;
        height: 50px;
        font-size: 45px;
        color: #fd4b4b;
        cursor: pointer;
      }
    }
    img {
      width: 300px;
      height: 300px;
      border-radius: 10px;
    }
    .btns {
      margin-top: 25px;
      width: 300px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        display: inline-block;
        width: 45px;
        height: 45px;
        border-radius: 50px;
        background: #393939;
        font-size: 35px;
        text-align: center;
        line-height: 45px;
        margin: 10px;
        cursor: pointer;
      }
    }
  }
  .lyricBox {
    width: 300px;
    height: 450px;
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    .songInfoBox {
      height: 90px;
      h3 {
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        font-size: 15px;
        margin-top: 10px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .lycContainer {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .topLine {
      height: 2px;
      width: 100%;
      box-shadow: 0px 5px 6px 0px;
    }
    .bottomLine {
      height: 2px;
      width: 100%;
      box-shadow: 0px -5px 6px 0px;
    }
  }
}
</style>
