const { contextBridge, ipcRenderer }  = require("electron");

contextBridge.exposeInMainWorld("preloadApi" , {
    close : () => ipcRenderer.send('close-ide'),
    unmaximize : () => ipcRenderer.send('unmaximize'),
    minimize : () => ipcRenderer.send('minimize'),
    openFile : () => ipcRenderer.send("open-file"),
    fileContent : (callback) => ipcRenderer.on('file-content' , callback), 
    newFile : () => ipcRenderer.send("new-file"),
    newFileCreated : (callback) => ipcRenderer.on('new-file-created' , callback),

}

    // runCode : () => ipcRenderer.send("run-code"),
    // move : (x,y) => ipcRenderer.send('move-window' , x , y),
    // save : (tab_name) => ipcRenderer.send("save-file" , tab_name),
)
