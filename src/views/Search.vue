<template>
  <div class="searchBox">
    <p class="searchResInfo">找到{{ resCounts }}首单曲</p>
    <div class="songlistBox">
      <songlist-col
        :songlist="resSonglist"
        :key="resSonglist.songData[0].songId"
      ></songlist-col>
    </div>
    <div class="paginations">
      <i class="iconfont" @click="searchPrePage">&#xe63a;</i>
      <span>{{ offset }}</span>
      <i class="iconfont" @click="searchNextPage">&#xe639;</i>
    </div>
  </div>
</template>
<script>
import SonglistCol from "@/components/SonglistColumn";
import axios from "axios";
import { api } from "@/modules/api.js";
export default {
  data() {
    return {
      keyWords: "",
      resCounts: 0,
      resSonglist: { songData: [{ songId: 0 }] },
      offset: 1,
      pageCount: null,
    };
  },
  components: {
    SonglistCol,
  },
  mounted() {
    this.keyWords = this.$route.params.keywords;
    console.log(this.keyWords);
    // 搜索歌曲
    this.searchSong(this.offset);
  },
  methods: {
    searchSong: function (offset) {
      axios({
        url: `${api}/search?keywords=${this.keyWords}`,
        params: {
          limit: 30,
          offset: (offset - 1) * 30,
        },
      }).then((res) => {
        console.log(res.data);
        console.log(this);
        if (res.data.code === 200) {
          // 可能搜索有问题
          this.resCounts = res.data.result.songCount;
          this.pageCount = Math.ceil(this.resCounts / 30); // 总共的页数
          const songData = [];
          const songs = res.data.result.songs; // 搜索结果歌曲数组
          songs.forEach((item) => {
            const perSongInfo = {};
            perSongInfo.songId = item.id;
            perSongInfo.fee = item.fee;
            perSongInfo.songName = item.name;
            perSongInfo.singer = item.artists
              .map((item) => item.name)
              .join("/");
            perSongInfo.album = item.album.name;
            songData.push(perSongInfo);
          });
          this.resSonglist.songData = songData;
        } else {
          alert("遇到了预期之外的错误😥可能是搜索太频繁，被封IP了，过会就好了");
        }
      });
    },
    // 搜索上一页
    searchPrePage: function () {
      if (this.offset === 1) {
        alert("已经是第一页了。");
      } else {
        this.offset -= 1;
        this.searchSong(this.offset);
      }
    },
    // 所有下一页
    searchNextPage: function () {
      if (this.offset === this.pageCount) {
        alert("已经是最后一页了。");
      } else {
        this.offset += 1;
        this.searchSong(this.offset);
      }
    },
  },
  watch: {
    resSonglist: function (newV) {
      console.log(newV);
    },
  },
};
</script>
<style lang="scss" scoped>
.searchBox {
  display: flex;
  flex-direction: column;
  .searchResInfo {
    height: auto;
    font-size: 20px;
    margin: 15px;
    font-weight: 600;
  }
  .songlistBox {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 8px;
      opacity: 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #3f3f3f;
      border-radius: 4px;
    }
  }
  .paginations {
    width: 100%;
    height: 50px;
    line-height: 50px;
    justify-self: flex-end;
    display: flex;
    justify-content: center;
    i {
      font-size: 20px;
      margin-left: 10px;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
    span {
      display: inline-block;
      width: 50px;
      text-align: center;
    }
  }
}
</style>
