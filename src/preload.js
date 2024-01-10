import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('menuUtils', {
    minimize: () => ipcRenderer.send('minimize'),
    toggleMaximize: () => ipcRenderer.send('toggleMaximize')
})

contextBridge.exposeInMainWorld('fileUtils', {
    selectFile: () => ipcRenderer.invoke('selectFile'),
    selectImage: () => ipcRenderer.invoke('selectImage'),
    addSoftware: (obj) => ipcRenderer.send('addSoftware', obj),
    updateSoftware: (obj) => ipcRenderer.send('updateSoftware', obj),
    deleteSave: (id) => ipcRenderer.send('deleteSave', id),
    deleteAllSoftware: () => ipcRenderer.send('deleteAllSoftware'),
    getAllSoftware: () => ipcRenderer.invoke('getAllSoftware'),
    launchSoftware: (path) => ipcRenderer.send('launchSoftware', path)
})
