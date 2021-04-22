import { readFileSync } from 'fs'

// const readFileSync = require('fs').readFileSync
// let test_path = 'C:/julnMusic/music/default/莫忘-莫山山/lyric.txt'

// 文件结构(分,秒,毫秒)
// [00:00:00]莫忘 - 刘美麟
// [00:03:00](电视剧《将夜》莫山山人物主题曲)
// [00:09:00]作词：王海涛
// [00:10:00]作曲：王铮亮


// return false为未找到歌词,数组为歌词的结构
const getLyric = function(path) {
    // 结构
    let arr = [
        {
            time: 1000,
            lyric: '莫忘 - 刘美麟'
        }
    ]
    console.log('lyric-path: ',path)

    try {
        let str = readFileSync(path,'utf-8')
        str = str.slice(1,-1)
        let cols = str.split('\n[')
        cols.forEach( (col,index) => {
            let [time,lyric] = col.split(']')
            arr[index] = {
                time,
                lyric: lyric ? lyric : ''
            }
            console.log( arr[index].time, arr[index].lyric )
        })
        return arr
    } catch (error) {
        return false
    }

}
// console.log( getLyric(test_path) )

// str: 00:10:00, return 10s
const parseTime = (str) => {
    let [min,s,ms] = str.split(':')
    return min * 60 + s * 1 + ~~(ms / .6)/100
}
// console.log( parseTime('01:10:20') )

// lyricArr结构
// [
//     {
//         time: 1000,
//         lyric: '莫忘 - 刘美麟'
//     }
// ]
// return false为失败,lineNum为从0开始的列数
const getLineNumByTime = (lyricArr,time) => {
    let result = false
    lyricArr.forEach((col,index) => {
        if( parseTime(col.time) <= time ) {
            result = index
        }
    })
    return result
}

export {
    getLyric,
    parseTime,
    getLineNumByTime,
}