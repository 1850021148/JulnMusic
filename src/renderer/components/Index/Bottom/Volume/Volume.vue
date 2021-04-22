<template>
    <div class="volumeBox">
        <div class="show" @click="toggoleShow" tabindex="0" outline="0" hidefocus="true" @blur="blur">
            <i class="fa fa-volume-up" aria-hidden="true" ref="open"></i>
            <i class="fa fa-volume-down" aria-hidden="true" ref="close"></i>
        </div>
        <input v-show="this.isShow" @change="changeVolume" type="range" v-model="volume" max="1" step=".01" />
    </div>
</template>

<script>
export default {
    data () {
      return {
          isShow: false,
          volume: 1,
      }
    },

    mounted() {
        document.querySelector('audio').volume = this.volume
        if(document.querySelector('audio').volume == 0) {
            this.$refs.open.style.display = 'none'
            this.$refs.close.style.display = ''
        }
        else{
            this.$refs.open.style.display = ''
            this.$refs.close.style.display = 'none'
        }
    },

    methods: {
        toggoleShow() {
            this.isShow = !this.isShow
        },
        changeVolume() {
            document.querySelector('audio').volume = this.volume
            if(document.querySelector('audio').volume == 0) {
                this.$refs.open.style.display = 'none'
                this.$refs.close.style.display = ''
            }
            else{
                this.$refs.open.style.display = ''
                this.$refs.close.style.display = 'none'
            }
        },
        blur() {
            this.isShow = false
        },
    },

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
.volumeBox{
    position: relative;
    z-index: 200;
}
.show{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    position: relative;
    background: rgb(27, 94, 144);
    z-index: 10;
    color: white;
    outline: none;
}
.show:hover{
    border: .5px solid black;
    background: rgb(27, 66, 144);
}
input{
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 50% 50%;
    transform: rotate(-90deg) translate(62%,-140%);
    width: 100px;
}
</style>