import { app, BrowserWindow } from 'electron'

// import pkg from 'electron';
// console.log("package ", pkg)
// const { app, BrowserWindow } = pkg;

const createWindow = () => {
const win = new BrowserWindow({
    width: 800,
    height: 600
})

//win.loadFile('index.html')
win.loadFile('/Users/agurgul/projs/home/docs/artur.gurgul.pro/.build/index.html')
}

app.whenReady().then(() => {
createWindow()

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
})

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') app.quit()
})

// REPL
// { app } = await import('electron')

export function run() {
    console.log("running")
} 