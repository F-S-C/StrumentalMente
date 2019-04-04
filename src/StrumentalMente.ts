/**
 * @file StrumentalMente.js
 *
 * È il file contenente le definizioni principali dell'applicazione. 
 *
 * Contiene il processo principale ("_main process_") di Electron e gestisce,
 * quindi, tutti gli eventi principali di StrumentalMente, tra cui:
 * - L'apertura dell'applicazione e il \emph{rendering} della prima finestra
 * - La chiusura dell'applicazione e le relative peculiarità di alcuni sistemi
 *     operativi (si pensi alla possibilità di ricreare la finestra appena
 *     chiusa su MacOS)
 * - L'apertura di finestre di dialogo
 * - L'apertura di finestra secondarie 
 */
import { BrowserWindow, ipcMain } from 'electron';
import { JSONStorage } from 'node-localstorage';
import { userInfo } from 'os';

/**
 * La classe contenente la logica principale dell'applicazione.
 * @class Main
 */
export default class Main {
	static mainWindow: Electron.BrowserWindow;
	static application: Electron.App;
	static BrowserWindow;
	static nodeStorage: JSONStorage;
	static windowState = {
		bounds: {
			width: 1066,
			height: 600
		},
		isMaximized: true
	};
	static allQuizzes = {
		'base': undefined,
		'avanzata': undefined,
		'piano': undefined,
		'chitarra': undefined,
		'basso': undefined,
		'batteria': undefined,
		'accordi-basso': undefined,
		'accordi-chitarra': undefined,
		'accordi-piano': undefined
	};
	static username: string;

	private static onWindowAllClosed() {
		if (process.platform !== 'darwin') {
			Main.application.quit();
		}
	}

	private static onClose() {
		Main.mainWindow = null;
	}

	/**
	 * Crea la finestra principale.
	 */
	private static onReady() {
		try {
			Main.windowState = Main.nodeStorage.getItem("WindowState");
			Main.windowState = Main.windowState ? Main.windowState : { bounds: { width: 1066, height: 600 }, isMaximized: true };
		} catch (err) {
			Main.nodeStorage.setItem("WindowState", {});
			Main.windowState = { bounds: { width: 1066, height: 600 }, isMaximized: true };
		}

		try {
			let temp = Main.nodeStorage.getItem('Profile');
			Main.username = temp ? temp['username'] : '';
			Main.allQuizzes = temp ? temp['quiz'] : {
				'base': undefined,
				'avanzata': undefined,
				'piano': undefined,
				'chitarra': undefined,
				'basso': undefined,
				'batteria': undefined,
				'accordi-basso': undefined,
				'accordi-chitarra': undefined,
				'accordi-piano': undefined
			};
		} catch (err) {
			Main.username = "";
			Main.allQuizzes = {
				'base': undefined,
				'avanzata': undefined,
				'piano': undefined,
				'chitarra': undefined,
				'basso': undefined,
				'batteria': undefined,
				'accordi-basso': undefined,
				'accordi-chitarra': undefined,
				'accordi-piano': undefined
			};
		}

		if (!Main.username) {
			Main.username = userInfo().username;
			Main.nodeStorage.setItem('Profile', { 'username': Main.username, 'quiz': Main.allQuizzes });
		}

		Main.mainWindow = new Main.BrowserWindow({
			width: Main.windowState.bounds && Main.windowState.bounds.width || 1066,
			height: Main.windowState.bounds && Main.windowState.bounds.height || 600,
			show: false,
			icon: "./assets/icon.ico",
			frame: false,
			center: true,
			webPreferences: {
				nodeIntegration: true
			}
		});
		Main.mainWindow.loadURL('file://' + __dirname + '/index.html');
		Main.mainWindow.setMenu(null);
		Main.mainWindow.on('closed', Main.onClose);
		Main.mainWindow.on('ready-to-show', () => {
			if (Main.windowState.isMaximized)
				Main.mainWindow.maximize();
			Main.mainWindow.show();
		});
		['resize', 'move', 'close'].forEach((e: any) => {
			Main.mainWindow.on(e, () => {
				// Salvataggio delle impostazioni della finestra
				Main.windowState.isMaximized = Main.mainWindow.isMaximized();
				// se la finestra è massimizzata, è inutile aggiornare le dimensioni
				if (!Main.windowState.isMaximized)
					Main.windowState.bounds = Main.mainWindow.getBounds();

				Main.nodeStorage.setItem("WindowState", Main.windowState);
			});
		});
	}

	private static onActivate() {
		if (Main.mainWindow === null)
			Main.onReady();
	}

	static promptOptions;
	static promptAnswer;
	static promptWindow = null;

	/**
	 * Creazione della finestra di dialogo.
	 * 
	 * @param {BrowserWindow} parentWindow La finestra "genitore"
	 * @param {Object} [options] Le opzioni della nuova finestra
	 * @param {*} callback La funzione da richiamare alla chiusura della finestra
	 */
	private static promptModal(parentWindow, options: { width: number, height: number, title: string }, file = "./dialogs/exit-dialog.html", callback) {
		Main.promptOptions = options;
		Main.promptWindow = new BrowserWindow({
			width: options.width || 400,
			height: options.height || 250,
			parent: parentWindow,
			show: false,
			modal: true,
			title: options.title,
			frame: false,
			autoHideMenuBar: true,
			webPreferences: {
				nodeIntegration: true
			}
		});

		Main.promptWindow.on("ready-to-show", () => {
			Main.promptWindow.show();
		});
		Main.promptWindow.on('closed', () => {
			Main.promptWindow = null;
			callback(Main.promptAnswer);
		});

		Main.promptWindow.loadFile(file);
	}

	/**
	 * Contiene il _main_ dell'applicazione.
	 * 
	 * @param app Riferimento all'applicazione
	 * @param browserWindow Riferimento alla finestra principale
	 */
	static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
		// we pass the Electron.App object and the  
		// Electron.BrowserWindow into Main function 
		// so Main class has no dependencies. Main 
		// makes the code easier to write tests for 
		Main.BrowserWindow = browserWindow;
		Main.application = app;
		Main.application.commandLine.appendSwitch('enable-experimental-web-platform-features');
		Main.nodeStorage = new JSONStorage(app.getPath('userData'));
		Main.application.on('window-all-closed', Main.onWindowAllClosed);
		Main.application.on('ready', Main.onReady);
		Main.application.on('activate', Main.onActivate);

		/** Chiamata dalla finestra del dialogo per ottenere i suoi parametri */
		ipcMain.on("openDialog", (event, data) => {
			event.returnValue = JSON.stringify(Main.promptOptions, null, '');
		});

		/** Chiamata dalla finestra del dialogo alla sua chiusura */
		ipcMain.on("closeDialog", (event, data) => {
			Main.promptAnswer = data;
		});

		/** Chiamata dall'applicazione per aprire la finestra di dialogo */
		ipcMain.on("prompt", (event, options) => {
			if (!Main.promptWindow)
				Main.promptModal(Main.mainWindow, options, options.file || "./dialogs/exit-dialog.html", (data) => {
					event.returnValue = data;
				});
			else
				event.returnValue = undefined;
		});

		/** Salva i/il quiz */
		ipcMain.on("save-quiz", (event, quiz) => {
			if (quiz.id == "*" && quiz.passed == undefined)
				Main.allQuizzes = {
					'base': undefined,
					'avanzata': undefined,
					'piano': undefined,
					'chitarra': undefined,
					'basso': undefined,
					'batteria': undefined,
					'accordi-basso': undefined,
					'accordi-chitarra': undefined,
					'accordi-piano': undefined
				};
			else
				Main.allQuizzes[quiz.id] = quiz.passed;

			Main.nodeStorage.setItem("Profile", { 'username': Main.username, 'quiz': Main.allQuizzes });

			event.returnValue = quiz.passed;
		});

		/** Ottiene il punteggio di un quiz */
		ipcMain.on("get-quiz", (event, quizName) => {
			event.returnValue = Main.allQuizzes ? Main.allQuizzes[quizName] : undefined;
		});

		/** Ottiene lo username dell'utente */
		ipcMain.on("get-user", (event) => {
			event.returnValue = Main.username;
		});

		/** Salva il nome utente */
		ipcMain.on("save-user", (event, newUser) => {
			Main.username = newUser;

			Main.nodeStorage.setItem("Profile", { 'username': Main.username, 'quiz': Main.allQuizzes });

			event.returnValue = true;
		});
	}
}