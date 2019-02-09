const { app, BrowserWindow, ipcMain } = require("electron");

let win = null;

function openChildWindow(pageUrl, windowIcon = "./assets/icon.ico") {
    child = new BrowserWindow({ width: 800, height: 600, parent: win, modal: true, icon: windowIcon, frame: false });
    child.setMenu(null);
    child.loadFile(pageUrl);
    child.show();
}

function createWindow() {
    win = new BrowserWindow({ width: 1066, height: 600, show: true, icon: "./assets/icon.ico", frame: false, center: true });
    win.loadFile("index.html");

    win.setMenu(null);
    win.maximize();

    const electronLocalshortcut = require('electron-localshortcut');
    electronLocalshortcut.register(win, 'F1', () => {
        openChildWindow("./help.html");
    });

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});

app.on("activate", () => {
    if (win === null)
        createWindow();
});

var promptOptions;
var promptAnswer;

/** Creazione della finestra di dialogo */
function promptModal(parentWindow, options, callback) {
    promptOptions = options;
    var promptWindow = new BrowserWindow({
        width: 400,
        height: 250,
        parent: parentWindow,
        show: true,
        modal: true,
        alwaysOnTop: true,
        title: options.title,
        frame: false,
        autoHideMenuBar: true
    });
    promptWindow.on('closed', () => {
        promptWindow = null;
        callback(promptAnswer);
    })

    promptWindow.loadFile("./dialogs/exit-dialog.html");
}

/** Chiamata dalla finestra del dialogo per ottenere i suoi parametri */
ipcMain.on("openDialog", (event, data) => {
    event.returnValue = JSON.stringify(promptOptions, null, '');
})

/** Chiamata dalla finestra del dialogo alla sua chiusura */
ipcMain.on("closeDialog", (event, data) => {
    promptAnswer = data;
})

/** Chiamata dall'applicazione per aprire la finestra di dialogo */
ipcMain.on("prompt", (event, notused) => {
    promptModal(win, {
        title: "Sicuro?",
        label: "Sicuro di voler uscire dall'applicazione?",
        yes: "Sì",
        no: "No"
    },
        function (data) {
            event.returnValue = data;
        }
    );
});