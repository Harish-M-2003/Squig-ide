const { app, BrowserWindow , Menu , ipcMain, safeStorage } = require('electron')
const path = require("path")

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,

    icon : path.join(__dirname , "icon.png"),
    frame : false,
    // closable : false,
    webPreferences: {
      preload : path.join(__dirname , ".." , "src","preload.js"),
    }
  })

  // win.webContents.openDevTools();

  //load the index.html from a url
  win.setMenu(null);
  // win.maximize();
  win.loadURL('http://localhost:3000/');
  
  ipcMain.on('unmaximize' , () => {
    if (win.isMaximized()){
      win.unmaximize();
    } else {
      win.maximize();
    }
  })

  ipcMain.on('minimize' , () => {
    win.minimize();
  })


}



// // app.on("ready",createWindow)
app.whenReady().then(() => {
  createWindow();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('close-app' , () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on("close-ide" , () => {
  // localStorage.setItem({})
  if (process.platform !== 'darwin'){
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})