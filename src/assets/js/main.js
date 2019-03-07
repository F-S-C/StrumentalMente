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

/**
 * Permette, alla pressione di un bottone, di aprire una sottolista
 * della navbar.
 * 
 * @param {String} name L'ID della lista che si vuole controllare
 * @param {String} [defaultLinkClass] La classe iniziale del bottone
 */
function drop(name, defaultLinkClass = "") {
	var el = document.getElementById(name), link = document.getElementById(name + "-link");
	var i = 0;
	if (el.className !== "show") {
		el.className = "show";
		link.className += " open";
	}
	else {
		el.className = "";
		link.className = defaultLinkClass;
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
 * @param {Object} links Le nuove impostazioni e link
 * @param {String} links.previous Il nome della pagina precedente
 * @param {String} links.previousLink Il link della pagina precedente (il nome del file *senza* l'estensione)
 * @param {String} links.next Il nome della pagina successiva
 * @param {String} links.nextLink Il link della pagina successiva (il nome del file *senza* l'estensione)
 */
function setLinks(links) {
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
 */
function initialize(initial, base = "./") {
	initialPage = initial;
	baseFolder = base;
	currentSection = 0;

	var iFrame = document.getElementById("content-frame");
	var iFrameDocument = iFrame.contentWindow || iFrame.contentDocument;
	numberOfSections = iFrameDocument.document.getElementsByTagName("section").length;

	iFrameDocument.document.getElementsByTagName("section")[0].className = "show";

	var previousTopicButton = document.getElementById("back-topic"),
		previousSlideButton = document.getElementById("back"),
		returnToListButton = document.getElementById("back-to-list"),
		nextSlideButton = document.getElementById("next"),
		nextTopicButton = document.getElementById("next-topic");

	if (iFrame.src.includes(base + initial + ".html")) {
		numberOfSections = 1;
		previousTopicButton.style.display = "none";
		previousSlideButton.style.display = "inline-block";
		previousSlideButton.toggleAttribute("disabled", true);

		nextSlideButton.style.display = "none";
		nextTopicButton.style.display = "inline-block";

		returnToListButton.style.display = "none";
	}
	else {
		iFrameDocument.document.getElementsByTagName("section")[0].className = "show";
		previousSlideButton.toggleAttribute("disabled", false);
		returnToListButton.style.display = "inline-block";

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
	 * La funzione, in base al valore assunto da slide (true/false) cambia la sezione 
	 * corrente in quella precedente (in caso di slide = false)
	 * o in quella successiva (in caso di slide = true). Inoltre si occupa di aggiornare 
	 * il numero della slide corrente nella memoria temporanea
	 * del browser. Inoltre, in base al numero di slide, si occupa di rendere
	 * visibili (o nascondere) i relativi pulsanti di spostamento
	 * (avanti con id next, indietro con id back e quiz con id quiz).
	 * 
	 * @param {numer} slide Il numero della slide da aprire.
	 */
	function changeSlide(slide) {
		iFrameDocument.document.getElementsByTagName("section")[currentSection].className = "hide";
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
			if (currentSection === numberOfSections - 1) {
				nextSlideButton.style.display = "inline-block";
				nextTopicButton.style.display = "none";
			}
			if (currentSection > 0) {
				if (currentSection - 1 == 0) {
					previousTopicButton.style.display = "inline-block";
					previousSlideButton.style.display = "none";
					previousSlideButton.toggleAttribute("disabled", true);
				}
			}
			currentSection = slide;
		}

		setTimeout(() => {
			iFrameDocument.document.getElementsByTagName("section")[currentSection].className = "show";
			canChangeSlide = true;
		}, 100);
	}

	let openPreviousTopic = (e) => {
		if (canChangeSlide) {
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
		if (canChangeSlide)
			changeSlide(currentSection + 1);
	};
	let openNextTopic = (e) => {
		if (canChangeSlide)
			changeTopic(pagesName.nextLink, baseFolder);
	};

	previousTopicButton.removeEventListener("click", openPreviousTopic);
	previousTopicButton.addEventListener("click", openPreviousTopic);
	previousSlideButton.removeEventListener("click", openPreviousSlide);
	previousSlideButton.addEventListener("click", openPreviousSlide);

	nextSlideButton.removeEventListener("click", openNextSlide);
	nextSlideButton.addEventListener("click", openNextSlide);
	nextTopicButton.removeEventListener("click", openNextTopic);
	nextTopicButton.addEventListener("click", openNextTopic);


	const Mousetrap = require("mousetrap");
	Mousetrap.bind("right", () => {
		if (currentSection === numberOfSections - 1)
			nextTopicButton.click();
		else
			nextSlideButton.click();
	});
	Mousetrap.bind("left", () => {
		if (currentSection === 0 && !iFrame.src.includes(base + initial + ".html"))
			previousTopicButton.click();
		else if (!document.getElementById("back").hasAttribute("disabled"))
			previousSlideButton.click();
	});
}

/**
 * Cambia l'argomento correntemente mostrato.
 * 
 * @param {String} topicName Il prossimo argomento
 * @param {String} [base] La cartella in cui è situato il file dell'argomento
 */
function changeTopic(topicName, base = "./") {
	var iFrame = document.getElementById("content-frame");
	currentSection = 0;
	document.activeElement.blur();
	if (topicName !== "quiz") {
		iFrame.src = base + topicName + ".html";
	}
	else
		require("electron").remote.getCurrentWindow().loadFile(base + topicName + ".html");
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

	let nextSlide = () => {
		if (canChangeSlide)
			changeQuizSlide(currentSection + 1);
	};
	let previousSlide = () => {
		if (canChangeSlide)
			changeQuizSlide(currentSection - 1);
	};


	verifyButton.style.display = "none";
	previousSlideButton.toggleAttribute("disabled", true);

	previousSlideButton.removeEventListener("click", previousSlide);
	previousSlideButton.addEventListener("click", previousSlide);
	nextSlideButton.removeEventListener("click", nextSlide);
	nextSlideButton.addEventListener("click", nextSlide);

	const Mousetrap = require("mousetrap");
	Mousetrap.bind("right", () => {
		if (currentSection === numberOfSections - 1)
			verifyButton.click();
		else
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
		verifyButton.style.display = "inline-block";
	}
	else {
		verifyButton.style.display = "none";
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

(function () {

	let figures = Array.prototype.slice.call(document.getElementsByTagName("figure"));

	figures.forEach(fig => {
		let showImageModal = () => {
			if (!/.*?modal.*?/i.test(fig.className)) {
				let closeButton = document.createElement("button");
				closeButton.className = "close-btn";
				closeButton.innerHTML = "<i class=\"fas fa-times\"></i>";
				fig.appendChild(closeButton);
				closeButton.addEventListener("click", () => {
					fig.className = fig.className.replace("modal", "");
					closeButton.parentElement.removeChild(closeButton);
					setTimeout(() => {
						fig.addEventListener("click", showImageModal);
					}, 100);

					if (parent.document !== document)
						parent.document.activeElement.blur();
					else
						document.activeElement.blur();
				});
				fig.className += " modal";
				fig.removeEventListener("click", showImageModal);
			}
		};
		fig.addEventListener("click", showImageModal);
	});
})();