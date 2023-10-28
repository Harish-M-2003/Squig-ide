const { contextBridge, ipcRenderer }  = require("electron");

contextBridge.exposeInMainWorld("preloadApi" , {
    close : () => ipcRenderer.send('close-ide'),
    unmaximize : () => ipcRenderer.send('unmaximize'),
    minimize : () => ipcRenderer.send('minimize'),
})
