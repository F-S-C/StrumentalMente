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

    if (document.getElementsByName("back-slide").length > 0) {
        document.getElementById("back").disabled = false;
        document.getElementById("back").style.display = "none";
        document.getElementsByName("back-slide")[0].style.display = "inline-block";
    }

    if (document.getElementsByTagName("section").length < 2) {
        document.getElementById("next").style.display = "none";
        document.getElementById("quiz").style.display = "inline-block";
    }
    else {
        if (window.location.search.substr(1) == "last") {
            for (var i = 0; i < document.getElementsByTagName("section").length - 2; i++)
                document.getElementsByTagName("section")[i].className = "hide";
            document.getElementsByTagName("section")[document.getElementsByTagName("section").length - 1].className = "show";
            document.getElementById("quiz").style.display = "inline-block";
            document.getElementById("next").style.display = "none";
            document.getElementById("back").disabled = false;
            sessionStorage.setItem("curr_element", document.getElementsByTagName("section").length - 1);
            if (document.getElementsByName("back-slide").length > 0) {
                document.getElementsByName("back-slide")[0].style.display = "none";
                document.getElementById("back").style.display = "inline-block";
            }
        }
        else {
            for (var i = 1; i < document.getElementsByTagName('section').length; i++)
                document.getElementsByTagName("section")[i].className = "hide";
            document.getElementById("quiz").style.display = "none";
            document.getElementsByTagName("section")[0].className = "show";
        }
    }
    sessionStorage.setItem("shortcut_attive", 1);
}

/* Funzioni di transizione delle sezioni in una pagina */

/*
La funzione, in base al valore assunto da slide (true/false) cambia la sezione corrente in quella precedente (in caso di slide = false)
o in quella successiva (in caso di slide = true). Inoltre si occupa di aggiornare il numero della slide corrente nella memoria temporanea
del browser. Inoltre, in base al numero di slide, si occupa di rendere visibili (o nascondere) i relativi pulsanti di spostamento
(avanti con id next, indietro con id back e quiz con id quiz).
*/
function changeWindow(slide) {
    var curr_element = sessionStorage.getItem("curr_element");
    var number_of_elements = sessionStorage.getItem("number_of_elements") - 1;

    document.getElementsByTagName("section")[curr_element].className = "hide";
    document.getElementById("next").style.pointerEvents = "none";
    document.getElementById("back").style.pointerEvents = "none";
    sessionStorage.setItem("shortcut_attive", 0);

    if (document.getElementsByName("quiz-page").length > 0)
        document.getElementsByName("domanda")[curr_element].className = "";

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

    if (curr_element == 0) {
        document.getElementById("back").disabled = true;
        if (document.getElementsByName("back-slide").length > 0) {
            document.getElementById("back").style.display = "none";
            document.getElementsByName("back-slide")[0].style.display = "inline-block";
        } else
            document.getElementById("back").style.display = "inline-block";
    }
    else {
        document.getElementById("back").disabled = false;
        if (document.getElementsByName("back-slide").length > 0) {
            document.getElementById("back").style.display = "inline-block";
            document.getElementsByName("back-slide")[0].style.display = "none";
        } else
            document.getElementById("back").style.display = "inline-block";
    }

    setTimeout(function () {
        document.getElementsByTagName("section")[curr_element].className = "show";
        document.getElementById("next").style.pointerEvents = "";
        document.getElementById("back").style.pointerEvents = "";
        sessionStorage.setItem("shortcut_attive", 1);
    }, 100);

    if (document.getElementsByName("quiz-page").length > 0)
        document.getElementsByName("domanda")[curr_element].className = "active";
    sessionStorage.setItem("curr_element", curr_element);
}

function changeWindowClick(element) {
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
    const Mousetrap = require("mousetrap");
    Mousetrap.bind("right", () => {
        if (sessionStorage.getItem("curr_element") == sessionStorage.getItem("number_of_elements") - 1)
            document.getElementById("quiz").click();
        else
            if ((sessionStorage.getItem("curr_element") < sessionStorage.getItem("number_of_elements") - 1) && (sessionStorage.getItem("shortcut_attive") == 1))
                changeWindow(true);
    });
    Mousetrap.bind("left", () => {
        if ((sessionStorage.getItem("curr_element") == 0) && (document.getElementsByName("back-slide").length > 0))
            document.getElementsByName("back-slide")[0].click();
        else
            if ((sessionStorage.getItem("curr_element") > 0) && (sessionStorage.getItem("shortcut_attive") == 1))
                changeWindow(false);
    });

})();


(function () {
    document.addEventListener('keydown', event => {
        if (event.key == "Shift")
            event.preventDefault();
    });
})();