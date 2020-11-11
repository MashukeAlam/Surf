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
// const contextMenu = require('electron-context-menu')



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

//now

let win;


// const menu = new Menu();
// menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
// menu.append(new MenuItem({ type: 'separator' }))
// menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

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

// app.on("web-contents-created", (e, contents) => {
//   // contextMenu({
//   //    window: contents,
//   //    showSearchWithGoogle: true,
//   //    showSaveImageAs: true,
//   //    showInspectElement: true
//   // });
//   // const contextMenu = require('electron-context-menu');

//   // This code adds 2 new items to the context menu to zoom in the window (in and out)
//   // Read other steps for more information


// // });
// app.on("web-contents-created", (e, contents) => { if (contents.getType() == "webview") { 
//   contextMenu({
//     window: webview,
//     showSaveImageAs: true,
//     showSearchWithGoogle: true,
//     showInspectElement: true,
//     showSaveLinkAs: true,
//     prepend: (params, actions, browserWindow) => [
//       {
//         role: "zoomIn"
//       },
//       {
//         role: "zoomOut"
//       },
//       {
//         label: 'On new tab',
        
//         click: () => {
//           // console.log(params.linkUrl, params.mediaType);
//           // console.log(actions);
//           // const everything_down_to_one = JSON.parse(JSON.stringify(actions))['linkURL'];
//           // console.log(JSON.parse(everything)['linkURL']);
//           // console.log(everything["linkURL"]);
//           // console.log(everything.linkURL);
//           // createTabs(everything_down_to_one, processTabs);

//         }
//       }
//     ],
//   });
  
//  } });