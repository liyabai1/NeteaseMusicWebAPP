<template>
  <div class="playBox">
    <div class="songInfo">
      <img
        :src="
          this.$store.state.GlobalAudio.songPlayingData.songImgUrl +
          '?param=50y50'
        "
        alt=""
      />
      <div>
        <p>{{ this.$store.state.GlobalAudio.songPlayingData.songName }}</p>
        <p>{{ this.$store.state.GlobalAudio.songPlayingData.singer }}</p>
      </div>
    </div>
    <div class="ctrlBtn">
      <div class="btnsBox">
        <i class="iconfont" @click="preSong()">&#xe62a;</i>
        <i
          class="iconfont"
          v-if="this.$store.state.GlobalAudio.playing"
          @click="pause()"
          >&#xe633;</i
        >
        <i class="iconfont" v-else @click="play()">&#xe601;</i>
        <i class="iconfont" @click="nextSong()">&#xe62c;</i>
      </div>
      <div class="presBarBox">
        <span>{{ playedTime }}</span>
        <div @click="changePlayedTime($event)" ref="progressBar">
          <div
            class="playedBox"
            ref="progressDOM"
            :style="{ width: progressPer + '%' }"
          ></div>
        </div>
        <span>{{
          this.$store.state.GlobalAudio.songPlayingData.time | changeTime
        }}</span>
      </div>
    </div>
    <div class="volumeCtrl">
      <div class="volBox">
        <i class="iconfont">&#xe638;</i>
        <div class="volOutside" ref="volBar" @click="changeVol($event)">
          <div class="vol" :style="{ width: volWidth + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { changeTimeToMinute } from "@/modules/changeTime.js";
export default {
  data() {
    return {
      playedTime: 0,
      progressPer: 0,
      volWidth: 50,
    };
  },
  mounted() {
    // 正在播放
    this.$store.state.GlobalAudio.audio.ontimeupdate = this.getPlayedTime;
    // 播放结束
    this.$store.state.GlobalAudio.audio.onended = this.nextSong;
  },
  methods: {
    getPlayedTime() {
      this.playedTime = changeTimeToMinute(
        this.$store.state.GlobalAudio.audio.currentTime
      );
      let allTime = this.$store.state.GlobalAudio.songPlayingData.time;
      let currentTime = this.$store.state.GlobalAudio.audio.currentTime * 1000;
      this.progressPer = Math.floor((currentTime / allTime) * 100);
    },
    // 暂停
    pause() {
      this.$store.state.GlobalAudio.pause();
    },
    // 播放
    play() {
      // 暂停私人FM歌曲
      this.$store.state.FMAudio.pause();
      // 播放全局音乐
      this.$store.state.GlobalAudio.play();
    },
    // 上一首
    preSong() {
      let id = this.$store.state.GlobalAudio.playingId;
      this.$store.state.GlobalAudio.preSong(id);
      // 改变当前播放的信息 页面显示
      this.$store.commit("changeNowMusicInfo", { id, type: "pre" });
    },
    // 下一首
    nextSong() {
      let id = this.$store.state.GlobalAudio.playingId;
      this.$store.state.GlobalAudio.nextSong(id);
      // 改变当前播放的信息 页面显示
      this.$store.commit("changeNowMusicInfo", { id, type: "next" });
    },
    // 点击进度条改变当前播放时间
    changePlayedTime(event) {
      const AUDIO = this.$store.state.GlobalAudio.audio;
      const ALL_TIME = AUDIO.duration;
      let offsetX = event.offsetX;
      let allWidth = window.getComputedStyle(
        this.$refs.progressBar,
        null
      ).width;
      AUDIO.currentTime = ALL_TIME * (offsetX / parseFloat(allWidth));
    },
    // 点击音量条 改变音量大小
    changeVol(event) {
      let offsetX = event.offsetX;
      let allWidth = window.getComputedStyle(this.$refs.volBar, null).width;
      let per = offsetX / parseFloat(allWidth);
      this.$store.state.GlobalAudio.audio.volume = per;
      this.$store.state.FMAudio.audio.volume = per;
      this.volWidth = Math.round(per * 100);
    },
  },
  filters: {
    changeTime: function (time) {
      return changeTimeToMinute(time / 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.playBox {
  width: 100%;
  height: 72px;
  background-color: #222225;
  border-top: 1px solid #555;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.songInfo {
  width: 300px;
  height: 72px;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin-left: 10px;
    margin-right: 10px;
  }
  div {
    flex: 1;
    height: 50px;
    display: flex;
    flex-direction: column;
    p {
      display: inline-block;
      width: 230px;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-child(1) {
      font-size: 16px;
    }
    p:nth-child(2) {
      font-size: 15px;
    }
  }
}
.ctrlBtn {
  width: 420px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .btnsBox {
    width: 125px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      color: #d2d2d2;
      font-size: 15px;
      cursor: pointer;
    }
    i:nth-child(2) {
      font-size: 33px;
    }
  }
  .presBarBox {
    width: 420px;
    height: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 350px;
      height: 3px;
      background-color: #4a4a4a;
      border-radius: 1px;
      overflow: hidden;
      .playedBox {
        height: 100%;
        width: 0%;
        background-color: red;
        border-radius: 3px;
      }
    }
    div:hover {
      height: 6px;
      cursor: pointer;
      border-radius: 3px;
    }
    span {
      font-size: 10px;
    }
  }
}
.volumeCtrl {
  width: 300px;
  height: 72px;
  display: flex;
  align-items: center;
  .volBox {
    color: #d2d2d2;
    width: 100px;
    height: 20px;
    margin-left: 50px;
    display: flex;
    align-items: center;
    i {
      font-size: 16px;
    }
    .volOutside {
      width: 70px;
      height: 3px;
      background-color: #4a4a4a;
      margin-left: 5px;
      cursor: pointer;
      .vol {
        width: 50%;
        height: 100%;
        background-color: red;
      }
    }
  }
}
</style>
