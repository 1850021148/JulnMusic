let getMusicData = function(rootPath = 'C:/julnMusic') {
    const fs = require('fs')
    let musicData = []

    if(!fs.existsSync(rootPath + '/music')) return
    musicData = fs.readdirSync(rootPath + '/music')
    musicData.forEach( (listname,index) => {
        let imgSrc = `${rootPath}/music/${listname}/index.jpg`
        musicData[index] = {
            id: index,
            listname: listname,
            imgSrc: fs.existsSync(imgSrc) ? imgSrc : null,
            songs: []
        }

        if(fs.existsSync(rootPath + '/music/' + listname)) {
            let songs = fs.readdirSync(rootPath + '/music/' + listname)
            // console.log(songs)
            let i = 0
            songs.forEach( filename => {
                if(filename === 'index.jpg') {
                    i
                    return
                }
                let imgSrc = `${rootPath}/music/${listname}/${filename}/index.jpg`
                let mvSrc = `${rootPath}/music/${listname}/${filename}/mv.mp4`
                musicData[index].songs[i] = {
                    id: i,
                    listname,
                    filename,
                    songname: filename.split('-')[0],
                    songer: filename.split('-')[1] || '未知歌手',
                    isLoadDown: true,
                    songURL: `${rootPath}/music/${listname}/${filename}/${filename}.mp3`,
                    imgSrc: fs.existsSync(imgSrc) ? imgSrc : null,
                    lyric: `${rootPath}/music/${listname}/${filename}/lyric.txt`,
                    mvSrc: fs.existsSync(mvSrc) ? mvSrc : null,
                }
                // console.log(musicData[index].songs[i])
    
                // 检验图片文件是否存在,不存在则为null
    
    
                i++
            })
        }
    })
    // console.log(musicData)
    return musicData
}
module.exports = getMusicData