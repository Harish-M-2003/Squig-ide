const { app, BrowserWindow ,ipcMain , dialog} = require('electron');
const path = require("path");
const fs = require("fs");
const {spawn} = require("child_process");


function extractFileName(path){
  return path.substring(path.lastIndexOf('\\')+1);
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,

    icon : path.join(__dirname , "icon.png"),
    frame : false,
    webPreferences: {
      preload : path.join(__dirname , ".." , "src","preload.js"),
    }
  })

  win.setMenu(null);

  win.webContents.openDevTools();

  win.loadURL('http://localhost:3000/');

  ipcMain.on("get-root-path" , () =>{
    win.webContents.send("set-root-path" , __dirname)
  })

  // ipcMain.on("execute-system-command" , (event , command) =>{

  //   const terminal = spawn(command)

  //   terminal.stdout.on("data" , (data) => {
  //     win.webContents.send("executed-output" , `${data}`)

  //   })
  // })

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

  ipcMain.on('new-file' , () => {
    dialog.showSaveDialog(win)
    .then(file => {

      fs.writeFile(file.filePath,"",(err) => {
        if (err){
          console.log("err")
        }
      })

      win.webContents.send("new-file-created" , extractFileName(file.filePath) , file.filePath)


    })
    .catch(err => console.log(err))
  })


  ipcMain.on("run-code" , (event , filename) =>{
    
    const terminal = spawn(path.join(__dirname , ".." , "src" , "Interpretor" , "Interpretor.exe") , [filename])

    terminal.stdout.on("data" , (data) => {
      win.webContents.send("executed-output" , `${data}`)

    })
    
  })

  ipcMain.on("save-file" , (event  , filepath , code) => {

    fs.writeFile(filepath , code , (err) => {
      if (err){
      console.log(err)
      }
    })
  })

  ipcMain.on('open-file' , () => {
    dialog.showOpenDialog(win)

    .then(file => {
      // console.log(file)
      // if (file.length != 0 && file.filePaths.length != 0){
      fs.readFile(file.filePaths[0] , "utf-8" , (err , data) => {
        if (err){
          console.log("Error " , err);
        } else {

          win.webContents.send("file-content" ,
              extractFileName(file.filePaths[0]),
              file.filePaths[0] ,
              data
          );
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
  })


}


app.whenReady().then(() => createWindow());

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

app.on('close-app' , () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on("close-ide" , () => {
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