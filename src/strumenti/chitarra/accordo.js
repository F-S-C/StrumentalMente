var selezionato = 0;

function accordo(nome, dita, tasto_iniziale) {
	this.nome = nome;
	this.dita = dita;
	this.tasto_iniziale = tasto_iniziale;
}

var accordi = [ //RISCRIVI ACCORDI
	new accordo("Do", [false, false, false, false,
		false, false, true, false,
		false, true, false, false,
		false, false, false, false,
		true, false, false, false,
		false, false, false, false], 1),
	new accordo("Re", [false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, true, false, false,
		false, false, true, false,
		false, true, false, false], 1),
	new accordo("Mi", [false, false, false, false,
		false, true, false, false,
		false, true, false, false,
		true, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Fa", [true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, true, false, false,
		true, false, false, false,
		true, false, false, false], 1),
	new accordo("Sol", [false, false, true, false,
		false, true, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, true, false], 1),
	new accordo("La", [false, false, false, false,
		false, false, false, false,
		false, true, false, false,
		false, true, false, false,
		false, true, false, false,
		false, false, false, false], 1),
	new accordo("Si", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, false, true, false,
		true, false, false, false], 2)
];

function script_load() {
	selezionato = Math.floor((Math.random() * 7) + 1);
	document.getElementById("name").innerHTML = accordi[selezionato - 1].nome; //NAME OF SELECTED CHORD
	for (var i = 0; i < 4; i++) //TABS OF SELECTED CHORD
		document.getElementsByClassName("num_tasto")[i].innerHTML = (i + accordi[selezionato - 1].tasto_iniziale) + "° Tasto";
}

function replace_selected() {
	var item = JSON.parse(sessionStorage.getItem("selected_checkbox")); //LOAD SELECTED CHECKBOX
	selezionato = sessionStorage.getItem("quiz_chord");//LOAD QUIZ CHORD
	document.getElementById("name").innerHTML = accordi[selezionato - 1].nome; //NAME OF SELECTED CHORD
	for (var i = 0; i < 4; i++) //TABS OF SELECTED CHORD
		document.getElementsByClassName("num_tasto")[i].innerHTML = (i + accordi[selezionato - 1].tasto_iniziale) + "° Tasto";
	for (var i = 0; i < 24; i++) {
		if (item[i] == true)
			document.getElementsByTagName("input")[i].checked = true; //CHECK CHECKBOX
		else
			document.getElementsByTagName("input")[i].checked = false; //UNCHECK CHECKBOX
		document.getElementsByTagName("input")[i].disabled = true;//DISABLE SELECTED CHECKBOX
	}
}

function verify_and_store() {
	var corretto = true;
	var item = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
	for (var i = 0; i < 24; i++) {
		if (accordi[selezionato - 1].dita[i] != document.getElementsByTagName("input")[i].checked)
			corretto = false;

		if (document.getElementsByTagName("input")[i].checked == true)
			item[i] = true;
		else
			item[i] = false;
	}
	sessionStorage.setItem("quiz_chord",selezionato);
	sessionStorage.setItem("selected_checkbox", JSON.stringify(item));
	sessionStorage.setItem("correct", JSON.stringify(corretto));
	if(corretto)
		alert("Accordo corretto!"); //USARE VARIABILE LOCALE PER MEMORIZZARE IL PUNTEGGIO
	else
		alert("Accordo errato!");
}

function correct_chord() {
	var selected = sessionStorage.getItem("quiz_chord");
	for (var i = 0; i < 24; i++) {
		if (accordi[selected - 1].dita[i] == true)
			document.getElementsByTagName("input")[i].checked = true;
		else
			document.getElementsByTagName("input")[i].checked = false;
	}
}