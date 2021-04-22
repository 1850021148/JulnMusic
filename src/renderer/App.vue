<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getMusicRootPath, setMusicRootPath } from '@/assets/js/managerConfig.js'
import fs from 'fs'
import { ipcRenderer } from 'electron'

export default {
  name: 'ele-vue-start',

  created() {
    // 文件打不开直接执行这一段,再重启试试
    // ipcRenderer.on('getWinMusicPath',(event,winMusicPath) => {
    //   setMusicRootPath(winMusicPath + '/JulnMusic')
    // })

    // 判断是否初次使用应用,是则给参数
    let musicRootPath = getMusicRootPath()
    if(!musicRootPath) {
      ipcRenderer.on('getWinMusicPath',(event,winMusicPath) => {
        setMusicRootPath(winMusicPath + '/JulnMusic')
      })
    }
    // 将musicRootPath传store
    this.$store.commit('setMusicRootPath',musicRootPath)
  },

  mounted() {
    window.vue = this
    window.store = this.$store

    setTimeout(() => {
      const exitsBg = fs.existsSync(this.bgPath)
      document.body.style.background = `url('${exitsBg ? this.bgPath : ''}'`
    }, 100);
  },

  computed: {
    bgPath() {
      return this.$store.state.rootPath + 'bg/bg.jpg'
    }
  },
}
</script>

<style>
/* 全局 */
*{
  margin: 0;
  padding: 0;
  -webkit-user-select: none;
}
li{
  list-style-type: none;
}
span{
  cursor: default;
}
input{
  outline: none;
}
button{
  outline: none;
  border: none;
  background: none;
}

#app{
  overflow: hidden;
}
</style>
