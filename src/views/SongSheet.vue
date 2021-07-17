<template>
  <div class="songListBox">
    <songlist-header
      :songlist="this.$store.state.songsheetData"
    ></songlist-header>
    <songlist-col
      :songlist="this.$store.state.songsheetData | filterListSong"
    ></songlist-col>
  </div>
</template>
<script>
import SonglistHeader from '@/components/SonglistHeader.vue'
import SonglistCol from '@/components/SonglistColumn.vue'

export default {
  data () {
    return {
      listInfo: ''
    }
  },
  components: {
    SonglistHeader,
    SonglistCol
  },
  mounted () {
    this.listInfo = this.$route.params.listId
    // 搜索歌单歌曲
    this.$store.dispatch('getSongList', this.$route.params.listId)
  },
  filters: {
    filterListSong (data) {
      console.log('过滤数据：', data)
      const songData = []
      data.tracks.map((items) => {
        const temp = {}
        temp.time = items.dt
        temp.songId = items.id // 歌曲ID
        temp.songName = items.name // 歌名
        temp.album = items.al.name // 歌曲专辑
        temp.singer = items.ar.map((item) => item.name).join('/') // 歌手
        temp.fee = items.fee // 是否会员 0、8免费 1 VIP 4 单独付费
        temp.songImgUrl = items.al.picUrl // 封面
        songData.push(temp)
      })
      data.songData = songData
      return data
    }
  }
}
</script>
<style lang="scss" scoped>
.songListBox {
  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3f3f3f;
    border-radius: 3px;
  }
}
</style>
