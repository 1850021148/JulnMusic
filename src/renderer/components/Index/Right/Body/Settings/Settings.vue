<template>
    <div class="settingsBox">
        <h3>设置</h3>
        <br><hr>

        <ul class="body">
            <li>
                <h5>音乐文件根路径 :</h5>
                &nbsp;&nbsp;&nbsp;
                <input type="text" class="path" :value="rootPath" ref="musicDir">
                <button class="updata-music-dir" @click="updataMusicDir">修改</button>
            </li>
            <li>
                <h5>背景图片 :</h5>
                &nbsp;&nbsp;&nbsp;
                <input type="text" class="bg" :value="bgPath" @keyup="changeBg($event)" ref="bg">
                <button class="updata-bg" @click="updataBg">修改</button>
            </li>
        </ul>

    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { setMusicRootPath } from '@/assets/js/managerConfig.js'
import { exits } from 'fs'

export default {
    data () {
      return {

      }
    },

    computed: {
        rootPath() {
            return this.$store.state.rootPath
        },
        bgPath() {
            return this.$store.state.rootPath + 'bg/bg.jpg'
        }
    },

    methods: {
        updataMusicDir() {
            let newDir = this.$refs.musicDir.value
            if(confirm('是否修改目录')) {
                setMusicRootPath(newDir)
                this.$store.commit('setMusicRootPath',newDir)
                // 重启
                ipcRenderer.send('restart')
            }
        },
        updataBg() {
            console.log('修改背景图片,未完成')
            // 图片文件复制到appdata
        },
    },
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
.settingsBox{
    width: calc( 100vw - 60px );
    padding: 10px;
}
.body{
    padding: 10px;
}
.body>li{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    padding: 5px;
    opacity: .8;
    background: linear-gradient(90deg,rgba(255,255,255,0),rgb(240, 240, 240),rgba(255,255,255,0));
}
input[type=text]{
    text-align: center;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
    background: none;
    font-size: 18px;
    font-weight: 700;
}
h3{
    font-size: 30px;
    font-weight: 1000;
}
h5{
    font-size: 20px;
    font-weight: 1000;
}

.updata-music-dir,.updata-bg{
    display: block;
    margin-left: 5px;
    width: 50px;
    height: 25px;
    border-radius: 5px;
    background: #555;
    color: white;
    text-align: center;
    line-height: 25px;
}
.updata-music-dir:hover,.updata-bg:hover{
    background: #666;
    color: #ccc;
}
</style>