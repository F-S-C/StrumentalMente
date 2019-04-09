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
	const LRU = parent.require('lru-cache');
	var lru = new LRU({ max: 256, maxAge: 250/*ms*/ });

	var fs = parent.require('fs');
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

const remote = parent.require('electron').remote; // Riferimento a Electron

function openPage(pageToOpen, buttonToSetActiveId) {
	const path = require("path");
	let iFrame = parent.document.getElementById("content-frame");
	iFrame.focus();
	if (path.relative(path.join(__dirname, pageToOpen), iFrame.src.substring(8))) {
		iFrame.src = pageToOpen;
		document.querySelector("nav.main-navigation>ul li>button.active").classList.remove("active");
		document.querySelector(`#${buttonToSetActiveId}-nav-link>button`).classList.add("active");
	}
}

function setHelper(newHelper) {
	document.querySelector("#help-nav-link>button").onclick = () => {
		openModal(`./helpers/help-${newHelper}.html`);
	}
}

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
	const { ipcRenderer } = parent.require("electron");
	var result = ipcRenderer.sendSync("get-quiz", previousQuizId);
	if (!result) {
		let hasBeenAsked = JSON.parse(sessionStorage.getItem(`${topicToOpenName}-notdone-asked`));
		sessionStorage.setItem(`${topicToOpenName}-notdone-asked`, "true");

		let answer = hasBeenAsked;
		if (!answer) {
			const Dialog = parent.require("./assets/js/modal-dialog-module");
			let warningDialog = new Dialog;
			warningDialog.open({
				title: 'Attenzione!',
				content: `<p>Hai scelto di proseguire <em>${topicToOpenName}</em> senza aver completato il quiz di <em>${previousQuizName}</em>! Sei sicuro di voler continuare?</p>`,
				buttons: {
					"No": {
						style: "btn-outlined",
						autofocus: false,
						callback: () => { warningDialog.close(); }
					},
					"Sì": {
						style: "btn",
						autofocus: true,
						callback: () => { callback(); warningDialog.close(); }
					}
				}
			});
		}
		else
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
		const minButton = parent.document.getElementById('min-button'),
			maxButton = parent.document.getElementById('max-button'),
			restoreButton = parent.document.getElementById('restore-button'),
			closeButton = parent.document.getElementById('close-button'),
			titleText = parent.document.getElementById('window-title-text');

		titleText.innerHTML = window.getTitle();

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
			minButton.onclick = minimize;
		}

		if (maxButton) {
			maxButton.onclick = maximize;
		}

		if (restoreButton) {
			restoreButton.onclick = restore;
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

		closeButton.onclick = close;

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
	const Mousetrap = parent.require("mousetrap");

	Mousetrap.bind("esc", showExitDialog);

	Mousetrap.bind("f11", () => { win.setFullScreen(!win.isFullScreen()); });

	// Un piccolo easter egg da parte degli FSC :)!
	parent.require("mousetrap").bind("up up down down left right left right b a enter", () => {
		const Dialog = parent.require("./assets/js/modal-dialog-module");
		let bonusDialog = new Dialog;
		bonusDialog.open({
			title: 'Wow!',
			content: `<p>Wow! Fai anche tu parte del ristretto club di giocatori NES?!<br />
			Siamo onorati di averti come nostro utente!<br />
			<i>&mdash; by FSC</i></p>`,
			buttons: {
				"Ehm... Ok": {
					style: "btn-outlined",
					autofocus: false,
					callback: () => { bonusDialog.close(); }
				},
				"Wow!": {
					style: "btn",
					autofocus: true,
					callback: () => { bonusDialog.close(); }
				}
			}
		});
	});
})();

/**
 * Mostra il dialogo di richiesta di conferma di uscita.
 */
function showExitDialog() {
	const Dialog = parent.require("./assets/js/modal-dialog-module");
	let exitDialog = new Dialog;
	exitDialog.open({
		title: 'Sicuro?',
		content: "<p>Sicuro di voler uscire dall'applicazione?</p>",
		buttons: {
			"No": {
				style: "btn-outlined",
				autofocus: false,
				callback: () => { exitDialog.close(); }
			},
			"Sì": {
				style: "btn",
				autofocus: true,
				callback: () => { remote.app.quit(); }
			}
		}
	});
}

/**
 * Mostra il dialogo di richiesta di conferma di uscita dal quiz.
 * 
 * @param {String} toOpen Il file da aprire se è cliccato il tasto
 * 'Sì'. Il percorso è relativo rispetto alla cartella principale.
 */
function showExitFromQuizDialog(toOpen) {
	const path = require("path");
	const Dialog = require(path.join(path.resolve("./"), "./assets/js/modal-dialog-module"));
	let exitQuizDialog = new Dialog;
	exitQuizDialog.open({
		icon: path.join(path.resolve("./"), "./assets/icon.ico"),
		title: 'Sicuro?',
		content: "Sicuro di voler uscire dal quiz?",
		buttons: {
			"No": {
				style: "btn-outlined",
				autofocus: false,
				callback: () => { exitQuizDialog.close(); }
			},
			"Sì": {
				style: "btn",
				autofocus: true,
				callback: () => { window.location.href = `../../index.html?started=true&topic=${toOpen}&to-home=false`; }
			}
		}
	});
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
	const path = require("path");
	const Dialog = require(path.join(path.resolve("./"), "./assets/js/modal-dialog-module"));
	let quizDialog = new Dialog;
	quizDialog.open({
		icon: path.join(path.resolve("./"), "./assets/icon.ico"),
		title: 'Quiz - Risultato',
		content: `<p>Hai ottenuto in punteggio di:</p>
		<p><strong style="font-size: x-large;"><span id="score">${score}</span> / <span id="total">${total}</span></strong></p>`,
		buttons: {
			"Ok": {
				style: "btn-outlined",
				autofocus: false,
				callback: () => { window.location.href = `../../index.html?started=true&topic=${return_link}&to-home=true`; }
			},
			"Verifica": {
				style: "btn",
				autofocus: true,
				callback: () => { quizCompare(); quizDialog.close(); }
			}
		}
	});

	ipcRenderer.sendSync("save-quiz", { id: nomeQuiz, passed: (score >= (total / 2)) });
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
	var xhr = new XMLHttpRequest();
	xhr.open('GET', content, true);
	xhr.onreadystatechange = function () {
		if (this.readyState !== 4) return;
		if (this.status !== 200) return;
		const Dialog = parent.require("./assets/js/modal-dialog-module");
		let exitDialog = new Dialog;
		let width = (options.width && options.width > window.innerWidth) ? window.innerWidth : options.width;
		let height = (options.height && options.height > window.innerHeight) ? window.innerHeight : options.height;
		exitDialog.open({
			title: /<title>(.*?)<\/title>/gi.exec(this.responseText)[1],
			width: width || 1400,
			height: height || 800,
			content: /<body>((?:.|\s)*?)<\/body>/gmi.exec(this.responseText)[1],
			buttons: {},
			center: false,
		});
	};
	xhr.send();
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

function setShortcuts(doc = document) {
	if (!shortcutDisabled) {
		const Mousetrap = parent.require("mousetrap")(doc);

		Mousetrap.bind("alt+h", () => { parent.document.querySelector("#home-nav-link>button").click(); });
		Mousetrap.bind("alt+t", () => { parent.document.querySelector("#theory-nav-link>button").click(); });
		Mousetrap.bind("alt+s s", () => { parent.document.querySelector("#instruments-nav-link>button").click(); });
		Mousetrap.bind("alt+s c", () => { warnIfIncomplete('base', 'teoria base', 'agli strumenti', () => { parent.window.location.href = "./index.html?started=true&topic=teoria-chitarra&to-home=false"; }); });
		Mousetrap.bind("alt+s b", () => { warnIfIncomplete('base', 'teoria base', 'agli strumenti', () => { parent.window.location.href = "./index.html?started=true&topic=teoria-basso&to-home=false"; }); });
		Mousetrap.bind("alt+s shift+b", () => { warnIfIncomplete('base', 'teoria base', 'agli strumenti', () => { parent.window.location.href = "./index.html?started=true&topic=teoria-batteria&to-home=false"; }); });
		Mousetrap.bind("alt+s p", () => { warnIfIncomplete('base', 'teoria base', 'agli strumenti', () => { parent.window.location.href = "./index.html?started=true&topic=teoria-piano&to-home=false"; }); });
		Mousetrap.bind("alt+a a", () => { parent.document.querySelector("#chords-nav-link>button").click(); });
		Mousetrap.bind("alt+a c", () => { warnIfIncomplete('chitarra', 'teoria della chitarra', 'agli accordi della chitarra', () => { parent.window.location.href = "./index.html?started=true&topic=accordi-chitarra&to-home=false"; }); });
		Mousetrap.bind("alt+a b", () => { warnIfIncomplete('basso', 'teoria del basso', 'agli accordi del basso', () => { parent.window.location.href = "./index.html?started=true&topic=accordi-basso&to-home=false"; }); });
		Mousetrap.bind("alt+a p", () => { warnIfIncomplete('piano', 'teoria del pianoforte', 'agli accordi del pianoforte', () => { parent.window.location.href = "./index.html?started=true&topic=accordi-piano&to-home=false"; }); });
		Mousetrap.bind("alt+p", () => { parent.document.querySelector("#profile-nav-link>button").click(); });
		Mousetrap.bind("alt+m", () => { openModal("./map.html"); });
		Mousetrap.bind("alt+i", () => { openModal("./about.html"); });
		Mousetrap.bind("f1", () => { parent.document.querySelector("#help-nav-link>button").click(); });

		// Shortcut per debug
		Mousetrap.bind("f5", () => { window.location.reload(); });
		Mousetrap.bind("alt+backspace", () => window.history.back());
	}
}

let onLoadCallback = () => { setShortcuts(document); }
window.removeEventListener("load", onLoadCallback);
window.addEventListener("load", onLoadCallback);