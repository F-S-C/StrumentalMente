const { app, BrowserWindow, Menu } = require("electron");

let win;

function openChildWindow(pageUrl, windowIcon = "assets/icon.ico") {
    child = new BrowserWindow({ width: 600, height: 400, parent: win, modal: true, icon: windowIcon });
    child.setMenu(null);
    child.loadFile(pageUrl);
    child.show();
}

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600, show: false, icon: "assets/icon.ico" });
    win.loadFile("index.html");

    win.setMenu(null);

    const electronLocalshortcut = require('electron-localshortcut');
    electronLocalshortcut.register(win, 'F11', () => {
        openChildWindow("help.html");
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