const { app, BrowserWindow, ipcMain } = require('electron')
const ffmpeg = require('fluent-ffmpeg')


let mainWindow

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { backgroundThrottling: false }
  })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)
})

ipcMain.on('videos:added', (e, videos) => {

  const promise = new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videos[0].path, (err, metadata) => {
      resolve(metadata)
    })
  })

  promise.then(metadata => console.log(metadata))
})