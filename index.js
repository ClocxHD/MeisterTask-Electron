const {app, BrowserWindow, shell, Tray, Menu} = require('electron');
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
        show: false,
        icon: path.join(__dirname, 'assets/icons/icon.png'),
        webPreferences: {
            nodeIntegration: false
        }
    });

    mainWindow.setMenu(null);

    mainWindow.loadURL('https://www.meistertask.com/app/dashboard');

    const appIcon = new Tray(path.join(__dirname, '/assets/icons/icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                mainWindow.show();
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuitting = true;
                app.quit();
            }
        }
    ]);

    appIcon.setContextMenu(contextMenu);
    appIcon.setToolTip("MeisterTask Unofficial");

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.focus();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.on('minimize',function(event){
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        const protocol = require('url').parse(url).protocol;
        if (protocol === "http:" || protocol === 'https:') {
            shell.openExternal(url)
        }
    });

    appIcon.on('click', function () {
        mainWindow.show();
    });
});