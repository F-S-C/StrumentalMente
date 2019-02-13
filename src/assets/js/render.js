/**
 * @file render.js
 * 
 * @abstract Funzioni per il rendering della pagina.
 * 
 * Questo file contiene alcune funzioni che sono chiamate
 * durante il rendering della pagina. Alcune di queste
 * funzioni sono **essenziali** per il funzionamento
 * dell'applicazione stessa.
 */

const remote = require('electron').remote; // Riferimento a Electron

/**
 * @abstract Gestisce gli eventi della titlebar.
 * 
 * Questa funzione gestisce gli eventi (riduci a icona, massimizza/minimizza,
 * chiudi) che sono acessibili tramite la titlebar.
 */
(function () {
    // Quando il documento ha terminato il caricamento, inizializza
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    function init() {
        let window = remote.getCurrentWindow();
        const minButton = document.getElementById('min-button'),
            maxButton = document.getElementById('max-button'),
            restoreButton = document.getElementById('restore-button'),
            closeButton = document.getElementById('close-button'),
            titleText = document.getElementById('window-title-text');

        titleText.innerHTML = remote.getCurrentWindow().getTitle();

        let minimize = event => window.minimize();
        let maximize = event => { window.maximize(); toggleMaxRestoreButtons(); };
        let restore = event => { window.unmaximize(); toggleMaxRestoreButtons(); };
        let close = event => {
            if (closeButton.classList.contains("sub-window"))
                window.close();
            else
                showExitDialog();
        }

        if (minButton) {
            minButton.removeEventListener("click", minimize);
            minButton.addEventListener("click", minimize);
        }

        if (maxButton) {
            maxButton.removeEventListener("click", maximize);
            maxButton.addEventListener("click", maximize);
        }

        if (restoreButton) {
            restoreButton.removeEventListener("click", restore);
            restoreButton.addEventListener("click", restore);
        }

        /* 
         * Switch tra i bottoni massimizza/ripristina quando avviene la
         * massimizzazione/ripristino della finestra per mezzo di azioni
         * diverse dal click del tasto apposito (es: doppio click della
         * barra del titolo).
         */
        if (minButton && restoreButton) {
            toggleMaxRestoreButtons();
            window.on('maximize', toggleMaxRestoreButtons);
            window.on('unmaximize', toggleMaxRestoreButtons);
        }

        closeButton.removeEventListener("click", close);
        closeButton.addEventListener("click", close);

        function toggleMaxRestoreButtons() {
            if (window.isMaximized()) {
                maxButton.style.display = "none";
                restoreButton.style.display = "flex";
            } else {
                restoreButton.style.display = "none";
                maxButton.style.display = "flex";
            }
        }
    }
})();

(function () {
    const Mousetrap = require("mousetrap");
    Mousetrap.bind("esc", showExitDialog);

    // Un piccolo easter egg da parte degli FSC :)!
    require("mousetrap").bind("up up down down left right left right b a enter", () => {
        const { ipcRenderer } = require("electron");

        var answer = ipcRenderer.sendSync("prompt", {
            title: "Wow!",
            label: "Wow! Fai anche tu parte del ristretto club di giocatori NES?!<br />\
                    Siamo onorati di averti come nostro utente!<br />\
                    <i>&mdash; by FSC</i>",
            yes: "Wow!",
            yesReturn: false,
            no: "Ehm... Ok",
            noReturn: false,
            width: 600
        });
        if (answer)
            remote.app.quit();
    });
})();

function showExitDialog() {
    const { ipcRenderer } = require("electron");

    var answer = ipcRenderer.sendSync("prompt", {
        title: "Sicuro?",
        label: "Sicuro di voler uscire dall'applicazione?",
        yes: "Sì",
        yesReturn: true,
        no: "No",
        noReturn: false
    });
    if (answer)
        remote.app.quit();
}

function openInBrowser(link) {
    remote.shell.openExternal(link);
}

function openModal(content, windowIcon = "./assets/icon.ico") {
    var win = new remote.BrowserWindow({ width: 800, height: 600, parent: remote.getCurrentWindow(), modal: true, icon: windowIcon, frame: false });
    win.setMenu(null);
    if (/^(f|ht)tp(s?):\/\//i.test(content))
        win.loadURL(content);
    else
        win.loadFile(content);
}

function openOnKeyboardShortcut(shortcut, content, openAsModal = false) {
    const Mousetrap = require("mousetrap");
    Mousetrap.bind(shortcut.toLowerCase(), () => {
        if (!openAsModal) {
            if (/^(f|ht)tp(s?):\/\//i.test(content))
                remote.getCurrentWindow().loadURL(content);
            else
                remote.getCurrentWindow().loadFile(content);
        }
        else {
            openModal(content);
        }
    });

    Mousetrap.bind("a b c", () => { window.alert("d e f"); });
}