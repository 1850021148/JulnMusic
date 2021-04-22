<template>
    <div class="controlCore">
        <div class="before" @click="before">
            <i class="fa fa-step-backward" aria-hidden="true"></i>
        </div>
        <div class="play" @click="play">
            <i v-if="!paused" class="fa fa-pause-circle-o" aria-hidden="true" ref="pauseCircle"></i>
            <i v-else class="fa fa-play-circle-o" aria-hidden="true" ref="playCircle"></i>
        </div>
        <div class="next" @click="next">
            <i class="fa fa-step-forward" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
export default {
    data () {
      return {
          paused: true
      }
    },

    computed: {
        playingType() {
            return this.$store.state.playingType
        },
    },

    mounted() {
        const audio = document.querySelector('audio')
        audio.oncanplay = () => {
            this.paused = audio.paused
        }
    },

    methods: {
        before() {
            this.$emit('turn','before')
        },
        play() {
            const audio = document.querySelector('audio')
            if(audio.paused){
                console.log('audio: ',audio)
                audio.play()
            }
            else{
                audio.pause()
            }
            this.paused = audio.paused
        },
        next() {
            this.$emit('turn','next')
        },
    },

    components: {

    },
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
.controlCore{
    width: 180px;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.before,.play,.next{
    display: inline-block;
    color: white;
    border-radius: 50%;
    text-align: center;
}
.before,.next{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    background: rgb(27, 94, 144);
    font-size: 25px;
}
.play{
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 52px;
}
.play:hover{
    opacity: .8;
}
.before:hover,.next:hover{
    border: .5px solid black;
    background: rgb(27, 66, 144);
}
</style>