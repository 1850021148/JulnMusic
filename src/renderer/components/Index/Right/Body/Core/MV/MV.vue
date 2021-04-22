<template>
    <div class="mv-box">

        <video v-if="mvSrc" :src="mvSrc" controls></video>
        
        <p v-else class="no-find">找不到MV</p>
    </div>
</template>

<script>
export default {
    data () {
      return {}
    },

    computed: {
        mvSrc() {
            return this.$store.state.playingSong.mvSrc
        },
    },

    methods: {},

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}

.mv-box{
    position: relative;
    width: 100vw;
    height: calc( 100vh - 190px );
}

video{
    width: 95%;
    height: calc( 100vh - 190px );
    margin: 2.5%;
    margin-top: 5px;
}

.no-find{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #aaa;
    cursor: default;
}
</style>