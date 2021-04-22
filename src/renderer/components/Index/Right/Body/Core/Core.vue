<template>
    <div id="core">

        <!-- 相对定位,滤镜,歌曲封面 -->
        <div class="filter">
            <img :src="songData.imgSrc || defaultSrc">
        </div>

        <!-- 顶部 -->
        <div class="top">

            <!-- 退出按钮 -->
            <router-link :to="{ name: 'list' }" tag="button" class="exit">
                <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
            </router-link>

            <!-- 歌名,歌手名 -->
            <div class="title">
                <p class="songname">{{ songData.songname }}</p>
                <p class="songer">{{ songData.songer }}</p>
            </div>

        </div>

        <!-- 轮播点 -->
        <nav class="dots">
            <router-link :to="{ name: 'currentList' }" :class="{ 'list-dot': true, 'active-dot': this.$route.name === 'currentList' }" tag="div"></router-link>
            <router-link :to="{ name: 'lyric' }" :class="{ 'lyric-dot': true, 'active-dot': this.$route.name === 'lyric' }" tag="div"></router-link>
            <router-link :to="{ name: 'mv' }" :class="{ 'lyric-dot': true, 'active-dot': this.$route.name === 'mv' }" tag="div"></router-link>
        </nav>

        <!-- 歌词,列表 -->
        <keep-alive exclude="CurrentList">
            <router-view name="coreBody"></router-view>
        </keep-alive>
    </div>
</template>

<script>
import defaultSrc from '../../../../../assets/defaultCover.jpg'

export default {
    data () {
      return {
          defaultSrc,
      }
    },

    computed: {
        songData() {
            return this.$store.state.playingSong
        },
    },

    methods: {},

    components: {
        
    },
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
#core{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc( 100vh - 100px );
    background: black;
    overflow: hidden;
    color: white;
}

.exit{
    position: fixed;
    left: 0;
    top: 0;
    width: 60px;
    height: 40px;
    font-size: 30px;
    text-align: center;
    line-height: 40px;
    background: rgb(27, 94, 144);
    color: #ddd;
}
.exit:hover{
    background: rgb(15, 60, 144);
}

.filter{
    position: absolute;
    width: 150%;
    height: 150%;
    z-index: -100;
    filter: brightness(.5) blur(12px);
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.filter>img{
    width: 100%;
    height: 100%;
}

.top{
    height: 80px;
    padding: 0 55px;
    display: flex;
}

.dots{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 10px;
}
.lyric-dot,.list-dot{
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background: #777;
    border-radius: 50%;
    cursor: pointer;
}
.active-dot{
    background: #aaa;
}

.title{
    width: 100%;
    height: 80px;
}
.songname{
    width: 100%;
    height: 45px;
    color: white;
    font-size: 25px;
    text-align: center;
    line-height: 50px;
}
.songer{
    width: 100%;
    height: 35px;
    color: #ccc;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
}
</style>