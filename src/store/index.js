import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { api } from '@/modules/api.js'
import { changeTimeToSecond } from '@/modules/changeTime.js'
import { GAUDIO, FAUDIO } from '@/modules/musicPlayer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    GlobalAudio: GAUDIO, // 全局音乐播放器 ==> 底部的播放器
    FMAudio: FAUDIO, // 私人FM的播放器
    homeData: null, // 发现页数据
    bannerData: [], // 轮播图数据
    userInfo: {
      isLogin: false,
      profile: {
        nickname: '未登录',
        avatarUrl: ''
      }
    }, // 用户信息
    loginIng: false, // 登录框是否弹出
    path: '', // 一级路由router-view的key值
    recommendList: {}, // 推荐歌单
    dayRecommendMusic: [], // 每日推荐歌曲
    neteaseRadar: [], // 网易云的音乐雷达
    songsheetData: [], // 依据歌单Id搜索结果数据
    privatefm: [{ id: 0, lrcId: 0 }] // 私人FM数据
  },
  mutations: {
    // 更改发现页数据
    homeDataMut(state, data) {
      state.homeData = data
      state.bannerData = data[0].extInfo.banners
      // 用户未登录时，推荐歌单为发现页推荐
      state.recommendList = data[1]
      state.neteaseRadar = data[7]
      // // 提取最新音乐
      // let temp = state.homeData[2]
      // temp = temp.creatives.filter(items => {
      //   return items.creativeType === 'NEW_SONG_HOMEPAGE'
      // })
      // console.log("每日",temp)
      // temp.map(items => {
      //   items.resources.map(data => {
      //     const songName = data.uiElement.mainTitle.title;
      //     const songImgUrl = data.uiElement.image.imageUrl;
      //     const songId = data.resourceId;
      //     const album = data.uiElement.mainTitle.title;
      //     const listData = {
      //       songName,
      //       songImgUrl,
      //       songId,
      //       album
      //     }
      //     state.dayRecommendMusic.push(listData)
      //   })
      // })
    },
    // 更改用户数据,判断用户是否登录
    userInfoMut(state, data) {
      state.userInfo = data
      state.userInfo.isLogin = true
    },
    // 弹出、关闭登录框
    login(state, data) {
      state.loginIng = data
    },

    // 设置一级路由的key值
    // 解决重新路由到同一页面，但是不同参数的问题
    changePage(state, data) {
      state.path = data
    },

    // 登录后改变发现页面的推荐歌单
    recommendListMut(state, data) {
      state.recommendList = data
    },

    // 获取歌单信息
    songlistMut(state, data) {
      state.songsheetData = data
    },

    // 获取私人Fm信息
    fmdataMut(state, data) {
      for (const item of data) {
        item.lrc = ''
        item.lrcId = 0
      }
      if (state.privatefm[0].id === 0) { // 第一次获取数据时删除原有的初始数据
        state.privatefm = data
      } else {
        state.privatefm.push(...data)
      }
    },

    // 获取私人FM歌词信息
    fmdatalrcMut(state, data) {
      console.log(data)
      for (const item of state.privatefm) {
        if (item.id === data.id) {
          item.lrcId = data.id

          if (data.lrc === '暂无歌词') {
            item.lrc = data.lrc
          } else {
            const lrcArray = []
            const RegExp = /\[[0-9]{2,}\:[0-9]{2,}.[0-9]{2,}\].*\n/g
            const arr = data.lrc.match(RegExp)
            arr.map(item => {
              // 再对每一行歌词的内容进行正则匹配，因为每一行歌词中可能包含了两个以上的[00:05.22]格式的时间，只取最后一个
              const reg = /\[[0-9]{2,}\:[0-9]{2,}.[0-9]{2,}\]/g
              let time = item.match(reg)

              // 提取每一行的歌词内容
              let content
              for (const i in time) {
                content = item.replace(time[i], '')
              }
              content = content.replace('\n', '')

              // 如果每一行的时间超过2个，则只使用最后一个时间
              if (time.length > 1) { // 若匹配后的时间有两个及以上，只取最后一个
                time = time.pop()
              }

              const sec = changeTimeToSecond(time[0])

              const perLrc = {}
              perLrc.sec = sec
              perLrc.txt = content
              lrcArray.push(perLrc)
            })

            item.lrc = lrcArray
          }
        }
      }
    },

    // 当前播放的歌曲信息（全局）
    playMusicMut(state, data) {
      state.GlobalAudio.songPlayingData = data
      // 暂停私人FM的歌曲
      state.FMAudio.pause()
      // 播放全局歌曲
      state.GlobalAudio.play(data.songId)
    },

    // 改变当前播放的歌曲信息
    changeNowMusicInfo(state, data) {
      // 获取当前播放ID的索引值
      let nowindex = state.GlobalAudio.getIndex(data.id)
      let index = null;
      if (data.type === "next") {
        nowindex === state.GlobalAudio.songList.length - 1 ? index = 0 : index = ++nowindex
      } else if (data.type === "pre") {
        nowindex !== 0 ? index = --nowindex : index = state.GlobalAudio.songList.length - 1
      }
      state.GlobalAudio.songPlayingData = state.GlobalAudio.songList[index]
    }
  },
  actions: {
    // 获取发现页数据
    getHomeData(store) {
      axios({
        url: `${api}/homepage/block/page`
      }).then((res) => {
        // console.log('发现页数据', res.data.data.blocks)
        store.commit('homeDataMut', res.data.data.blocks)
      })
    },
    // 用户登录
    getUserInfo(store, data) {
      // console.log(data)
      axios({
        url: `${api}/login/cellphone?phone=${data.phone}&password=${data.password}`
      }).then(res => {
        // console.log(res.data)
        try {
          // 登录成功
          if (res.data.code === 200) {
            store.commit('userInfoMut', res.data)
            store.commit('login', false)
            // 获取推荐歌单
            // console.log(res.data.cookie)
            axios({
              url: `${api}/recommend/resource?cookie=${res.data.cookie}`
            }).then(res => {
              store.commit('recommendListMut', res.data.recommend)
            })
            // 获取每日推荐歌曲
          } else {
            alert('登录失败')
          }
        } catch {
          console.error('登录失败')
          alert('登录失败')
        }
      })
    },

    // 依据歌单ID搜索结果页面
    getSongList(store, data) {
      // console.log("需要搜索的歌单ID", data)
      // console.log("cookie", store)
      axios({
        url: `${api}/playlist/detail?id=${data}&cookie=${store.state.userInfo.cookie}`
      }).then(res => {
        // console.log("歌单搜索结果：", res.data.playlist)
        store.commit('songlistMut', res.data.playlist)
      })
    },

    // 获取私人FM 数据
    getFmdata(store) {
      // console.log("开始搜索fm数据")
      axios({
        url: `${api}/personal_fm`
      }).then(res => {
        // console.log("私人FM数据", res.data)
        store.commit('fmdataMut', res.data.data)
        // 根据获取的信息搜索FM歌词
        for (const item of res.data.data) {
          axios({
            url: `${api}/lyric?id=${item.id}`
          }).then(res => {
            let lrc = ''
            // console.log("Fm歌词", res.data)
            if (res.data.hasOwnProperty('nolyric')) { // 没有歌词
              lrc = '暂无歌词'
            } else {
              lrc = res.data.lrc.lyric
            }
            store.commit('fmdatalrcMut', { lrc, id: item.id })
          })
        }
      })
    },

    /**
     * 播放全局音乐
     * @param {*} store 
     * @param {number} 歌曲ID 
     */
    playMusic(store, data) {
      // 搜索当前歌曲的详细信息
      axios({
        url: `${api}/song/detail?ids=${data}`
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.songs)
          let musicAllData = res.data.songs[0]

          // 提取所需的歌曲信息
          let musicData = {
            time: musicAllData.dt,
            singer: musicAllData.ar.map(item => item.name).join("/"),
            songName: musicAllData.name,
            songImgUrl: musicAllData.al.picUrl,
            songId: data
          }

          store.commit("playMusicMut", musicData)

        }
      })
    }
  },
  modules: {
  }
})
