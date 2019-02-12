include(main.js);
/* Funzioni di transizione delle sezioni in un quiz */

function changeWindowQuiz(slide) {
    var curr_element = sessionStorage.getItem("curr_element");
    var number_of_elements = sessionStorage.getItem("number_of_elements") - 1;
    document.getElementsByTagName("section")[curr_element].className = "hide";
    document.getElementsByName("domanda")[curr_element].className = "";
    document.getElementById("next").style.pointerEvents = "none";
    document.getElementById("back").style.pointerEvents = "none";
    if (slide) {
        if (number_of_elements > curr_element)
            curr_element++;
        if (number_of_elements == curr_element) {
            document.getElementById("next").style.display = "none";
            document.getElementById("quiz").style.display = "inline-block";
        }
    }
    else {
        if (curr_element == number_of_elements) {
            document.getElementById("next").style.display = "inline-block";
            document.getElementById("quiz").style.display = "none";
        }
        if (number_of_elements >= curr_element)
            curr_element--;
    }
    if (curr_element == 0)
        document.getElementById("back").disabled = true;
    else
        document.getElementById("back").disabled = false;
    document.getElementsByName("domanda")[curr_element].className = "active";
    setTimeout(function () {
        document.getElementsByTagName("section")[curr_element].className = "show";
        document.getElementById("next").style.pointerEvents = "";
        document.getElementById("back").style.pointerEvents = "";
    }, 100);
    sessionStorage.setItem("curr_element", curr_element);
}

function changeWindowQuizClick(element) {
    var curr_element = sessionStorage.getItem("curr_element");
    var number_of_elements = sessionStorage.getItem("number_of_elements") - 1;
    if (curr_element != element) {
        document.getElementsByTagName("section")[curr_element].className = "hide";
        document.getElementsByName("domanda")[curr_element].className = "";
        document.getElementById("next").style.pointerEvents = "none";
        document.getElementById("back").style.pointerEvents = "none";
        curr_element = element;
        if (number_of_elements == curr_element) {
            document.getElementById("next").style.display = "none";
            document.getElementById("quiz").style.display = "inline-block";
        }
        else {
            document.getElementById("next").style.display = "inline-block";
            document.getElementById("quiz").style.display = "none";
        }
        if (curr_element == 0)
            document.getElementById("back").disabled = true;
        else
            document.getElementById("back").disabled = false;

        document.getElementsByName("domanda")[curr_element].className = "active";
        setTimeout(function () {
            document.getElementsByTagName("section")[curr_element].className = "show";
            document.getElementById("next").style.pointerEvents = "";
            document.getElementById("back").style.pointerEvents = "";
        }, 100);
    }
    sessionStorage.setItem("curr_element", curr_element);
}

(function () {
    const remote = require('electron').remote;
    const electronLocalShortcut = require("electron-localshortcut");
    electronLocalShortcut.register(remote.getCurrentWindow(), "Right", () => {
        if (sessionStorage.getItem("curr_element") < sessionStorage.getItem("number_of_elements") - 1)
            changeWindowQuiz(true);
    });
    electronLocalShortcut.register(remote.getCurrentWindow(), "Left", () => {
        if (sessionStorage.getItem("curr_element") > 0)
            changeWindowQuiz(false);
    });
})();