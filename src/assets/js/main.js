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