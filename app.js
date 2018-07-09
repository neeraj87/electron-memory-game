const {
    app,
    BrowserWindow
} = require('electron');
const shell = require('electron').shell;
const path = require('path');
const url = require('url');

//set env to production
process.env.NODE_ENV = 'production';

let mainWindow;

function createMainWindow() {
    //create browser window
    mainWindow = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
    });

    //load index html page
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/windows/main.html'),
        protocol: 'file:',
        slashes: true 
    }));

    mainWindow.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
        app.quit();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createMainWindow();
    }
});