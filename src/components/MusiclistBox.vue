<template>
  <div class="listBox">
    <div v-for="items in list" :key="items.listId" @click="navToSongsheet(items.listId)">
      <img :src="items.listImg + '?param=140y140'" />
      <p>{{ items.listName }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list'],
  mounted () {
    console.log('歌单接受信息：', this.list)
  },
  methods: {
    navToSongsheet: function (listId){
      this.$router.push({ name: 'songsheet', params: { listId: listId } })
      this.$store.dispatch('getSongList',listId)
    }
  }
}
</script>
<style lang="scss" scoped>
.listBox {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: space-between;
  div {
    width: 140px;
    height: 190px;
    overflow: hidden;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
    position: relative;
    img {
      width: 140px;
      height: 140px;
      border-radius: 10px;
    }
    i {
      position: absolute;
      top: 100px;
      left: 100px;
      color: #ec4141ae;
      font-size: 30px;
    }
    p {
      display: inline-block;
      width: 100%;
      height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 12px;
    }
  }
}
</style>
