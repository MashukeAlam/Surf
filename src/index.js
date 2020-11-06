const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  screen,
  shell
} = require('electron')
const url = require('url');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

//now

let win;



//IPC
ipcMain.on('test', (e, args) => {
  if (args !== null) {
    console.log(args);
  }

  e.sender.send('test', 'Received!');
});



const createWindow = () => {
  //Browser windows config
  const _width = screen.getPrimaryDisplay().bounds.width
  const _height = screen.getPrimaryDisplay().bounds.height

  win = new BrowserWindow({
    x: 10,
    y: _height / 2 - 300,
    width: 800,
    height: 600,
    icon: __dirname + '/assets/icons/win/icon.ico',
    frame: false,
    webPreferences: { nodeIntegration: true, webviewTag: true }
  })

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
  win.on('closed', () => {
    app.quit()
  })

};


app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
