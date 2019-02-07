const { app, BrowserWindow, dialog, Menu } = require("electron");
const modal = require("electron-modal");

let win;

function openChildWindow(pageUrl, windowIcon = "./assets/icon.ico") {
    child = new BrowserWindow({ width: 800, height: 600, parent: win, modal: true, icon: windowIcon, frame: false });
    child.setMenu(null);
    child.loadFile(pageUrl);
    child.show();
}

function createWindow() {
    modal.setup();
    win = new BrowserWindow({ width: 1066, height: 600, show: false, icon: "./assets/icon.ico", frame: false });
    win.loadFile("index.html");

    win.setMenu(null);

    const electronLocalshortcut = require('electron-localshortcut');
    electronLocalshortcut.register(win, 'F1', () => {
        openChildWindow("./help.html");
    });

    win.on("ready-to-show", () => { win.maximize(); win.show(); });

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