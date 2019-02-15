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
	 * @param {boolean} slide se è `true`, avanza di una slide, altrimenti indietreggia di una slide.
	 */
	function changeSlide(slide) {
		iFrameDocument.document.getElementsByTagName("section")[currentSection].className = "hide";
		canChangeSlide = false;
		if (slide) {
			if (currentSection == 0) {
				previousTopicButton.style.display = "none";
				previousSlideButton.style.display = "inline-block";
				previousSlideButton.toggleAttribute("disabled", false);
			}
			if (currentSection <= numberOfSections - 1) {
				currentSection++;
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
				currentSection--;
			}
			if (currentSection > 0) {
				currentSection--;
				if (currentSection == 0) {
					previousTopicButton.style.display = "inline-block";
					previousSlideButton.style.display = "none";
					previousSlideButton.toggleAttribute("disabled", true);
				}
			}
		}

		setTimeout(() => {
			iFrameDocument.document.getElementsByTagName("section")[currentSection].className = "show";
			canChangeSlide = true;
		}, 100);
	}

	let openPreviousTopic = (e) => {
		if (canChangeSlide)
			changeTopic(pagesName.previousLink, baseFolder)
	};
	let openPreviousSlide = (e) => {
		if (canChangeSlide)
			changeSlide(false);
	};
	let openNextSlide = (e) => {
		if (canChangeSlide)
			changeSlide(true);
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
 * @param {String} base La cartella in cui è situato il file dell'argomento
 */
function changeTopic(topicName, base = "./") {
	var iFrame = document.getElementById("content-frame");
	currentSection = 0;
	document.activeElement.blur();
	if (topicName !== "quiz")
		iFrame.src = base + topicName + ".html";
	else
		require("electron").remote.getCurrentWindow().loadFile(base + topicName + ".html");
}

function initializeQuiz() {
	require("electron").remote.getCurrentWebContents().openDevTools();
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
	}


	verifyButton.style.display = "none";
	previousSlideButton.toggleAttribute("disabled", true);

	verifyButton.removeEventListener("click", checkQuiz);
	verifyButton.addEventListener("click", checkQuiz);
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


function checkQuiz() {
	document.activeElement.blur();
	window.alert("Non ancora implementato!");
}