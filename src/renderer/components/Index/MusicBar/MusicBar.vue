<template>
    <div id="musicBar">
        <router-link :to="{ name: 'list' }" tag="li" :class="{ songList: true, active: $route.name === 'list' }">
            列表
        </router-link>
        <router-link :to="{ name: 'search' }" tag="li" :class="{ search: true, active: $route.name === 'search' }">
            搜索
        </router-link>
        <router-link :to="{ name: 'settings' }" tag="li" :class="{ settings: true, active: $route.name === 'settings' }">
            设置
        </router-link>
    </div>
</template>

<script>
export default {
    data () {
      return {}
    },

    methods: {},

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
#musicBar{
    width: 60px;
    height: calc( 100vh - 100px );
    background: rgb(180, 180, 180);
    position: relative;
}
#musicBar>li{
    color: black;
    cursor: pointer;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
#musicBar>li:hover{
    background: rgb(213, 213, 213);
}
#musicBar>.settings{
    position: absolute;
    bottom: 0;
    left: 0;
}

.active{
    border-left: 5px solid rgb(27,94,144);
}
</style>