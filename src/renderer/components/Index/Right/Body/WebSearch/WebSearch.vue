<template>
    <div>

        <router-link :to="{name:'search'}" tag="button">exit</router-link>

        <div class="top">
            <p class="title">网络搜索</p>
            <div class="ctrlBox">
                <button @click="goBack">后退</button>
                <button @click="goForward">前进</button>
                <button @click="reload">刷新</button>
            </div>
        </div>

        <webview
            ref="webview"
            class="webview"
            src="https://music.163.com/"
        />

    </div>
</template>

<script>
export default {
    data () {
      return {
          
      }
    },

    watch: {
        
    },

    mounted() {
        window.webview = this.$refs.webview
    },

    methods: {
        goForward() {
            this.$refs.webview.goForward()
        },
        goBack() {
            this.$refs.webview.goBack()
        },
        reload() {
            this.$refs.webview.reload()
        },
    },

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}

.webview{
    display:inline-flex;
    width: calc( 100vw - 100px );
    height: calc( 100vh - 250px );
    padding: 0 20px;
    border: .5px solid black;
}
</style>