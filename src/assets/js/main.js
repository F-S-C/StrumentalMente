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
var shortcut_attive = 0;
var initialPage = "", baseFolder = "./", endingPage = "";
var pagesName = {
	previous: "Argomento Precedente",
	previousLink: "argomento-successivo",
	next: "Argomento Successivo",
	nextLink: "argomento-precedente"
};
var canChangeSlide = true;

function setLinks(links) {
	pagesName = links;
	initialize(initialPage, baseFolder, endingPage);
}

/*
Funzione che, al caricamento della pagina, si occupa di impostare il numero 
di tag section presenti all'interno della pagina nella memoria locale del browser, di
impostare come sezione visibile corrente la prima (sempre all'interno della memoria locale)
e di nascondere tutti i tag section successivi al primo.
*/
function initialize(initial, base = "./", ending) {
	initialPage = initial;
	baseFolder = base;
	endingPage = ending;
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
		if (currentSection === numberOfSections - 1) {
			previousSlideButton.style.display = "inline-block";
			previousTopicButton.style.display = "none";

			nextTopicButton.style.display = "inline-block";
			nextSlideButton.style.display = "none";

		}
		else if (currentSection === 0) {
			previousTopicButton.style.display = "inline-block";
			previousSlideButton.style.display = "none";

			nextSlideButton.style.display = "inline-block";
			nextTopicButton.style.display = "none";
		}
		else {
			previousTopicButton.style.display = "none";
			previousSlideButton.style.display = "inline-block";

			nextTopicButton.style.display = "none";
			nextSlideButton.style.display = "inline-block";
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
			if (currentSection < numberOfSections - 1) {
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
	},
		openPreviousSlide = (e) => {
			if (canChangeSlide)
				changeSlide(false);
		},
		openNextSlide = (e) => {
			if (canChangeSlide)
				changeSlide(true);
		},
		openNextTopic = (e) => {
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

	(function () {
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

	})();
}

function changeTopic(topicName, base = "./") {
	var iFrame = document.getElementById("content-frame");
	currentSection = 0;
	document.activeElement.blur();
	if (topicName !== "quiz")
		iFrame.src = base + topicName + ".html";
	else
		require("electron").remote.getCurrentWindow().loadFile(base + topicName + ".html");
}