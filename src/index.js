const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  dialog,
  screen,
  shell
} = require('electron')
const url = require('url');
const path = require('path');

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let win;

// //IPC
// ipcMain.on('test', (e, args) => {
//   if (args !== null) {
//     console.log(args);
//   }

//   e.sender.send('test', 'Received!');
// });

const createWindow = () => {
  const _width = screen.getPrimaryDisplay().bounds.width
  const _height = screen.getPrimaryDisplay().bounds.height

  win = new BrowserWindow({
    x: 10,
    y: _height / 2 - 300,
    width: 800,
    height: 600,
    icon: __dirname + '/assets/icons/win/icon.ico',
    frame: false,
    transparent: true,
    webPreferences: { nodeIntegration: true, webviewTag: true, spellcheck: true }
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
  });

  win.webContents.on('context-menu', (e, params) => {
    contextMenu();
  })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});