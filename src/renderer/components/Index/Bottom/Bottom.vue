<template>
    <div id="bottom">

        <!-- audio -->
        <audio :src="playingSong.songURL" ref="audio" preload="auto" autoplay @timeupdate="timeupdate"></audio>

        <!-- 左半边,点击显示Core页面 -->
        <div class="showCore" @click="linkToCore">
            <div class="imgBox" ref="imgBox">
                <img :src="playingSong.imgSrc || defaultImgSrc" />
            </div>
            <div class="songnameAndSonger">
                <!-- 歌名,超出滚动 -->
                <span class="songname" ref="maxSpan">
                    <div class="min-span" ref="minSpan">
                        {{ playingSong.songname }}
                    </div>
                </span>
                <span class="songer">{{ playingSong.songer }}</span>
            </div>
        </div>

        <!-- 右半边,音乐控制器 -->
        <div class="right">
            <div class="controls">
                <play-type class="playType"/>
                <control-core class="controlCore" @turn="turn" />

                <!-- 词 -->
                <span class="show-lyric" @click="toggleShowLyric">词</span>

                <volume class="volumeBox" />
            </div>
            <pro-range @change="changeProBar"/>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import PlayType from './PlayType/PlayType.vue'
import ControlCore from './ControlCore/ControlCore.vue'
import Volume from './Volume/Volume.vue'
import ProRange from './ProRange/ProRange.vue'

import defaultImgSrc from '@/assets/defaultCover.jpg'

export default {
    data () {
      return {
          currentTime: 0,
          defaultImgSrc,

          playingSong_timeout: null,

          showLyric: false,
      }
    },
    
    computed: {
        playingSong() {
            return this.$store.state.playingSong
        },
        playingType() {
            return this.$store.state.playingType
        },
    },

    watch: {
        playingSong(newVal,oldVal) {
            if(newVal === oldVal) return
            this.$store.commit('setDuration',this.$refs.audio.duration)
            clearTimeout(this.playingSong_timeout)
            this.playingSong_timeout = setTimeout(() => {
                this.setOvertxt()
            }, 20);
        },
    },

    mounted() {

        // 响应式布局
        if(window.innerWidth <= 500)
            this.$refs.imgBox.style.display = 'none'
        else
            this.$refs.imgBox.style.display = 'block'
        window.onresize = () => {
            if(window.innerWidth <= 500)
                this.$refs.imgBox.style.display = 'none'
            else
                this.$refs.imgBox.style.display = 'block'
        }

        // ended事件
        this.$refs.audio.addEventListener('ended', this.ended)
    },

    methods: {
        timeupdate() {
            this.$store.commit('setDuration',this.$refs.audio.duration)
            console.log(this.$refs.audio.currentTime,this.$store.state.currentTime)
            this.currentTime = this.$refs.audio.currentTime

            // 上传currentTime
            if(this.currentTime)
                this.$store.commit('setCurrentTime',this.currentTime)

            // 传递到歌词窗口
            
        },
        toggleShowLyric() {
            this.showLyric = !this.showLyric
            // 显示歌词窗口
            ipcRenderer.send('showLyric',this.showLyric,'lyric from bottom 116')
        },
        changeProBar(value) {
            this.$refs.audio.currentTime = value
        },

        // class类名控制文字超出滚动
        setOvertxt() {
            let minSpan = this.$refs.minSpan
            let maxSpan = this.$refs.maxSpan
            // console.log('minSpan: ',minSpan.offsetWidth,'\nmaxSpan',maxSpan.offsetWidth)
            if(minSpan.offsetWidth <= maxSpan.offsetWidth){ // 文字不超出
                minSpan.classList.toggle('overtxt',false)
            }
            else{
                minSpan.classList.toggle('overtxt',true)
            }
        },

        linkToCore() {
            if(this.$route.name === 'lyric' || this.$route.name === 'currentList' || this.$route.name === 'mv') {
                this.$router.replace({ name: 'list' })
            }
            else{
                this.$router.replace({ name: 'lyric' })
            }
        },

        // 音乐播放结束
        ended() {
            const that = this
            const audio = this.$refs.audio
            const playingType = this.$store.state.playingType
            const currentListName = this.$store.state.currentListName
            let playingSong = this.$store.state.playingSong
            console.log('type : ',playingType)
            if(!currentListName) return
            if(playingType == 0) {
                console.log('随机播放,下一首: ',getRandSongSrc_updataPlayingSong())
                audio.src = getRandSongSrc_updataPlayingSong()
            }
            else if(playingType == 1) {
                audio.src = getNextSongSrc_updataPlaingSong()
            }
            else if(playingType == 2) {
                audio.loop = 'loop'
            }
            this.$store.commit('setPlayingSong',playingSong)
            audio.play()

            function getRandSongSrc_updataPlayingSong() {
                const audio = that.$refs.audio
                const { listId, songId, listLen } = getListId_SongId_ListLen()
                const randId = getRandId()
                playingSong = that.$store.state.musicData[listId].songs[randId]
                return that.$store.state.musicData[listId].songs[randId].songURL

                function getRandId() {
                    if(listLen === 1) return songId
                    let randId
                    do {
                        randId = ~~(Math.random() * listLen)
                    } while (randId === songId);
                    console.log('randID: ',randId,' songId: ',songId)
                    return randId
                }
            }
            function getNextSongSrc_updataPlaingSong() {
                const { listId, songId, listLen } = getListId_SongId_ListLen()
                let nextId
                if(songId + 1 == listLen) {
                    nextId = 0
                }
                else
                    nextId = songId + 1
                console.log('next song: ',that.$store.state.musicData[listId].songs[nextId].songURL)
                playingSong = that.$store.state.musicData[listId].songs[nextId]
                return that.$store.state.musicData[listId].songs[nextId].songURL
            }
            function getListId_SongId_ListLen() {
                let res = {
                    listId: null,
                    songId: that.$store.state.playingSong.id,
                    listLen: null,
                }
                const currentListName = that.$store.state.currentListName
                const musicData = that.$store.state.musicData
                musicData.forEach(list => {
                    if(list.listname === currentListName) {
                        res.listId = list.id
                        res.listLen = list.songs.length
                    }
                })
                return res
            }
        },
        
        // 切换歌曲
        turn(turnType) {
            const that = this
            const audio = this.$refs.audio
            const playingType = this.$store.state.playingType
            const currentListName = this.$store.state.currentListName
            let playingSong = this.$store.state.playingSong

            console.log(turnType,this.playingType)

            if(!this.playingSong) return
            if(!audio.paused) audio.pause()
            if(this.playingType == 0) {
                turnByRand()
            }
            else if(this.playingType == 1 || this.playingType == 2) {
                if(turnType === 'next') {
                    nextByList()
                }
                else if(turnType === 'before') {
                    preByList()
                }
            }

            function turnByRand() {
                audio.src = getRandSongSrc_updataPlayingSong()
                that.$store.commit('setPlayingSong',playingSong)
                audio.play()
            }
            function nextByList() {
                audio.src = getNextSongSrc_updataPlaingSong()
                that.$store.commit('setPlayingSong',playingSong)
                audio.play()
            }
            function preByList() {
                audio.src = getPreSongSrc_updataPlaingSong()
                that.$store.commit('setPlayingSong',playingSong)
                audio.play()
            }
            function getRandSongSrc_updataPlayingSong() {
                const audio = that.$refs.audio
                const { listId, songId, listLen } = getListId_SongId_ListLen()
                const randId = getRandId()
                playingSong = that.$store.state.musicData[listId].songs[randId]
                return that.$store.state.musicData[listId].songs[randId].songURL

                function getRandId() {
                    if(listLen === 1) return songId
                    let randId
                    do {
                        randId = ~~(Math.random() * listLen)
                    } while (randId === songId);
                    console.log('randID: ',randId,' songId: ',songId)
                    return randId
                }
            }
            function getNextSongSrc_updataPlaingSong() {
                const { listId, songId, listLen } = getListId_SongId_ListLen()
                let nextId
                if(songId + 1 == listLen) {
                    nextId = 0
                }
                else
                    nextId = songId + 1
                console.log('next song: ',that.$store.state.musicData[listId].songs[nextId].songURL)
                playingSong = that.$store.state.musicData[listId].songs[nextId]
                return that.$store.state.musicData[listId].songs[nextId].songURL
            }
            function getPreSongSrc_updataPlaingSong() {
                const { listId, songId, listLen } = getListId_SongId_ListLen()
                let preId
                if(songId == 0) {
                    preId = listLen - 1
                }
                else
                    preId = songId - 1
                console.log('pre song: ',that.$store.state.musicData[listId].songs[preId].songURL)
                playingSong = that.$store.state.musicData[listId].songs[preId]
                return that.$store.state.musicData[listId].songs[preId].songURL
            }
            function getListId_SongId_ListLen() {
                let res = {
                    listId: null,
                    songId: that.$store.state.playingSong.id,
                    listLen: null,
                }
                const currentListName = that.$store.state.currentListName
                const musicData = that.$store.state.musicData
                musicData.forEach(list => {
                    if(list.listname === currentListName) {
                        res.listId = list.id
                        res.listLen = list.songs.length
                    }
                })
                return res
            }
        },
    
    },

    components: {
        PlayType,
        ControlCore,
        Volume,
        ProRange,
    },

}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
#bottom{
    width: 100%;
    height: 100px;
    display: flex;
}
.showCore{
    display: flex;
    height: 100px;
}
.showCore:hover{
    opacity: .8;
}
.imgBox{
    width: 100px;
    height: 100%;
    background: white;
    border: .5px solid black;
    box-sizing: border-box;
}
.imgBox>img{
    width: 100%;
}
.right{
    flex: 1;
    width: 100%;
    height: 100%;
    background: rgb(27, 94, 144);
}
.songnameAndSonger{
    width: 80px;
    height: 100%;
    color: white;
    background: rgb(27, 94, 144);
}
.songnameAndSonger>.songname{
    position: relative;
    top: 25px;
    height: 25px;
    line-height: 25px;
    display: block;
    text-align: center;
    font-size: 18px;
    width: 80%;
    margin: auto;
    overflow: hidden;
}
.songnameAndSonger>.songer{
    position: relative;
    top: 32px;
    display: block;
    text-align: center;
    font-size: 16px;
}
.controls{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 60px;
}

/* 歌名超出滚动 */
.min-span{
    position: absolute;
    display: inline-block;
    overflow-x: scroll;
    white-space: nowrap;
    left: 50%;
    transform: translateX(-50%);
    transition: 5s;
    animation-duration: 3s;
    animation-delay: 3s;
    animation-iteration-count: infinite;
}
.overtxt{ /* js控制name=overtxt或none */
    animation-name: overtxt;
}
.min-span::-webkit-scrollbar{
    display: none;
}

.show-lyric{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    font-size: 25px;
    line-height: 40px;
    text-align: center;
}
.show-lyric:hover{
    border: .5px solid black;
    background: rgb(27, 66, 144);
}

@keyframes overtxt {
    0% {
        left: 0;
        right: initial;
        transform: translateX(0);
        text-overflow: ellipsis;
    }
    100% {
        right: 0;
        left: initial;
        transform: translateX(0);
        text-overflow: initial;
    }
}
</style>