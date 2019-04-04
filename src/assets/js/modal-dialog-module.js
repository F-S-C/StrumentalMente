"use strict";
class Dialog {
	constructor(id = undefined, win = window, doc = document) {
		this._document = doc;
		this._window = win;
		this._id = id ? id : new Date().getTime();
		this._mainDiv = this._document.createElement('div');
		this._overlayDiv = this._document.createElement('div');

		this._mainDiv.className = 'dialog-box';
		this._mainDiv.id = `dialog-box-${this._id}`;
		this._mainDiv.innerHTML = `<header>
										<div id="dialog-titlebar">
											<div id="dialog-drag-region">
												<div id="dialog-title">
													<img id="dialog-title-image" src="./assets/icon.ico" alt="Icona" />
													<span id="dialog-title-text" class="dialog-title">Titolo</span>
												</div>
												<div id="dialog-controls">
													<div class="button" id="dialog-close-button">
														<span><i class="fas fa-times" style="font-size: 1.2em;"></i></span>
													</div>
												</div>
											</div>
										</div>
									</header>
									<div class="main-wrapper">
										<div class="landing-page-wrapper" style="width: 75%;">
											<header class="site-name">
												<p id="label">Sicuro di voler uscire dall'applicazione?</p>
											</header>
											<div class="dialog-actions-container">
											</div>
										</div>
									</div>`;
		this._overlayDiv.className = 'dialog-box-overlay';
		this._document.body.appendChild(this._mainDiv);
		this._document.body.appendChild(this._overlayDiv);
	}

	_setDialog(set, config) {
		let self = this;
		var maximize = false,
			dialog = this._mainDiv, // The HTML of dialog box
			dialog_title = dialog.querySelector('#dialog-title-text'),
			dialog_close = dialog.querySelector('#dialog-close-button'),
			dialog_content = dialog.children[1].children[0].children[0].children[0],
			dialog_action = dialog.children[1].children[0].children[1],
			dialog_overlay = dialog.nextSibling;
		var selected = null, // Object of the element to be moved
			x_pos = 0,
			y_pos = 0, // Stores x & y coordinates of the mouse pointer
			x_elem = 0,
			y_elem = 0, // Stores top, left values (edge) of the element
			defaults = {
				title: dialog_title.innerHTML,
				content: dialog_content.innerHTML,
				width: 400,
				height: 250,
				top: false,
				left: false,
				buttons: {
					"Close": {
						style: "btn-outlined",
						callback: function () {
							self._setDialog("close");
						}
					},
					"Accept": {
						style: "btn",
						callback: function () {
							self._setDialog("close");
						}
					},
				},
				specialClass: "",
				fixed: true,
				overlay: true
			}; // Default options...

		for (var i in config) { defaults[i] = (typeof (config[i])) ? config[i] : defaults[i]; }

		// Will be called when user starts dragging an element
		function _drag_init(elem) {
			selected = elem; // Store the object of the element which needs to be moved
			x_elem = x_pos - selected.offsetLeft;
			y_elem = y_pos - selected.offsetTop;
		}

		// Will be called when user dragging an element
		function _move_elem(e) {
			x_pos = self._document.all ? self._window.event.clientX : e.pageX;
			y_pos = self._document.all ? self._window.event.clientY : e.pageY;
			if (selected !== null) {
				selected.style.left = !defaults.left ? ((x_pos - x_elem) + selected.offsetWidth / 2) + 'px' : ((x_pos - x_elem) - defaults.left) + 'px';
				selected.style.top = !defaults.top ? ((y_pos - y_elem) + selected.offsetHeight / 2) + 'px' : ((y_pos - y_elem) - defaults.top) + 'px';
			}
		}

		// Destroy the object when we are done
		function _destroy() {
			selected = null;
		}

		dialog.className = "dialog-box " + (defaults.fixed ? 'fixed-dialog-box ' : '') + defaults.specialClass;
		dialog.style.visibility = (set == "open") ? "visible" : "hidden";
		dialog.style.opacity = (set == "open") ? 1 : 0;
		dialog.querySelector("#dialog-titlebar").style.width = `${defaults.width}px`;
		dialog.style.width = defaults.width + 'px';
		dialog.style.height = defaults.height + 'px';
		dialog.style.top = (!defaults.top) ? "50%" : '0px';
		dialog.style.left = (!defaults.left) ? "50%" : '0px';
		dialog.style.marginTop = (!defaults.top) ? '-' + defaults.height / 2 + 'px' : defaults.top + 'px';
		dialog.style.marginLeft = (!defaults.left) ? '-' + defaults.width / 2 + 'px' : defaults.left + 'px';
		dialog_title.innerHTML = defaults.title;
		dialog_content.innerHTML = defaults.content;
		dialog_action.innerHTML = "";
		dialog_overlay.style.display = (set == "open" && defaults.overlay) ? "block" : "none";

		if (defaults.buttons) {
			for (var j in defaults.buttons) {
				var btn = this._document.createElement('button');
				btn.type = "button";
				btn.className = defaults.buttons[j].style;
				btn.innerHTML = j;
				btn.onclick = defaults.buttons[j].callback;
				dialog_action.appendChild(btn);
			}
		} else {
			dialog_action.innerHTML = '&nbsp;';
		}

		// Bind the draggable function here...
		dialog.children[0].children[0].children[0].children[0].onmousedown = function () {
			_drag_init(dialog);
			return false;
		};

		dialog_close.onclick = function () {
			self.close();
		};

		this._document.onmousemove = _move_elem;
		this._document.onmouseup = _destroy;

		maximize = (set == "open") ? true : false;

	}

	open(properties) {
		if (!Dialog.isOpen) {
			Dialog._isOpen = true;
			this._setDialog('open', properties);
		}
	}

	close(properties) {
		this._setDialog('close', properties);
		this._mainDiv.parentNode.removeChild(this._mainDiv);
		this._overlayDiv.parentNode.removeChild(this._overlayDiv);
		Dialog._isOpen = false;
	}

	static get isOpen() {
		return Dialog._isOpen;
	}
}

window.Dialog = Dialog;
module.exports = Dialog;