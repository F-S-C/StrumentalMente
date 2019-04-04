/**
 * @file app.ts
 *
 * È il file principale dell'applicazione. 
 *
 * Utilizza la classe Main definita in StrumentalMente.js per far funzionare
 * l'applicazione.
 */

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

import { app, BrowserWindow } from 'electron';
import Main from './StrumentalMente';

Main.main(app, BrowserWindow);
