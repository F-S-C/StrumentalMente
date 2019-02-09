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

        if (minButton)
            minButton.addEventListener("click", event => {
                window = remote.getCurrentWindow();
                window.minimize();
            });

        if (maxButton)
            maxButton.addEventListener("click", event => {
                window = remote.getCurrentWindow();
                window.maximize();
                toggleMaxRestoreButtons();
            });

        if (restoreButton)
            restoreButton.addEventListener("click", event => {
                window = remote.getCurrentWindow();
                window.unmaximize();
                toggleMaxRestoreButtons();
            });

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

        closeButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            if (closeButton.classList.contains("sub-window"))
                window.close();
            else if (closeButton.classList.contains("modal")) {
                require('electron-modal').hide();
                remote.getCurrentWindow().focus();
            }
            else
                showExitDialog();
        });

        function toggleMaxRestoreButtons() {
            window = remote.getCurrentWindow();
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
    require("electron-localshortcut").register(remote.getCurrentWindow(), "Esc", showExitDialog);
})();

function showExitDialog() {
    const modal = require('electron-modal');
    const path = require('path');
    var clicked = -1;

    modal.open("./dialogs/exit-dialog.html", { width: 400, height: 250, frame: false, modal: true, parent: remote.getCurrentWindow() }, {
        title: "Sicuro?"
    }).then((modalInstance) => {
        modalInstance.on('yes', () => {
            clicked = 1;
            remote.getCurrentWindow().focus();
        });
        modalInstance.on('no', () => {
            clicked = 0;
            remote.getCurrentWindow().focus();
        });
    });

    return clicked;
}

function openInBrowser(link) {
    require("electron").shell.openExternal(link);
}

function openModal(content, windowIcon = "./assets/icon.ico") {
    const remote = require("electron").remote;
    var win = new remote.BrowserWindow({ width: 800, height: 600, parent: remote.getCurrentWindow(), modal: true, icon: windowIcon, frame: false });
    win.setMenu(null);
    if (/^(f|ht)tp(s?):\/\//i.test(content))
        win.loadURL(content);
    else
        win.loadFile(content);
}

function openOnKeyboardShortcut(shortcut, content, openInSameWindow = true) {
    const remote = require("electron").remote;
    const electronLocalshortcut = require('electron-localshortcut');
    electronLocalshortcut.register(remote.getCurrentWindow(), shortcut, () => {
        if (/^(f|ht)tp(s?):\/\//i.test(content))
            remote.getCurrentWindow().loadURL(content);
        else
            remote.getCurrentWindow().loadFile(content);
    });
}