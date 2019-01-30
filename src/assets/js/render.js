/**
 * @file render.js
 * @abstract Funzioni per il rendering della pagina.
 * Questo file contiene alcune funzioni che sono chiamate
 * durante il rendering della pagina. Alcune di queste
 * funzioni sono **essenziali** per il funzionamento
 * dell'applicazione stessa.
 */

const remote = require('electron').remote; // Riferimento globale a Electron

function handleWindowControls() {
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

        minButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.minimize();
        });

        maxButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.maximize();
            toggleMaxRestoreButtons();
        });

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
        toggleMaxRestoreButtons();
        window.on('maximize', toggleMaxRestoreButtons);
        window.on('unmaximize', toggleMaxRestoreButtons);

        closeButton.addEventListener("click", event => {
            window = remote.getCurrentWindow();
            window.close();
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
}

handleWindowControls();