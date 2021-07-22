<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in listInfo"
        :key="item.songId"
        @click="playMusic(item.songId)"
      >
        <div class="index">{{ index + 1 }}</div>
        <img :src="item.songImgUrl + '?param=65y65'" alt="" />
        <div
          class="songName"
          :class="{ fee: item.fee === 4 || item.fee === 1 }"
        >
          {{ item.songName }}
        </div>
        <div class="singer">{{ item.singer }}</div>
        <div class="ablum">{{ item.ablum }}</div>
        <div class="time">{{ changeTime(item.time) }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import { api } from "@/modules/api.js";
import { changeTimeToMinute } from "@/modules/changeTime.js";
export default {
  data() {
    return {
      listInfo: [],
    };
  },
  props: ["listType"],
  computed: {
    changeTime: function () {
      return function (time) {
        return changeTimeToMinute(time / 1000);
      };
    },
  },
  methods: {
    playMusic(songId) {
      // 传入当前的播放列表
      this.$store.state.GlobalAudio.sendSongList(this.listInfo);
      // 获取当前播放歌曲的详情信息
      this.$store.dispatch("playMusic", songId);
    },
  },
  mounted() {
    // 根据listId搜索新歌速递
    console.log(this.listId);
    axios({
      url: `${api}/top/song?type=${this.listType}`,
    }).then((res) => {
      console.log(res.data);
      if (res.data.code === 200) {
        let resSongArr = res.data.data;
        resSongArr.forEach((item) => {
          let preSongInfo = {
            songName: item.name,
            songId: item.id,
            songImgUrl: item.album.picUrl,
            singer: item.artists.map((i) => i.name).join("/"),
            album: item.album.name,
            time: item.duration,
            fee: item.fee,
          };
          this.listInfo.push(preSongInfo);
        });
      }
    });
  },
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
  height: 80px;
  width: 100%;
  display: flex;
  line-height: 80px;
  cursor: pointer;
  &:nth-child(odd) {
    background: #2e2e2e;
  }
  &:hover {
    background-color: #373737;
  }
  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }
  .index {
    width: 50px;
    text-align: end;
    color: #878787;
  }
  img {
    width: 65px;
    height: 65px;
    margin: 10px;
    border-radius: 10px;
  }
  .songName {
    width: 300px;
  }
  .singer {
    width: 135px;
    color: #878787;
  }
  .ablum {
    width: 150px;
    color: #878787;
  }
  .time {
    flex: 1;
    text-align: center;
    color: #878787;
  }
}
.fee {
  color: #878787;
}
</style>