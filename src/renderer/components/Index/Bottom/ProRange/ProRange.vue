<template>
    <div id="proRange">
        <span class="currentTime">{{ parseTimeToStr(currentTime) }}</span>
        <input type="range" :value="currentTime" :max="duration" @change="changeBar" ref="range" />
        <span class="duration">{{ parseTimeToStr(duration) }}</span>
    </div>
</template>

<script>
export default {
    data () {
      return {}
    },

    computed: {
        currentTime() {
            return this.$store.state.currentTime
        },
        duration() {
            return this.$store.state.duration
        },
    },

    methods: {
        changeBar() {
            this.$store.commit('setCurrentTime',this.$refs.range.value)
            document.querySelector('audio').currentTime = this.$refs.range.value
        },
        parseTimeToStr(num) {
            num = ~~num
            if(num < 60){
                return (num < 10) ? '00:0' + num : '00:' + num
            }
            else{
                let min = ~~(num/60)
                if(min < 10){
                    min = '0' + min
                }
                let s = num%60
                if(s < 10){
                    s = '0' + s
                }
                return min + ':' + s
            }
        },
    },

    components: {},

}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
#proRange{
    display: flex;
    width: 100%;
    height: 40px;
}
.currentTime,.duration{
    display: block;
    width: 5em;
    height: 100%;
    color: white;
    text-align: center;
    line-height: 40px;
}
input{
    flex: 1;
}
</style>