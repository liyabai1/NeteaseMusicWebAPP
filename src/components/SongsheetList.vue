<template>
  <div>
    <p>创建的歌单</p>
    <ul>
      <li v-for="items in creatList" :key="items.id">
        <i class="iconfont">&#xe610;</i>
        <router-link
          :to="{ name: 'songsheet', params: { listId: items.id } }"
          tag="span"
          active-class="active"
          @click.native="setRouterKey(items.id)"
        >
          {{ items.name }}
        </router-link>
      </li>
    </ul>
    <p>收藏的歌单</p>
    <ul>
      <li v-for="items in collList" :key="items.id">
        <i class="iconfont">&#xe610;</i>
        <router-link
          :to="{ name: 'songsheet', params: { listId: items.id } }"
          tag="span"
          active-class="active"
          @click.native="setRouterKey(items.id)"
        >
          {{ items.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { api } from '@/modules/api.js'
import axios from 'axios'
export default {
  data () {
    return {
      creatList: [],
      collList: []
    }
  },
  mounted () {
    const userInfo = this.$store.state.userInfo
    // 获取歌单信息
    axios({
      url: `${api}/user/playlist?uid=${userInfo.account.id}&limit=100` // 偷懒直接获取100个歌单，不用加分页
    }).then((res) => {
      console.log(res.data.playlist)
      const playlist = res.data.playlist
      playlist.map((item) => {
        // 歌单分类
        if (item.creator.userId === userInfo.account.id) {
          this.creatList.push(item)
        } else {
          this.collList.push(item)
        }
      })
      console.log('创建的歌单', this.creatList)
      console.log('收藏的歌单', this.collList)
    })
  },
  methods: {
    // 设置一级路由key值
    setRouterKey (listId) {
      this.$store.commit('changePage', listId)
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  width: 100%;
  p {
    display: inline-block;
    width: 150px;
    height: 18px;
    font-size: 12px;
    margin-left: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
    color: rgb(214, 214, 214);
    font-weight: bold;
  }
  ul {
    list-style: none;
    li {
      display: block;
      height: 36px;
      width: 170px;
      line-height: 36px;
      margin-left: 15px;
      padding-left: 8px;
      margin-top: 5px;
      cursor: pointer;
      display: flex;
      &:hover {
        background-color: #333;
        border-radius: 5px;
      }
      i {
        width: 18px;
        height: 18px;
      }
      span {
        margin-left: 5px;
        display: inline-block;
        width: 140px;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.active {
  background-color: #333;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
</style>
