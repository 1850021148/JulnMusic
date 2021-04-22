<template>
    <div id="listBox">

        <div class="top">
            <h2>歌曲列表</h2> <span>+</span>
        </div>

        <div class="slide">
            <ul class="lists">
                <li v-for="list in musicData" :key="list.id">
                    <h3>{{ list.listname }}</h3> <span>+</span>
                    <ul v-if="list.songs.length>0">
                        <li v-for="song in list.songs" :key="song.id" class="song" @click="setPlayingSong(song,list.listname)">
                            <h4 class="song">{{ song.songname }}</h4>
                            <span class="songer">{{ song.songer }}</span>
                            <span v-if="song.isLoadDown" class="isLoadDown">已下载</span>
                        </li>
                    </ul>
                    <p v-else class="empty">空</p>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data () {
      return {}
    },
    
    computed: {
        musicData() {
            return this.$store.state.musicData
        }
    },

    methods: {
        setPlayingSong(song,listname) {
            this.$store.commit('setCurrentListName',listname)
            this.$store.commit('setPlayingSong',song)
            console.log('playingSong: ',this.$store.state.playingSong)
        }
    },

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
#listBox{
    height: calc( 100vh - 140px );
    overflow-y: scroll;
    padding: 0 10px;
    cursor: default;
}
#listBox::-webkit-scrollbar{
    appearance: none;
    display: none;
}

.top{
    width: 100%;
    height: 40px;
}
h2{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
}
h2+span,h3+span{
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 25px;
    text-align: center;
}

.slide{
    width: 100%;
    height: calc( 100% - 60px );
    overflow-y: scroll;
    -webkit-mask: -webkit-linear-gradient(top,black 85%,rgba(0,0,0,0));
}
.slide::-webkit-scrollbar{
    display: none;
}

h3+span{
    width: 20px;
    height: 20px;
    line-height: 20px;
    transform: translateY(2px);
}
h2+span:hover,h3+span:hover{
    background: rgb(213, 213, 213);
    opacity: .8;
}
.lists{
    padding: 0 10px;
    padding-bottom: 30px;
}
h3{
    display: inline-block;
    font-size: 16px;
}
.songer{
    font-size: 12px;
    padding: 0 12px;
}
.empty,h4{
    font-size: 16px;
    font-weight: 700;
}
.song,.empty{
    padding: 0 10px;
    background: linear-gradient(90deg,rgba(255,255,255,0),rgb(240, 240, 240),rgba(255,255,255,0));
    opacity: .8;
    margin-top: 5px;
}
.empty{
    padding: 0 20px;
}

.song{
    position: relative;
}
.isLoadDown{
    position: absolute;
    right: 2em;
    top: 10px;
}
</style>