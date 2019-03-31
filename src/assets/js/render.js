/**
 * @file render.js
 * 
 * Funzioni per il rendering della pagina.
 * 
 * E il file principale del _rendering_ dell'applicazione. Contiene tutte
 * le funzioni da eseguire nel "rendering process" (processo di rendering) di
 * Electron.
 */

/** v. https://gist.github.com/paulcbetts/da85dd246db944c32427d72026192b41 */
(function () {
	// Include this at the very top of both your main and window processes, so that
	// it loads as soon as possible.
	//
	// Why does this work? The node.js module system calls fs.realpathSync a _lot_
	// to load stuff, which in turn, has to call fs.lstatSync a _lot_. While you
	// generally can't cache stat() results because they change behind your back
	// (i.e. another program opens a file, then you stat it, the stats change),
	// caching it for a very short period of time is :ok: :gem:. These effects are
	// especially apparent on Windows, where stat() is far more expensive - stat()
	// calls often take more time in the perf graph than actually evaluating the
	// code!!

	// npm install lru-cache first
	const LRU = require('lru-cache');
	var lru = new LRU({ max: 256, maxAge: 250/*ms*/ });

	var fs = require('fs');
	var origLstat = fs.lstatSync.bind(fs);

	// NB: The biggest offender of thrashing lstatSync is the node module system
	// itself, which we can't get into via any sane means.
	fs.lstatSync = function (p) {
		let r = lru.get(p);
		if (r) return r;

		r = origLstat(p);
		lru.set(p, r);
		return r;
	};
})();

const remote = require('electron').remote; // Riferimento a Electron

/**
 * Mostra un messaggio all'utente se il quiz propedeutico all'argomento scelto
 * non è stato completato. Se l'utente conferma di voler proseguire, viene
 * effettuata l'azione richiesta, altrimenti non si attua alcuna azione.
 *
 * @param {String} previousQuizId L'id del quiz propedeutico
 * @param {String} previousQuizName Il nome del quiz (da comunicare all'utente)
 * @param {String} topicToOpenName Il nome dell'argomento che si vuole aprire
 * @param {*} callback La funzione da eseguire se l'utente accetta di
 * proseguire.
 */
function warnIfIncomplete(previousQuizId, previousQuizName, topicToOpenName, callback) {
	const { ipcRenderer } = require("electron");
	var result = ipcRenderer.sendSync("get-quiz", previousQuizId);
	if (!result) {
		let hasBeenAsked = JSON.parse(sessionStorage.getItem(`${topicToOpenName}-notdone-asked`));
		sessionStorage.setItem(`${topicToOpenName}-notdone-asked`, "true");

		var answer = hasBeenAsked || ipcRenderer.sendSync("prompt", {
			title: "Attenzione!",
			label: `Hai scelto di proseguire <em>${topicToOpenName}</em> senza aver completato il quiz di <em>${previousQuizName}</em>! Sei sicuro di voler continuare?`,
			yes: "Sì",
			yesReturn: true,
			no: "No",
			noReturn: false,
			file: "./dialogs/exit-dialog.html"
		});

		if (answer)
			callback();
	}
	else
		callback();
}

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
		};

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
 * Mostra il dialogo di richiesta di conferma di uscita dal quiz.
 * 
 * @param {String} toOpen Il file da aprire se è cliccato il tasto
 * 'Sì'. Il percorso è relativo rispetto alla cartella principale.
 */
function showExitFromQuizDialog(toOpen) {
	const { ipcRenderer } = require("electron");

	var answer = ipcRenderer.sendSync("prompt", {
		title: "Sicuro?",
		label: "Sicuro di voler uscire dal quiz?",
		yes: "Sì",
		yesReturn: true,
		no: "No",
		noReturn: false
	});
	if (answer)
		remote.getCurrentWindow().loadFile(toOpen);
}

/**
 * Mostra il dialogo con il punteggio dei quiz.
 * 
 * @param {String} nomeQuiz Il nome del quiz.
 * @param {number} score Il punteggio ottenuto.
 * @param {number} total Il punteggio totale possibile.
 * @param {String} return_link  Il file da aprire se è cliccato il tasto
 * 'Ok'. Il percorso è relativo rispetto alla cartella principale.
 */
function showQuizDialog(nomeQuiz, score, total, return_link) {
	const { ipcRenderer } = require("electron");

	var answer = ipcRenderer.sendSync("prompt", {
		title: "Quiz - Risultato",
		label: "Hai ottenuto un punteggio di:",
		yes: "Verifica",
		yesReturn: true,
		no: "Ok",
		noReturn: false,
		scored: score,
		totalScore: total,
		file: "./dialogs/quiz-dialog.html"
	});

	ipcRenderer.sendSync("save-quiz", { id: nomeQuiz, passed: (score >= ((total / 2) + 1)) });

	if (answer)
		quizCompare();
	else
		window.location.href = '../../' + return_link + '.html';
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
		show: false,
		modal: true,
		icon: windowIcon,
		frame: false
	});

	win.on("ready-to-show", () => {
		if (options.isMaximized)
			win.maximize();
		win.show();
	});

	win.setMenu(null);
	if (/^(f|ht)tp(s?):\/\//i.test(content))
		win.loadURL(content);
	else
		win.loadFile(content);
}

/**
 * Ritorna l'username collegato a StrumentalMente.
 */
function getUsername() {
	const { ipcRenderer } = require("electron");
	let user = ipcRenderer.sendSync("get-user");
	return user;
}

/**
 * Imposta l'username dell'utente.
 * 
 * @param {String} newUsername Il nuovo username. 
 */
function setUsername(newUsername) {
	const { ipcRenderer } = require("electron");
	ipcRenderer.sendSync("save-user", newUsername);
	console.log("done");
}

/**
 * Ottiene il risultato del quiz scelto
 * 
 * @param {String} id L'id del quiz di cui interessa il risultato.
 */
function getQuiz(id) {
	const { ipcRenderer } = require("electron");
	let quiz = ipcRenderer.sendSync("get-quiz", id);
	return quiz;
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
		Mousetrap.bind("alt+t", () => { remote.getCurrentWindow().loadFile("./home-teoria.html"); });
		Mousetrap.bind("alt+s s", () => { remote.getCurrentWindow().loadFile("./home-strumenti.html"); });
		Mousetrap.bind("alt+s c", () => { warnIfIncomplete('base', 'teoria base', 'agli strumenti', () => { remote.getCurrentWindow().loadFile("./teoria-chitarra.html"); }); });
		Mousetrap.bind("alt+s b", () => { warnIfIncomplete('base', 'teoria base', 'agli strumenti', () => { remote.getCurrentWindow().loadFile("./teoria-basso.html"); }); });
		Mousetrap.bind("alt+s shift+b", () => { warnIfIncomplete('base', 'teoria base', 'agli strumenti', () => { remote.getCurrentWindow().loadFile("./teoria-batteria.html"); }); });
		Mousetrap.bind("alt+s p", () => { warnIfIncomplete('base', 'teoria base', 'agli strumenti', () => { remote.getCurrentWindow().loadFile("./teoria-piano.html"); }); });
		Mousetrap.bind("alt+a a", () => { remote.getCurrentWindow().loadFile("./home-accordi.html"); });
		Mousetrap.bind("alt+a c", () => { warnIfIncomplete('chitarra', 'teoria della chitarra', 'agli accordi della chitarra', () => { remote.getCurrentWindow().loadFile("./accordi-chitarra.html"); }); });
		Mousetrap.bind("alt+a b", () => { warnIfIncomplete('basso', 'teoria del basso', 'agli accordi del basso', () => { remote.getCurrentWindow().loadFile("./accordi-basso.html"); }); });
		Mousetrap.bind("alt+a p", () => { warnIfIncomplete('piano', 'teoria del pianoforte', 'agli accordi del pianoforte', () => { remote.getCurrentWindow().loadFile("./accordi-piano.html"); }); });
		Mousetrap.bind("alt+p", () => { remote.getCurrentWindow().loadFile("./profile.html"); });
		Mousetrap.bind("alt+m", () => { openModal("./map.html"); });
		Mousetrap.bind("alt+i", () => { openModal("./about.html"); });
	}
});