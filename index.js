const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Electron is ready')
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { backgroundThrottling: false }
  })
})