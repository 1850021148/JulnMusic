<template>
    <div>
        <sys-bar id="sysBar"/>

        <div id="top">
            <music-bar/>
            <right/>
        </div>
        <bottom/>
    </div>
</template>

<script>
const getMusicData = require('@/assets/js/getMusicData.js')

import SysBar from './SystemBar/SystemBar.vue'
import MusicBar from './MusicBar/MusicBar.vue'
import Right from './Right/Right.vue'
import Bottom from './Bottom/Bottom.vue'
export default {
    data() {
        return {
            
        }
    },

    created() {
        let musicData = getMusicData(this.$store.state.rootPath)
        console.log('-----------------------',musicData)
        this.$store.commit('setMusicData',musicData)
    },

    methods: {},

    components: {
        MusicBar,
        Right,
        Bottom,
        SysBar,
    },
}
</script>

<style scoped>
[v-cloak]{
    display: none;
}

#sysBar{
    position: fixed;
    z-index: 200;
}

#top{
    display: flex;
}
</style>