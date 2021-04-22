import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, lyricWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const lyricWinURL = `file://${__dirname}/index.html#lyricBox`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    minWidth: 460,
    minHeight: 450,
    useContentSize: true,
    width: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      webviewTag: true,
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
  mainWindow.webContents.on('did-finish-load', function(){
    // 向渲染进程发送winMusicPath
    mainWindow.webContents.send('getWinMusicPath',app.getPath('music'))
  })

}

function createLyricWindow() {
  // lyricWindow = new BrowserWindow({
  //   x: -660,
  //   y: -220,
  //   width: 600,
  //   height: 160,
  //   minWidth: 600,
  //   minHeight: 160,
  //   frame: false,
  //   transparent: true,
  //   show: false,
  // })
  // lyricWindow.loadURL(lyricWinURL)
  // lyricWindow.setAlwaysOnTop()
  // lyricWindow.setIgnoreMouseEvents(true)
  // // 控制歌词窗口的显示与隐藏
  // ipcMain.on('showLyric',(bool,str1,str2) => {
  //   if(bool)
  //     lyricWindow.show()
  //   else
  //     lyricWindow.hide()
  // })
}

app.on('ready', () => {
  createWindow()
  createLyricWindow()
})
// app.on('ready', createMinWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
  if(lyricWindow == null) {
    createLyricWindow()
  }
})

// 重启
ipcMain.on('restart',() => {
  app.relaunch()
  app.quit()
})

// 状态栏
let window_width,window_height
ipcMain.on('changeMainWindow', (event,arg,wid,hei) => {
  if(arg === 'min') {
    console.log('=============== min ==================')
    mainWindow.minimize()
  }
  else if(arg === 'max') {
    console.log('=============== max ==================',wid,hei)
    window_width = wid
    window_height = hei
    mainWindow.maximize()
  }
  else if(arg === 'return') {
    console.log('============= return =================')
    mainWindow.setSize(window_width,window_height)
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
