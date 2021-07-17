<template>
  <div class="songListBox" :key="this.$store.state.songsheetData.id">
    <div class="listHeader">
      <span>序号</span>
      <span>音乐标题</span>
      <span>歌手</span>
      <span>专辑</span>
    </div>
    <li
      v-for="(items, index) in songlist.songData"
      :key="items.songId"
      @click="playMusic(items.songId)"
    >
      <div class="indexBox">
        <span class="index" v-if="showIndex(items.songId)">{{
          (index + 1) | filterIndex
        }}</span>
        <i v-else class="iconfont">&#xe638;</i>
      </div>

      <span
        class="songName"
        :class="{ vip: items.fee == 4 || items.fee == 1 }"
        >{{ items.songName }}</span
      >
      <i v-if="items.fee == 4 || items.fee == 1" class="iconfont">&#xe60f;</i>
      <i v-else></i>
      <span class="singer">{{ items.singer }}</span>
      <span class="ablum">{{ items.album }}</span>
      <!-- <span>{{ items.time }}</span> -->
    </li>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  // songlist格式：
  /**
   * {
   * songData:[
   *      {
   *        time: 歌曲时间
   *        songId: 歌曲ID   {number}
   *        fee: 是否会员     0、8完全可以听  {number}
   *        songName: 歌曲名字    {string}
   *        singer: 歌手      {string}
   *        album： 专辑名     {string}
   *      },
   *      .....
   *   ]
   * }
   */
  props: ["songlist"], // {object} 其中包含了一个songData属性，里面是歌曲信息
  methods: {
    playMusic(songId) {
      // 传入当前的播放列表
      this.$store.state.GlobalAudio.sendSongList(this.songlist.songData);
      // 获取当前播放歌曲的详情信息
      this.$store.dispatch("playMusic", songId);
    },
    // 显示播放小图标
    showIndex(songId) {
      return this.$store.state.GlobalAudio.playingId !== songId;
    },
  },
  mounted() {
    console.log("传入结果", this.songlist);
  },
  filters: {
    filterIndex(data) {
      return data < 10 ? "0" + data : data;
    },
  },
};
</script>
<style lang="scss" scoped>
.songListBox {
  width: 100%;
  height: auto;
  .listHeader {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: flex-start;
    span {
      display: inline-block;
      line-height: 35px;
      color: #535356;
      font-size: 14px;
    }
    span:hover {
      background: #373737;
    }
    span:nth-child(1) {
      width: 110px;
      text-align: center;
    }
    span:nth-child(2) {
      width: 370px;
    }
    span:nth-child(3) {
      width: 140px;
    }
    span:nth-child(4) {
      width: 190px;
    }
  }
  li {
    list-style: none;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    &:nth-child(even) {
      background: #2e2e2e;
    }
    &:hover {
      background: #373737;
    }
    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
    .index {
      width: 110px;
      text-align: center;
      color: #535356;
    }
    .indexBox > i {
      color: red;
      width: 110px;
      text-align: center;
    }
    .songName {
      width: 250px;
      font-size: 15px;
    }
    i {
      display: inline-block;
      color: red;
      font-size: 12px;
      width: 60px;
      height: 35px;
      line-height: 35px;
    }
    .singer {
      width: 140px;
      color: #535356;
    }
    .ablum {
      width: 170px;
      color: #535356;
    }
  }
}
.vip {
  color: #535356;
}
</style>
