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
	 * Contiene il _main_ dell'applicazione.
	 * 
	 * @param app Riferimento all'applicazione
	 * @param browserWindow Riferimento alla finestra principale
	 */
	static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
		Main.BrowserWindow = browserWindow;
		Main.application = app;
		Main.application.commandLine.appendSwitch('enable-experimental-web-platform-features');
		Main.nodeStorage = new JSONStorage(app.getPath('userData'));
		Main.application.on('window-all-closed', Main.onWindowAllClosed);
		Main.application.on('ready', Main.onReady);
		Main.application.on('activate', Main.onActivate);

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