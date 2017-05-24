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

  const promisesArray = videos.map(video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        err ? console.log('ffprobe err:', err) : null
        resolve(metadata)
      })
    })
  })

  // .all() method waits for all Promises in promisesArray to
  // resolve before `Promise` that is called on resolves itself

  Promise.all(promisesArray)
    .then(results => console.log(results))
})