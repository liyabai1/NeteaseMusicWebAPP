<template>
  <div class="rankBox">
    <img :src="rankInfo.imgUrl" alt="" />
    <div class="songListBox">
      <ul>
        <li v-for="(item, index) in listInfo" :key="index">
          <span class="index">{{ index + 1 }}</span>
          <span class="songName">{{ item.songName }}</span>
          <span class="singer">{{ item.singer }}</span>
        </li>
      </ul>
      <span class="viewMore" @click="navToSongsheet(rankInfo.listId)"
        >查看更多></span
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { api } from "@/modules/api.js";
export default {
  data() {
    return {
      listInfo: [],
    };
  },
  props: ["rankInfo"],
  mounted() {
    // 根据rankInfo.listId所搜前5的歌曲
    axios({
      url: `${api}/playlist/detail?id=${this.rankInfo.listId}`,
    }).then((res) => {
      console.log(res.data);
      if (res.data.code === 200) {
        let listInfo = res.data.playlist.tracks.splice(0, 5);
        console.log(listInfo);
        listInfo.map((item) => {
          let temp = {
            songName: item.name,
            singer: item.ar.map((i) => i.name).join("/"),
            songId: item.id,
          };
          this.listInfo.push(temp);
        });
      }
    });
  },
  methods: {
    navToSongsheet(listId) {
      this.$router.push({ name: "songsheet", params: { listId: listId } });
    },
  },
};
</script>
<style lang="scss" scoped>
.rankBox {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  img {
    width: 175px;
    height: 175px;
    margin: 30px;
    border-radius: 10px;
  }
  .songListBox {
    width: 560px;
    height: 200px;
    ul {
      list-style: none;
      li {
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        &:nth-child(odd) {
          background-color: #2e2e2e;
        }
        &:hover {
          background-color: #373737;
        }
        span {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 100%;
        }
        .index {
          width: 50px;
          text-align: center;
        }
        .songName {
          width: 280px;
        }
        .singer {
          margin-left: 20px;
          width: 180px;
        }
      }
    }
    .viewMore {
      font-size: 13px;
      margin-top: 5px;
      cursor: pointer;
      color: #878787;
      &:hover {
        color: #ccc;
      }
    }
  }
}
</style>