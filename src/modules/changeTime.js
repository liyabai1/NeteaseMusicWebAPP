/**
 * des: 改变歌词时间显示,改为秒数
 * @param {string} 格式如下：[00:05.005] | [05:10.22]
 * @return {Number} 返回对应的秒数
 */
export function changeTimeToSecond (time) {
  const temp = time.match(/(?<=\[).*(?=\])/g)[0] // 取掉首末的[]号
  const m = /[0-9]{2,}(?=:)/g.exec(temp)[0] // 获取 : 之前的时间 => 分钟
  const s = /(?<=:).*/g.exec(temp)[0] // 获取 : 之后的的时间 => 秒
  return Number(m) * 60 + parseFloat(s)
}

/**
 * des: 改变秒数为[00:05]格式
 * @param {number}  秒数   *******注意：不是毫秒******
 * @return {string}  格式如下： 03:52
 */
export function changeTimeToMinute (time) {
  let m = Math.floor(time / 60)
  let s = Math.floor(time % 60)
  m < 10 ? m = `0${m}` : m
  s < 10 ? s = `0${s}` : s
  return m + ':' + s
}
