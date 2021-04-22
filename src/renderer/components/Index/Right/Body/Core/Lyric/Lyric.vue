<template>
    <div class="lyricBox">

        <div class="slide" @scroll="myScroll($event)" ref="slide">

            <!-- 时间横轴,滑动歌词时出现,相对定位 -->
            <hr :class="{ 'showed-hr': requireShowTimerAndHr }" ref="hr">

            <!-- transform控制器 -->
            <div class="tran" ref="tran">

                <!-- 时间控制器 -->
                <nav :class="{ timer: true, 'showed-timer': requireShowTimerAndHr } " v-if="lyricArr" ref="timer">
                    <li v-for="(col,index) in lyricArr" :key="index" :class="{ 'time-active': index == lineNum }">
                        - {{ col.time }} -
                    </li>
                </nav>

                <!-- 歌词 -->
                <div v-if="lyricArr" class="lyricArr">
                    <ul>
                        <li v-for="(col,index) in lyricArr" :key="index" :class="{ lyric: true, active: index == lineNum}">
                            {{ col.lyric }}
                        </li>
                    </ul>
                </div>
                <p v-else class="noFind">未找到歌词</p>

            </div>

        </div>
        
    </div>
</template>

<script>
import { getLyric, parseTime, getLineNumByTime } from '@/assets/js/getLyric.js'

export default {
    data () {
      return {
          lyricArr: null,
          parseTime,

          requireShowTimerAndHr: false,
      }
    },

    computed: {
        songData() {
            return this.$store.state.playingSong
        },
        tran() {
            let padding = 230 // lyricBox的padding
            return `translateY( ${(window.innerHeight - padding)/2 - this.lineNum * 30 - 15}px)`
        },
        lineNum() {
            let currentTime = this.$store.state.currentTime
            if(this.lyricArr && currentTime) {
                return getLineNumByTime(this.lyricArr,currentTime)
            }
            else
                return 0
        }
    },

    created() {
        this.lyricArr = getLyric(this.songData.lyric)
    },

    mounted() {
        setTimeout(()=>{
            // 初始transfrom
            this.$refs.tran.style.transform = this.tran
            
            // 还原歌词,并隐藏timer
            this.returnLyricAndHidTimer()
        },20)
    },
    
    watch: {
        songData(newVal,oldVal) {
            if(newVal === oldVal) return
            this.lyricArr = getLyric(this.songData.lyric)
            console.log('lyric-arr\n',this.lyricArr)
        },
        lineNum(newVal,oldVal) {
            if(newVal === oldVal) return
            this.$refs.tran.style.transform = this.tran
        }
    },

    methods: {
        myScroll(e) {
            // 保留scrollTop
            console.log('正在滑动',e.target.scrollTop)
            // 显示timer
            this.requireShowTimerAndHr = true

        },
        // 监听滚动是否结束
        returnLyricAndHidTimer() {
            let delay = 3000 // 延迟多久
            setInterval(() => {
                if(this.$refs.slide.scrollTop) {
                    // 还原歌词位置
                    let interval = setInterval(() => {
                        if(this.$refs.slide.scrollTop == 0) {
                            // 隐藏timer
                            this.requireShowTimerAndHr = false
                            clearInterval(interval)
                        }
                        else
                            this.$refs.slide.scrollTop -= 30
                    },20)
                }
            },delay)
        },
        // 监听向上滚还是向下滚
        getDeltaY() {
            this.$refs.tran.onwheel = (e) => {
                if(e.deltaY > 0) {
                    this.deltaY = true
                }
                else if(e.deltaY < 0) {
                    this.deltaY = flase
                }
            }
        }
    },

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
.lyricBox{
    position: relative;
    width: 100%;
    height: calc( 100% - 90px );
    padding: 20px 0;
    overflow: hidden;
    cursor: default;
    /* 蒙版效果 */
    -webkit-mask: -webkit-linear-gradient(top,rgba(0,0,0,0) 15%,#000 70%,rgba(0,0,0,0));
}
.slide{
    height: 100%;
    overflow-y: scroll;
}
.slide::-webkit-scrollbar{
    display: none;
}
.tran{
    transition: .5;
}

hr{
    display: none;
}
.showed-hr{
    display: block;
    border: none;

    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: calc( 100vw - 20px );
    height: .5px;
    background: white;
}
.timer{
    float: left;
    width: 100px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0;
    text-align: center;
    line-height: 30px;
    color: #aaa;
}
.showed-timer>li{
    font-size: 14px;
}
.timer>li{
    height: 30px;
}
.lyricArr{
    float: left;
    width: calc( 100vw - 200px );
    text-align: center;
    padding-right: 100px;
}
.lyricArr .lyric{
    width: calc( 100vw - 200px );
    height: 30px;
    color: #ccc;
    font-size: 15px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.time-active{
    color: #ccc;
    font-size: 15px;
}
.active{
    color: white !important;
    font-size: 20px !important;
}

.noFind{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 20px;
}
</style>