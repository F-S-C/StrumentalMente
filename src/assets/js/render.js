/**
 * @file render.js
 * 
 * Funzioni per il rendering della pagina.
 * 
 * E il file principale del _rendering_ dell'applicazione. Contiene tutte
 * le funzioni da eseguire nel "rendering process" (processo di rendering) di
 * Electron.
 */

const remote = require('electron').remote; // Riferimento a Electron

/**
 * Gestisce gli eventi della titlebar.
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

	/**
	 * Inizializza la titlebar.
	 */
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

		/**
		 * Cicla tra i bottoni di massimizzazione e di
		 * minimizzazione della finestra alternativamente
		 */
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

// Imposta tutte le scorciatoie da tastiera più importanti
(function () {
	let win = remote.getCurrentWindow();
	const Mousetrap = require("mousetrap");

	Mousetrap.bind("esc", showExitDialog);

	Mousetrap.bind("f11", () => { win.setFullScreen(!win.isFullScreen()); });

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
			width: 600,
		});
		if (answer)
			remote.app.quit();
	});
})();

/**
 * Mostra il dialogo di richiesta di conferma di uscita.
 */
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

/**
 * Apre un link nel browser predefinito.
 * 
 * @param {String} link Il link da aprire
 */
function openInBrowser(link) {
	document.activeElement.blur();
	remote.shell.openExternal(link);
}

/**
 * Apre una finestra modale mostrante il contenuto richiesto.
 * 
 * @param {String} content Il link (assoluto o relativo) da aprire 
 * @param {Object} [options] Le opzioni della nuova finestra
 * @param {String} [windowIcon] L'icona della finestra modale
 */
function openModal(content, options = {}, windowIcon = "./assets/icon.ico") {
	var win = new remote.BrowserWindow({
		width: options.width || 1400,
		height: options.height || 800,
		parent: remote.getCurrentWindow(),
		modal: true,
		icon: windowIcon,
		frame: false
	});

	if (options.isMaximized)
		win.maximize();

	win.setMenu(null);
	if (/^(f|ht)tp(s?):\/\//i.test(content))
		win.loadURL(content);
	else
		win.loadFile(content);
}

/**
 * Apre, tramite una shortcut da tastiera,
 * una finestra mostrante il contenuto richiesto.
 * 
 * @param {String} shortcut La shortcut da utilizzare
 * @param {String} content Il link (assoluto o relativo) da aprire
 * @param {boolean} [openAsModal] Se è `true`, la finestra sarà aperta come modale, 
 * altrimenti sarà aperta nella stessa finestra.
 */
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
}

var shortcutDisabled = false;

function disableShortcuts() {
	shortcutDisabled = true;
}

window.addEventListener("load", () => {
	if (!shortcutDisabled) {
		const Mousetrap = require("mousetrap");

		Mousetrap.bind("alt+h", () => { remote.getCurrentWindow().loadFile("./home.html"); });
		Mousetrap.bind("alt+t b", () => { remote.getCurrentWindow().loadFile("./teoria-base.html"); });
		Mousetrap.bind("alt+t a", () => { remote.getCurrentWindow().loadFile("./teoria-avanzata.html"); });
		// Mousetrap.bind("alt+s", () => ...);
		// Mousetrap.bind("alt+s", () => ...);
		// Mousetrap.bind("alt+s", () => ...);
		// Mousetrap.bind("alt+s", () => ...);
		Mousetrap.bind("alt+m", () => { openModal("./map.html"); });
		Mousetrap.bind("alt+i", () => { openModal("./about.html", { isMaximized: true }); });
	}
});