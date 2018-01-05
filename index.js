const {app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        resizable: true,
        frame: false,
        show: false,
        icon: path.join(__dirname, 'assets/icons/icon.png')
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.focus();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});