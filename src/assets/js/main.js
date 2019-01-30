function openMobileNavigation() {
    var x = document.getElementById("main-nav");
    if (x.className === "main-navigation")
        x.className += " responsive";
    else
        x.className = "main-navigation";
}