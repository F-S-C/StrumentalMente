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

function drop(name) {
    var el = document.getElementById(name);
    var i = 0;
    if (el.className !== "show")
        el.className += "show";
    else
        el.className = "";
}

/* Funzioni di transizione delle sezioni in una pagina */

/*
Funzione che, al caricamento della pagina, si occupa di impostare il numero 
di tag section presenti all'interno della pagina nella memoria locale del browser, di
impostare come sezione visibile corrente la prima (sempre all'interno della memoria locale)
e di nascondere tutti i tag section successivi al primo.
*/
function numberOfSection() {
    sessionStorage.setItem("number_of_elements", document.getElementsByTagName("section").length);
    sessionStorage.setItem("curr_element", "0");
    document.getElementById("back").disabled = true;
    document.getElementsByTagName("section")[0].className = "show";
    if (document.getElementsByTagName("section").length < 2) {
        document.getElementById("next").style.display = "none";
        document.getElementById("quiz").style.display = "inline-block";
    }
    else {
        for (var i = 1; i < document.getElementsByTagName('section').length; i++)
            document.getElementsByTagName("section")[i].className = "hide";
        document.getElementById("quiz").style.display = "none";
    }
}

/*
La funzione, in base al valore assunto da slide (true/false) cambia la sezione corrente in quella precedente (in caso di slide = false)
o in quella successiva (in caso di slide = true). Inoltre si occupa di aggiornare il numero della slide corrente nella memoria temporanea
del browser. Inpltre, in base al numero di slide, si occupa di rendere visibili (o nascondere) i relativi pulsanti di spostamento
(avanti con id next, indietro con id back e quiz con id quiz).
*/
function changeWindow(slide) {
    var curr_element = sessionStorage.getItem("curr_element");
    var number_of_elements = sessionStorage.getItem("number_of_elements") - 1;
    document.getElementsByTagName("section")[curr_element].className = "hide";
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
    setTimeout(function () {
        document.getElementsByTagName("section")[curr_element].className = "show";
        document.getElementById("next").style.pointerEvents = "";
        document.getElementById("back").style.pointerEvents = "";
    }, 100);
    sessionStorage.setItem("curr_element", curr_element);
}

(function () {
    const remote = require('electron').remote;
    const electronLocalShortcut = require("electron-localshortcut");
    electronLocalShortcut.register(remote.getCurrentWindow(), "Right", () => {
        if (sessionStorage.getItem("curr_element") < sessionStorage.getItem("number_of_elements") - 1)
            changeWindow(true);
    });
    electronLocalShortcut.register(remote.getCurrentWindow(), "Left", () => {
        if (sessionStorage.getItem("curr_element") > 0)
            changeWindow(false);
    });
})();