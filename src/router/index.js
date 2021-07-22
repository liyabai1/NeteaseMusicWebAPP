import Vue from 'vue'
import VueRouter from 'vue-router'

import Find from '@/views/Find.vue' // 发现音乐
import Recommend from '@/views/find/recommend/Recommend.vue' // 个性推荐页
import Customers from '@/views/find/customers/Customers.vue' // 专属定制
// import Musiclist from '@/views/find/musiclist/Musiclist.vue' // 歌单
import Rank from '@/views/find/rank/Rank.vue' // 排行榜
import NewMusic from '@/views/find/newmusic/NewMusic.vue' // 最近音乐

import PrivateFm from '@/views/PrivateFm.vue' // 私人FM

import SongSheet from '@/views/SongSheet.vue' // 歌单信息

import Search from '@/views/Search.vue' // 搜索结果

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Find,
    children: [
      {
        path: 'recommend',
        component: Recommend
      },
      {
        path: 'customers',
        component: Customers
      },
      // {
      //   path: 'musiclist',
      //   component: Musiclist
      // },
      {
        path: 'rank',
        component: Rank
      },
      {
        path: 'newmusic',
        component: NewMusic
      },
      {
        path: '',
        redirect: 'recommend'
      }
    ]
  },
  {
    path: '/privatefm',
    component: PrivateFm
  },
  {
    path: '/songsheet/:listId', // 后面需要跟歌单ID，暂时没加
    name: 'songsheet',
    component: SongSheet
  },
  {
    path: '/search/:keywords',
    name: 'search',
    component: Search
  },
  {
    path: '*',
    redirect: '/home' // 重定向到home页
  }

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
