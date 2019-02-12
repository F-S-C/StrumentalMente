const { app, BrowserWindow, ipcMain } = require("electron");
const JSONStorage = require('node-localstorage').JSONStorage;
const storageLocation = app.getPath('userData');
global.nodeStorage = new JSONStorage(storageLocation);

let win = null;

function openChildWindow(pageUrl, windowIcon = "./assets/icon.ico") {
    child = new BrowserWindow({ width: 800, height: 600, parent: win, modal: true, icon: windowIcon, frame: false });
    child.setMenu(null);
    child.loadFile(pageUrl);
    child.show();
}

function createWindow() {
    var windowState = {};
    try {
        windowState = global.nodeStorage.getItem("windowstate");
    } catch (err) {
        // the file is there, but corrupt. Handle appropriately. 
    }

    if (!windowState)
        windowState = { bounds: { width: 1066, height: 600 }, isMaximized: true };

    win = new BrowserWindow({
        width: windowState.bounds && windowState.bounds.width || 1066,
        height: windowState.bounds && windowState.bounds.height || 600,
        show: true,
        icon: "./assets/icon.ico",
        frame: false,
        center: true
    });
    win.loadFile("index.html");

    win.setMenu(null);

    if (windowState.isMaximized) {
        win.maximize();
    }

    win.on("closed", () => {
        win = null;
    });

    ["resize", "move", "close"].forEach((e) => {
        win.on(e, () => {
            // Salvataggio delle impostazioni della finestra
            windowState.isMaximized = win.isMaximized();
            // se la finestra è massimizzata, è inutile aggiornare le dimensioni
            if (!windowState.isMaximized)
                windowState.bounds = win.getBounds();

            global.nodeStorage.setItem("windowstate", windowState);
        });
    });
}

app.on("ready", () => {
    createWindow();
});

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
let promptWindow = null;

/** Creazione della finestra di dialogo */
function promptModal(parentWindow, options, callback) {
    promptOptions = options;
    promptWindow = new BrowserWindow({
        width: 400,
        height: 250,
        parent: parentWindow,
        show: true,
        modal: true,
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
    if (!promptWindow)
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
    else
        event.returnValue = undefined;
});