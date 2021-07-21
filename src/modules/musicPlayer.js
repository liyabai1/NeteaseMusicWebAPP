class Aplayer {
  constructor(type) {
    this.audio = new Audio()
    this.audio.autoplay = true
    this.audio.volume = 0.5
    this.songList = [] // 播放列表初始化为空
    this.playingId = null // 正在播放的歌曲的Id
    this.songPlayingData = {
      time: 0,
      singer: "",
      songName: "",
      songImgUrl: "",
      songId: 0
    } // 当前播放歌曲的信息
    this.playing = false // 播放状态 true 正在播放 false 暂停  主要用于图标显示
    this.audio.onended = function () {
      this.playing = false
    }
    this.audio.playing = function () {
      this.playing = true
    }
    this.type = type || null    // 播放来源 全局为null  fm为fm
  }

  /**
   * 传入播放歌单的数组
   * @param {Array} 歌单数组
   */
  sendSongList(arr) {
    this.songList = arr
  }

  /**
   * 歌曲暂停
   */
  pause() {
    this.audio.pause()
    this.playing = false
  }

  /**
   * 歌曲播放
   * @param {number} 要播放的歌曲ID
   */
  play(id) {
    if (id) {
      console.log(`播放id为${id}的歌曲`)
      this.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3 `
      this.playingId = id;
      console.log("当前播放的id", this.playingId)
      this.playing = true
    } else {
      if (this.playingId) {
        this.audio.play()
        this.playing = true
        console.log(`播放当前歌曲：id:${this.playingId}`)
      } else {
        alert('你还没有选中要播放的歌曲呀！')
      }
    }
  }

  /**
   * 下一首
   * des: 判断当前播放的Id在当前歌曲列表的索引，index !== songList.length -1 ? index++ : 0
   * @param {number}  当前播放的歌曲id
   */
  nextSong(id) {
    let hasPlayingId = this.getIndex(id)
    if (hasPlayingId !== false) {
      // 如果当前在播放列表的第一首，则播放列表的最后一首
      let index = null;
      hasPlayingId === this.songList.length - 1 ? index = 0 : index = ++hasPlayingId
      this.play(this.songList[index].songId)
    } else {
      console.error('当前播放的歌曲没有在播放列表里，检查是否执行了sendSongList()函数')
    }
  }

  /**
   * 上一首
   * @param {number}  当前播放的歌曲id
   */
  preSong(id) {
    let hasPlayingId = this.getIndex(id)
    if (hasPlayingId !== false) {
      // 如果当前在播放列表的第一首，则播放列表的最后一首
      let index = null;
      hasPlayingId !== 0 ? index = --hasPlayingId : index = this.songList.length - 1
      this.play(this.songList[index].songId)
    } else {
      console.error('当前播放的歌曲没有在播放列表里，检查是否执行了sendSongList()函数')
    }
  }

  /**
   * 设置播放音量
   * @param {number} 取值范围 0-1
   */
  playVol(volume) {
    this.audio.volume = volume
  }

  /**
   * 设置播放时间（进度）
   * @param{number} 已播放歌曲的秒数
   */
  setTimeTo(sec) {
    this.audio.currentTime = sec
  }

  /**
   * 判断传入的ID在播放列表的索引
   * @param {number}  id
   * return {number || false}  返回索引值，当传入的歌曲ID没有在播放列表里时返回false
   */
  getIndex(id) {
    let index = false
    this.songList.forEach((item, i) => {
      if (item.songId === id) {
        index = i
      }
    })
    console.log(index)
    return index
  }
  /**
   * 获取当前的播放时间
   * @return {number} currentTime 
   */
  getCurrentTime() {
    return this.audio.currentTime
  }
  /**
   * 获取播放状态 true 正在播放 false 暂停状态
   */
  getPlayStatus() {
    console.log(!this.audio.paused())
    return !this.audio.paused()
  }
}
export const GAUDIO = new Aplayer() // 全局的音乐播放器
export const FAUDIO = new Aplayer("fm") // 私人FM播放器
