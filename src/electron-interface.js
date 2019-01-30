function openInBrowser(link) {
    require("electron").shell.openExternal(link);
}

function openModal(content, windowIcon = "./assets/icon.ico") {
    const remote = require('electron').remote;
    var win = new remote.BrowserWindow({ width: 800, height: 400, parent: remote.getCurrentWindow(), modal: true, icon: windowIcon });
    win.setMenu(null);
    win.loadURL(content);
}