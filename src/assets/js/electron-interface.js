function openInBrowser(link) {
    require("electron").shell.openExternal(link);
}

function openModal(content, windowIcon = "./assets/icon.ico") {
    const remote = require('electron').remote;
    var win = new remote.BrowserWindow({ width: 800, height: 600, parent: remote.getCurrentWindow(), modal: true, icon: windowIcon, frame: false });
    win.setMenu(null);
    if (/^(f|ht)tp(s?):\/\//i.test(content))
        win.loadURL(content);
    else
        win.loadFile(content);
}