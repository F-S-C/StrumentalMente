/**
 * @file app.js
 * 
 * È il file principale dell'applicazione. 
 * 
 * Contiene il processo principale ("_main process_") di Electron e gestisce, 
 * quindi, tutti gli eventi principali di StrumentalMente, tra cui:
 * - L'apertura dell'applicazione e il \emph{rendering} della prima finestra
 * - La chiusura dell'applicazione e le relative peculiarità di alcuni sistemi
 *     operativi (si pensi alla possibilità di ricreare la finestra appena chiusa su MacOS)
 * - L'apertura di finestre di dialogo
 * - L'apertura di finestra secondarie 
 */

const { app, BrowserWindow, ipcMain } = require("electron");
const JSONStorage = require('node-localstorage').JSONStorage;
const storageLocation = app.getPath('userData');
global.nodeStorage = new JSONStorage(storageLocation);

let win = null;

/**
 * Apre una finestra "figlia" e modale.
 * 
 * @param {String} pageUrl L'URL della pagina da aprire (assoluto o relativo)
 * @param {String} [windowIcon] L'icona della finestra.
 */
function openChildWindow(pageUrl, windowIcon = "./assets/icon.ico") {
	child = new BrowserWindow({ width: 800, height: 600, parent: win, modal: true, icon: windowIcon, frame: false });
	child.setMenu(null);
	child.loadFile(pageUrl);
	child.show();
}

/**
 * Crea la finestra principale.
 */
function createWindow() {
	var windowState = {};
	try {
		windowState = global.nodeStorage.getItem("windowstate");
	} catch (err) {
		windowState = {};
	}

	if (!windowState)
		windowState = { bounds: { width: 1066, height: 600 }, isMaximized: true };

	win = new BrowserWindow({
		width: windowState.bounds && windowState.bounds.width || 1066,
		height: windowState.bounds && windowState.bounds.height || 600,
		show: true,
		icon: "./assets/icon.ico",
		frame: false,
		center: true
	});
	win.loadFile("index.html");

	win.setMenu(null);

	if (windowState.isMaximized) {
		win.maximize();
	}

	win.on("closed", () => {
		win = null;
	});

	["resize", "move", "close"].forEach((e) => {
		win.on(e, () => {
			// Salvataggio delle impostazioni della finestra
			windowState.isMaximized = win.isMaximized();
			// se la finestra è massimizzata, è inutile aggiornare le dimensioni
			if (!windowState.isMaximized)
				windowState.bounds = win.getBounds();

			global.nodeStorage.setItem("windowstate", windowState);
		});
	});
}

app.on("ready", () => {
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin")
		app.quit();
});

app.on("activate", () => {
	if (win === null)
		createWindow();
});

var promptOptions;
var promptAnswer;
let promptWindow = null;

/**
 * Creazione della finestra di dialogo.
 * 
 * @param {BrowserWindow} parentWindow La finestra "genitore"
 * @param {Object} [options] Le opzioni della nuova finestra
 * @param {*} callback La funzione da richiamare alla chiusura della finestra
 */
function promptModal(parentWindow, options = {}, callback) {
	promptOptions = options;
	promptWindow = new BrowserWindow({
		width: options.width || 400,
		height: options.height || 250,
		parent: parentWindow,
		show: true,
		modal: true,
		title: options.title,
		frame: false,
		autoHideMenuBar: true
	});
	promptWindow.on('closed', () => {
		promptWindow = null;
		callback(promptAnswer);
	});

	promptWindow.loadFile("./dialogs/exit-dialog.html");
}

/** Chiamata dalla finestra del dialogo per ottenere i suoi parametri */
ipcMain.on("openDialog", (event, data) => {
	event.returnValue = JSON.stringify(promptOptions, null, '');
});

/** Chiamata dalla finestra del dialogo alla sua chiusura */
ipcMain.on("closeDialog", (event, data) => {
	promptAnswer = data;
});

/** Chiamata dall'applicazione per aprire la finestra di dialogo */
ipcMain.on("prompt", (event, options) => {
	if (!promptWindow)
		promptModal(win, options, (data) => {
			event.returnValue = data;
		});
	else
		event.returnValue = undefined;
});