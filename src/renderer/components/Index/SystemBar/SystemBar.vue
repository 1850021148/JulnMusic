<template>
    <div id="sysBar" ref="sysBar">

        <ul>
            <li class="min" @click="min">
                <i class="fa fa-window-minimize" aria-hidden="true"></i>
            </li>
            <li class="max" @click="max">
                <i v-show="isMax" class="fa fa-window-restore" aria-hidden="true"></i>
                <i v-show="!isMax" class="fa fa-window-maximize" aria-hidden="true"></i>
            </li>
            <li id="close" @click="close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </li>
        </ul>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    data () {
      return {
          isMax: false,
      }
    },

    mounted() {
        window.onblur = () => {
            this.$refs.sysBar.style.opacity = '.4'
        },
        window.onfocus = () => {
            this.$refs.sysBar.style.opacity = '.6'
        }
    },

    methods: {
        close() {
            window.close()
        },
        min() {
            ipcRenderer.send('changeMainWindow','min')
        },
        max() {
            if(this.isMax) { // 窗口还原
                ipcRenderer.send('changeMainWindow','return')
            }
            else{ // 窗口最大化
                ipcRenderer.send('changeMainWindow','max',window.innerWidth,window.innerHeight)
            }
            this.isMax = !this.isMax
        }
    },

    components: {
    },
}
</script>

<style scoped>
#sysBar{
    position: fixed;
    left: 60px;
    width: calc( 100vw - 60px );
    height: 40px;
    color: #aaa;
    -webkit-app-region: drag;
}
#sysBar>ul{
    position: absolute;
    width: 120px;
    height: 40px;
    top: 0;
    right: 0;
    z-index: 200;
}
#sysBar>ul>li{
    float: left;
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    -webkit-app-region: no-drag;
}

.min{
    font-size: 18px;
    line-height: 35px;
}
.max{
    font-size: 18px;
    line-height: 42px;
}
#close{
    font-size: 24px;
    line-height: 40px;
}

/* hover */
#sysBar>ul>li:hover{
    background: rgb(230, 230, 230);
}
#close:hover{
    background: red !important;
    color: white;
}
</style>