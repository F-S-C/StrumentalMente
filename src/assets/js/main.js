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