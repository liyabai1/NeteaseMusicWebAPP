<template>
  <div :key="this.$store.state.songsheetData.id" class="listHeaderBox">
    <!-- 歌单详情头部信息 -->
    <div class="listImg">
      <img :src="songlist.coverImgUrl + '?param=200y200'" alt="" />
    </div>
    <div class="listInfo">
      <h2>{{ this.songlist.name }}</h2>
      <div class="creator">
        <img :src="this.songlist.creator.avatarUrl + '?param=50y50'" />
        <span>{{ this.songlist.creator.nickname }}</span>
      </div>
      <span class="count">
        歌曲：<span>{{ this.songlist.trackCount }}</span> 播放：<span>{{
          this.songlist.playCount | filterCount
        }}</span>
      </span>
      <span class="tag">
        标签： {{ this.songlist.tags.join("/") | filerheaderInfo }}
      </span>
      <span class="descr"
        >简介：{{ this.songlist.description | filerheaderInfo }}</span
      >
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['songlist'],
  mounted () {
    console.log('头部信息：', this.songlist)
  },
  filters: {
    filerheaderInfo (data) {
      return !data ? '无' : data
    },
    filterCount (data) {
      return data > 10000 ? data.toString().slice(0, -4) + '万' : data
    }
  }
}
</script>
<style lang="scss" scoped>
.listHeaderBox {
  height: 240px;
  display: flex;
  align-items: center;
  .listImg {
    width: 185px;
    height: 185px;
    margin-left: 32px;
    margin-right: 20px;
    img {
      width: 185px;
      height: 185px;
      border-radius: 5px;
    }
  }
  .listInfo {
    flex: 1;
    height: 185px;
    display: flex;
    flex-direction: column;
    h2 {
      display: inline-block;
      width: 500px;
      height: 35px;
      overflow: hidden;
    }
    .creator {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 10px;
      }
      span {
        color: #2b4eb7;
        font-size: 12px;
        font-weight: bold;
      }
    }
    .count {
      font-size: 12px;
      span {
        color: #6c83c5;
        font-weight: bold;
      }
    }
    .tag {
      font-size: 12px;
    }
    .descr {
      width: 550px;
      height: 80px;
      overflow: auto;
      font-size: 14px;
      box-shadow: inset 0px -10px 5px 0px rgb(98, 98, 98);
      &::-webkit-scrollbar {
        width: 6px;
        opacity: 0;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #686868;
        border-radius: 3px;
      }
    }
  }
}
</style>
