const { app, BrowserWindow, Menu } = require("electron");

let win;

function openChildWindow(pageUrl)
{
    child = new BrowserWindow({ width: 600, height: 400, parent: win, modal: true });
    child.setMenu(null);
    child.loadFile(pageUrl);
    child.show();
}

function createWindow() 
{
    var menu = Menu.buildFromTemplate([
        {
            label: 'Help',
            submenu: 
            [
                {
                    label: "About",
                    click: () => { openChildWindow("about.html"); }
                },
                {
                    label: "Help",
                    accelerator: "F11",
                    click: () => { openChildWindow("help.html"); }
                },
                {
                    label: "Exit",
                    accelerator: "Esc",
                    click: () => { app.quit(); }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu); 

    win = new BrowserWindow({ width: 800, height: 600, show: false, icon: "assets/icon.ico" });
    win.loadFile("index.html");
    win.on("ready-to-show", () => { win.maximize(); win.show(); });
    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin")
        app.quit();
});

app.on("activate", () => {
    if(win === null)
        createWindow();
});