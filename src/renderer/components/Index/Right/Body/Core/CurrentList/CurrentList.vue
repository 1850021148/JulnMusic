<template>
    <div class="list-box">

        <p class="top">
            <span class="type">{{ getPlayingType( this.$store.state.playingType ) }}</span>
            {{ this.$store.state.currentListName && " --- " + this.$store.state.currentListName }}
        </p>

        <ul class="slide" ref="slide">

            <!-- 定位 -->
            <a class="go" @click="go">go</a>
            
            <li
                :class="{ 'song-box': true, active: $store.state.playingSong.songname === song.songname }"
                v-for="song in songs" :key="song.id"
                @click="changePlayingSong(song)"
            >

                <img :src="song.imgSrc ? song.imgSrc : defaultImgSrc" class="cover">

                <div class="content">
                    <p class="songname">{{ song.songname }}</p>

                    <div class="detail">
                        <span> &nbsp; </span>
                        <span class="songer">{{ song.songer }}</span>
                        <span> &nbsp; </span>
                        <span>{{ song.isLoadDown ? '已下载' : '未下载' }}</span>
                    </div>
                </div>
            </li>

            <!-- 占位元素,方便go的时候能go得更高 -->
            <div class="block"></div>
        </ul>
    </div>
</template>

<script>
import defaultImgSrc from '@/assets/defaultCover.jpg'

export default {
    name: 'CurrentList',

    data () {
      return {
          songs: null,
          defaultImgSrc,
      }
    },

    created() {
        this.getSongsByListName()
    },

    methods: {
        go() {
            let slide = this.$refs.slide
            if(document.querySelector('.active'))
                slide.scrollTop = document.querySelector('.active').offsetTop
        },
        getPlayingType( id ) {
            if(id === 0) {
                return '随机播放'
            }
            else if(id === 1) {
                return '列表循环'
            }
            else if(id === 2) {
                return '单曲循环'
            }
        },
        getSongsByListName() {
            const that = this
            let musicData = this.$store.state.musicData
            let currentListName = this.$store.state.currentListName

            if(typeof musicData !== 'object') return
            
            musicData.forEach(list => {
                if(list.listname === currentListName) {
                    that.songs = list.songs
                }
            });
        },
        changePlayingSong(song) {
            this.$store.commit('setPlayingSong',song)
        },
    },

}
</script>

<style scoped>
[v-cloak] {
    display: none;
}

.list-box{
    position: relative;
    width: 100vw;
    padding: 20px;
    cursor: default;
}

.top{
    height: 50px;
    line-height: 50px;
    font-size: 20px;
}
.type{
    color: #ccc;
}

.slide{
    position: relative;
    height: calc( 100vh - 270px );
    padding: 0 10px;
    overflow-y: scroll;
    -webkit-mask: -webkit-linear-gradient(top,black 85%,rgba(0,0,0,0));
}
.go{
    display: block;
    position: fixed;
    right: 30px;
    bottom: 130px;
    width: 25px;
    height: 25px;
    border: 1px solid white;
    border-radius: 20%;
    background: #888;
    text-align: center;
    line-height: 20px;
    color: white;
    text-decoration: none;
}
.go:hover{
    border: 1px solid #ccc;
    border-radius: 20%;
    background: white;
    color: #ccc;
}

.slide::-webkit-scrollbar{
    display: none;
}

.song-box{
    display: flex;
    padding: 15px;
}
.cover{
    display: block;
    width: 100px;
    height: 100px;
}
.content{
    flex: 1;
    height: 100px;
    padding: 20px;
}
.songname{
    height: 45px;
    line-height: 45px;
    font-size: 18px;
}
.detail{
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    color: #ccc;
}

/* 当前歌曲 */
.active .cover{
    border: 1px solid rgb(255,100,100);
    box-shadow: .5px .5px .5px;
    box-sizing: border-box;
}
.active .songname{
    color: rgb(255,100,100) !important;
}
.active .detail{
    color: rgb(255, 0, 0);
}

.block{
    width: 100%;
    height: calc( 100vh - 400px );
}
</style>