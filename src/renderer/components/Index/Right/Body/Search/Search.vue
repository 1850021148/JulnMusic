<template>
    <div>
        <router-link :to="{name:'localSearch'}" tag="p">本地搜索</router-link>
        <hr>
        <router-link :to="{name:'webSearch'}" tag="p">网络搜索</router-link>
        <hr>
        <p>AI识曲</p>
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
</style>