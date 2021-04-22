import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  // modules,
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  // strict: process.env.NODE_ENV !== 'production'

  state: {
    currentListName: null,
    currentTime: 0,
    duration: 0,
    playingSong: {},
    playingType: 0, // 0为随机, 1为列表循环, 2为单曲循环
    musicRootPath: 'C:/julnMusic',
    musicData: [],
  },
  mutations: {
    setCurrentListName(state,currentListName) {
      state.currentListName = currentListName
    },
    setCurrentTime(state,currentTime) {
      state.currentTime = currentTime
    },
    setDuration(state,duration) {
      state.duration = duration
    },
    setPlayingSong(state,songData) {
      state.playingSong = songData
    },
    setPlayingType(state,playingType) {
      state.playingType = playingType
    },
    setMusicRootPath(state,rootPath) {
      console.log('....................')
      state.rootPath = rootPath
    },
    setMusicData(state,musicData) {
      state.musicData = musicData
    }
  },
})
