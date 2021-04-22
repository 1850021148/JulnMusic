<template>
    <div>
        <div class="type" @click="toggleType">
            <i v-if="type == 0" class="fa fa-random" aria-hidden="true"></i>
            <i v-else-if="type == 1" class="fa fa-exchange" aria-hidden="true"></i>
            <i v-else-if="type == 2" class="fa fa-repeat" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
export default {
    data () {
      return {
          type: 0, // 0随机 1顺序 2单曲循环
      }
    },

    created() {
        this.$store.commit('setPlayingType',this.type)
    },

    methods: {
        toggleType() {
            if(this.type < 2){
                this.type++
                this.$store.commit('setPlayingType',this.type)
            }
            else{
                this.type = 0
                this.$store.commit('setPlayingType',this.type)
            }
        },
    },

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
.type{
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    background: rgb(27, 94, 144);
}
.type:hover{
    border: .5px solid black;
    background: rgb(27, 66, 144);
}
</style>