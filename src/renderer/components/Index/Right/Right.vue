<template>
    <div id="right">
        <keep-alive>
            <router-view name="body"></router-view>
        </keep-alive>           
    </div>
</template>

<script>
export default {
    data () {
      return {}
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
#right{
    flex: 1;
    height: calc( 100vh - 100px );
    padding-top: 40px;
}
</style>