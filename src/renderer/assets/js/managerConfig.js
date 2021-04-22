import Store from 'electron-store'
const eleStore = new Store()
window.eleStore = eleStore

export function getMusicRootPath() {
    return eleStore.get('musicRootPath')
}

export function setMusicRootPath(musicRootPath) {
    eleStore.set('musicRootPath',musicRootPath)
}





// 不用electron-store
// export function getMusicRootPath() {
//     return 'C:/JulnMusic'
// }

// export function setMusicRootPath(musicRootPath) {

// }
