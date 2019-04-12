/**
 * @file main.js
 * 
 * Contiene tutte le funzioni che servono a dare 
 * dinamicità alle pagine HTML dell'applicazione. 
 */

/**
 * Apre la navbar in modalità "mobile". Questa funzione è mantenuta solo per
 * consentire un eventuale eccessivo ridimensionamento della finestra.
 */
function openMobileNavigation() {
	var button = document.getElementById("sidebar-controller");
	var nav = document.getElementById("main-nav");
	if (nav.className === "main-navigation") {
		nav.className += " responsive";
		button.innerHTML = "<i class=\"fas fa-times\"></i>";
	}
	else {
		nav.className = "main-navigation";
		button.innerHTML = "<i class=\"fas fa-bars\"></i>";
	}
}

var numberOfSections = 0, currentSection = 0;
var returnToLast = false;
var initialPage = "", baseFolder = "./";
var sectionList;
var pagesName = {
	previous: "Argomento Precedente",
	previousLink: "argomento-successivo",
	next: "Argomento Successivo",
	nextLink: "argomento-precedente"
};
var canChangeSlide = true;

/**
 * Cambia i link e i nomi dell'argomento precedente e quello successivo
 * a quello attuale
 * 
 * @param {number} firstSlideNumber Il numero della prima slide dell'argomento corrente
 * @param {Object} links Le nuove impostazioni e link
 * @param {String} links.previous Il nome della pagina precedente
 * @param {String} links.previousLink Il link della pagina precedente (il nome del file *senza* l'estensione)
 * @param {String} links.next Il nome della pagina successiva
 * @param {String} links.nextLink Il link della pagina successiva (il nome del file *senza* l'estensione)
 */
function setLinks(firstSlideNumber, links) {
	sessionStorage.currentSlide = firstSlideNumber;
	pagesName = links;
	initialize(initialPage, baseFolder);
}

/**
 * Funzione che, al caricamento della pagina, si occupa di impostare il numero 
 * di tag section presenti all'interno della pagina nella memoria locale del browser, di
 * impostare come sezione visibile corrente la prima (sempre all'interno della memoria locale)
 * e di nascondere tutti i tag section successivi al primo.
 * 
 * @param {String} initial Il primo argomento
 * @param {String} base La cartella in cui sono situati i file degli argomenti (default: `./`)
 * @param {number} totalNumberOfSlides Il numero totale di pagine per la sezione.
 */
function initialize(initial, base = "./", totalNumberOfSlides = undefined) {
	initialPage = initial;
	baseFolder = base;
	currentSection = 0;

	var iFrame = document.getElementById("topic-frame");
	setShortcuts(iFrame.contentWindow);
	var iFrameDocument = iFrame.contentWindow.document || iFrame.contentDocument;
	numberOfSections = iFrameDocument.getElementsByTagName("section").length;

	if (iFrameDocument.getElementById("list") == undefined)
		iFrameDocument.getElementsByTagName("section")[0].className = "show";
	iFrameDocument.getElementById("max-topic-slides").innerHTML = numberOfSections;
	iFrameDocument.getElementById("current-topic-slide").innerHTML = currentSection + 1;
	let updateCurrentSlide = (delta) => {
		sessionStorage.currentSlide = Number(sessionStorage.currentSlide) + delta;
		iFrameDocument.getElementById("current-slide-number").innerHTML = sessionStorage.currentSlide;
	};
	updateCurrentSlide(0);

	var previousTopicButton = document.getElementById("back-topic"),
		previousSlideButton = document.getElementById("back"),
		returnToListButton = document.getElementById("back-to-list"),
		nextSlideButton = document.getElementById("next"),
		nextTopicButton = document.getElementById("next-topic");

	if (totalNumberOfSlides != undefined) {
		sessionStorage.totalNumberOfSlides = totalNumberOfSlides;
		sessionStorage.currentSlide = 1;
	}
	else {
		totalNumberOfSlides = sessionStorage.totalNumberOfSlides;
	}

	iFrameDocument.getElementById("total-slides-number").innerHTML = totalNumberOfSlides;

	if (iFrame.src.includes(base + initial + ".html")) {
		numberOfSections = 1;
		previousTopicButton.style.display = "none";
		previousSlideButton.style.display = "inline-block";
		previousSlideButton.toggleAttribute("disabled", true);

		nextSlideButton.style.display = "none";
		nextTopicButton.style.display = "inline-block";

		returnToListButton.style.display = "none";
		returnToListButton.toggleAttribute("disabled", true);
	}
	else {
		if (iFrameDocument.getElementById("list") == undefined)
			iFrameDocument.getElementsByTagName("section")[0].className = "show";
		previousSlideButton.toggleAttribute("disabled", false);
		returnToListButton.style.display = "inline-block";
		returnToListButton.toggleAttribute("disabled", false);

		if (currentSection === 0) {
			previousTopicButton.style.display = "inline-block";
			previousSlideButton.style.display = "none";
		}
		else if (currentSection <= numberOfSections - 1) {
			previousSlideButton.style.display = "inline-block";
			previousTopicButton.style.display = "none";
		}

		if (currentSection === numberOfSections - 1) {
			nextTopicButton.style.display = "inline-block";
			nextSlideButton.style.display = "none";
		}
		else if (currentSection >= 0) {
			nextSlideButton.style.display = "inline-block";
			nextTopicButton.style.display = "none";
		}
	}

	if (returnToLast) {
		changeSlide(numberOfSections - 1);
		returnToLast = false;
	}

	previousTopicButton.innerHTML = pagesName.previous + " <i class=\"btn-icon left fas fa-arrow-alt-circle-left\"></i>";
	nextTopicButton.innerHTML = pagesName.next + " <i class=\"btn-icon fas fa-arrow-circle-right\"></i>";

	/**
	 *  La funzione, in base al valore assunto da slide cambia la sezione corrente in
	 * quella richiesta. Inoltre si occupa di aggiornare il numero della slide
	 * corrente nella memoria temporanea del browser. Inoltre, in base al numero di
	 * slide, si occupa di rendere visibili (o nascondere) i relativi pulsanti di
	 * spostamento (avanti con id next, indietro con id back e quiz con id quiz).
	 * 
	 * @param {numer} slide Il numero della slide da aprire.
	 */
	function changeSlide(slide) {
		updateCurrentSlide(slide - currentSection);
		iFrameDocument.getElementsByTagName("section")[currentSection].className = "hide";
		canChangeSlide = false;
		if (slide > currentSection) {
			if (currentSection == 0) {
				previousTopicButton.style.display = "none";
				previousSlideButton.style.display = "inline-block";
				previousSlideButton.toggleAttribute("disabled", false);
			}
			if (currentSection <= numberOfSections - 1) {
				currentSection = slide;
				if (currentSection === numberOfSections - 1) {
					nextSlideButton.style.display = "none";
					nextTopicButton.style.display = "inline-block";
				}
			}
		}
		else {
			if (currentSection === numberOfSections - 1 && numberOfSections !== 1) {
				nextSlideButton.style.display = "inline-block";
				nextTopicButton.style.display = "none";
			}
			if (currentSection > 0) {
				if (currentSection - slide == 0) {
					previousTopicButton.style.display = "inline-block";
					previousSlideButton.style.display = "none";
					previousSlideButton.toggleAttribute("disabled", true);
				}
			}
			currentSection = slide;
		}

		setTimeout(() => {
			iFrameDocument.getElementsByTagName("section")[currentSection].className = "show";
			iFrameDocument.getElementById("current-topic-slide").innerHTML = currentSection + 1;
			canChangeSlide = true;
		}, 100);
	}

	let openPreviousTopic = (e) => {
		if (canChangeSlide && pagesName.previousLink) {
			changeTopic(pagesName.previousLink, baseFolder);
			if (pagesName.previousLink !== initialPage)
				returnToLast = true;
		}
	};
	let openPreviousSlide = (e) => {
		if (canChangeSlide)
			changeSlide(currentSection - 1);
	};
	let openNextSlide = (e) => {
		if (canChangeSlide) {
			changeSlide(currentSection + 1);
		}
	};
	let openNextTopic = (e) => {
		if (canChangeSlide)
			changeTopic(pagesName.nextLink, baseFolder);
	};

	previousTopicButton.onclick = openPreviousTopic;
	previousSlideButton.onclick = openPreviousSlide;

	nextSlideButton.onclick = openNextSlide;
	nextTopicButton.onclick = openNextTopic;

	[
		parent.require("mousetrap")(iFrame.contentWindow),
		parent.require("mousetrap")(document),
		parent.require("mousetrap")(parent.document)
	].forEach((Mousetrap) => {
		Mousetrap.unbind("right");
		Mousetrap.unbind("left");
		Mousetrap.bind("right", () => {
			if (currentSection === numberOfSections - 1) {
				nextTopicButton.click();
			}
			else {
				nextSlideButton.click();
			}
		});
		Mousetrap.bind("left", () => {
			if (currentSection === 0 && !iFrame.src.includes(base + initial + ".html")) {
				previousTopicButton.click();
			}
			else if (document.getElementById("back") && !document.getElementById("back").hasAttribute("disabled")) {
				previousSlideButton.click();
			}
		});

		Mousetrap.bind("ctrl+backspace", () => {
			if (document.getElementById("back") && !document.getElementById("back").hasAttribute("disabled")) {
				returnToListButton.click();
			}
		});
	});
}

/**
 * Cambia l'argomento correntemente mostrato.
 * 
 * @param {String} topicName Il prossimo argomento
 * @param {String} [base] La cartella in cui è situato il file dell'argomento
 */
function changeTopic(topicName, base = "./") {
	var iFrame = document.getElementById("topic-frame");
	currentSection = 0;
	parent.document.activeElement.blur();
	const path = parent.require("path");
	if (!topicName.includes("quiz")) {
		iFrame.src = `file:\\\\\\${path.join(path.resolve("."), base, `${topicName}.html`)}`;
	}
	else
		parent.require("electron").remote.getCurrentWindow().loadFile(base + topicName + ".html");
}

/**
 * Inizializza la pagina del quiz.
 */
function initializeQuiz() {
	sectionsList = document.getElementsByTagName("section");

	numberOfSections = sectionsList.length;
	currentSection = 0;
	canChangeSlide = true;

	sectionsList[currentSection].className = "show";

	var previousSlideButton = document.getElementById("back");
	var nextSlideButton = document.getElementById("next");
	var verifyButton = document.getElementById("end");
	var exitButton = document.getElementById("exit");

	let nextSlide = () => {
		if (canChangeSlide)
			changeQuizSlide(currentSection + 1);
	};
	let previousSlide = () => {
		if (canChangeSlide)
			changeQuizSlide(currentSection - 1);
	};

	exitButton.style.display = "none";
	verifyButton.style.display = "none";
	previousSlideButton.toggleAttribute("disabled", true);

	previousSlideButton.onclick = previousSlide;
	nextSlideButton.onclick = nextSlide;

	const Mousetrap = require("mousetrap")(document);
	Mousetrap.bind("right", () => {
		if (currentSection === numberOfSections - 1) {
			if (compare)
				exitButton.click();
			else
				verifyButton.click();
		} else
			nextSlideButton.click();
	});
	Mousetrap.bind("left", () => {
		if (currentSection !== 0)
			previousSlideButton.click();
	});
}

/**
 * Cambia la slide del quiz attualmente mostrata.
 * 
 * @param {number} finalSlide La slide da aprire in seguito alla
 * richiesta di variazione della slide. Tale valore deve essere
 * compreso nell'intervallo `[0, n]`, dove `n` è il numero di slide
 * presenti nella pagina.
 */
function changeQuizSlide(finalSlide) {
	document.activeElement.blur();
	var previousSlideButton = document.getElementById("back");
	var nextSlideButton = document.getElementById("next");
	var verifyButton = document.getElementById("end");
	var exitButton = document.getElementById("exit");

	canChangeSlide = false;
	sectionsList[currentSection].className = "hide";

	var questionsInNavbar = document.getElementsByClassName("question-link");
	console.log(questionsInNavbar);
	questionsInNavbar[currentSection].className = "question-link";

	currentSection = finalSlide;


	if (currentSection === 0)
		previousSlideButton.toggleAttribute("disabled", true);
	else
		previousSlideButton.toggleAttribute("disabled", false);

	if (currentSection === numberOfSections - 1) {
		nextSlideButton.style.display = "none";
		if (compare) {
			exitButton.style.display = "inline-block";
			verifyButton.style.display = "none";
		} else {
			verifyButton.style.display = "inline-block";
			exitButton.style.display = "none";
		}
	}
	else {
		verifyButton.style.display = "none";
		exitButton.style.display = "none";
		nextSlideButton.style.display = "inline-block";
	}

	setTimeout(() => {
		sectionsList[currentSection].className = "show";
		questionsInNavbar[finalSlide].className = "question-link active";
		canChangeSlide = true;
	}, 100);
}

/**
 * Permette di avviare, mettere in pausa o stoppare un audio.
 * 
 * @param {String} audioTagId L'ID dell'elemento `<audio>` da controllare
 * @param {HTMLElement} buttonRef Un riferimento al bottone che richiama questa funzione
 * @param {String} stopButtonId L'ID del bottone di Stop.
 */
function playStopAudio(audioTagId, buttonRef, stopButtonId) {
	var audio = document.getElementById(audioTagId);
	buttonRef.blur();

	buttonRef.className = "btn-audio";
	document.getElementById(stopButtonId).style.display = "inline-block";

	if (audio.paused) {
		buttonRef.innerHTML = "<i class=\"fas fa-pause\"></i>";
		audio.play();
		buttonRef.className = buttonRef.className.replace("audio-stopped", "audio-playing");
	}
	else {
		buttonRef.innerHTML = "<i class=\"fas fa-play\"></i>";
		audio.pause();
		buttonRef.className = buttonRef.className.replace("audio-playing", "audio-stopped");
	}

	audio.addEventListener("ended", () => {
		buttonRef.innerHTML = "<i class=\"fas fa-play\"></i>";
		audio.pause();
		audio.currentTime = 0;
	});

	document.getElementById(stopButtonId).onclick = () => {
		buttonRef.innerHTML = "<i class=\"fas fa-play\"></i>";
		audio.pause();
		audio.currentTime = 0;
	};
}

var lastPressed = { button: null, container: null };

function hideSubButtons(mainButton, containerId) {
	lastPressed = { button: null, container: null };

	mainButton.parentElement.classList.toggle("clicked");
	mainButton.childNodes[1].style.visibility = "visible";

	let container = document.getElementById(containerId);
	setTimeout(() => {
		container.style.visibility = "hidden";
		container.style.opacity = 0;
		container.style.display = "none";
		mainButton.style.display = "";
		mainButton.style.visibility = "visible";
		mainButton.style.opacity = 1;

	}, 300);
}

function showSubButtons(mainButton, containerId) {
	parent.document.activeElement.blur();

	if (lastPressed.button && lastPressed.container)
		hideSubButtons(lastPressed.button, lastPressed.container);
	lastPressed = { button: mainButton, container: containerId };

	mainButton.parentElement.classList.toggle("clicked");

	mainButton.childNodes[1].style.visibility = "hidden";

	setTimeout(() => {
		mainButton.style.visibility = "hidden";
		mainButton.style.opacity = 0;
		mainButton.style.display = "none";
		let container = document.getElementById(containerId);
		container.style.display = "";
		container.style.visibility = "visible";
		container.style.opacity = 1;
	}, 300);
}

/**
 * Associa a tutte le figure presenti nel documento un evento "click" che
 * consente di visualizzarle in una finestra modale.
 */
(function () {
	let figures = Array.prototype.slice.call(document.getElementsByTagName("figure"));

	figures.forEach(fig => {
		let showImageModal = () => {
			let realDocument = (parent.document !== document) ? parent.document : document;

			if (!/.*?modal.*?/i.test(fig.className)) {
				var backupFig = fig.cloneNode(true);
				fig.insertAdjacentElement("afterend", backupFig);

				let closeButton = document.createElement("button");
				closeButton.className = "close-btn";
				closeButton.innerHTML = "<i class=\"fas fa-times\"></i>";
				fig.appendChild(closeButton);

				fig.style = "";

				if (parent.document !== document)
					fig.getElementsByTagName("img")[0].src = fig.getElementsByTagName("img")[0].src.replace("../../../", "./");

				fig = realDocument.body.appendChild(fig);
				closeButton = fig.getElementsByTagName("button")[0];

				let closeModal = () => {
					fig.className = fig.className.replace("modal", "");
					closeButton.parentElement.removeChild(closeButton);

					setTimeout(() => {
						fig.addEventListener("click", showImageModal);
					}, 100);

					fig.parentElement.removeChild(fig);
					fig = backupFig;
					realDocument.activeElement.blur();
				};

				closeButton.onclick = closeModal;
				fig.className += " modal";
				fig.removeEventListener("click", showImageModal);
				fig.addEventListener("click", closeModal);
			}
		};

		fig.addEventListener("click", showImageModal);
	});
})();