var selezionato = 0;

/**
 * Oggetto accordo.
 * @param {String} nome Stringa che indica il nome dell'accordo
 * @param {Boolean} dita Sequenza di valori logici che indicano se la checkbox corrispondente è
 * stata selezionata o meno
 * @param {number} tasto_iniziale Indica il numero del capotasto iniziale dell'accordo
 */
function accordo(nome, dita, tasto_iniziale) {
	this.nome = nome;
	this.dita = dita;
	this.tasto_iniziale = tasto_iniziale;
}

var accordi = [
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

/**
 * Seleziona un numero casuale compreso tra 1 e 7 e ne imposta l'accordo da richiedere all'utente.
 */
function script_load() {
	selezionato = Math.floor((Math.random() * 7) + 1);
	document.getElementById("name").innerHTML = accordi[selezionato - 1].nome; //NAME OF SELECTED CHORD
	for (var i = 0; i < 4; i++) //TABS OF SELECTED CHORD
		document.getElementsByClassName("num_tasto")[i].innerHTML = (i + accordi[selezionato - 1].tasto_iniziale) + "° Tasto";
}

/**
 * Ripristina le checkbox selezionate dall'utente e il nome dell'accordo richiesto durante il quiz.
 */
function replace_selected() {
	var item = JSON.parse(sessionStorage.getItem("selected_checkbox")); //LOAD SELECTED CHECKBOX
	var elements = document.getElementById("chord");
	selezionato = sessionStorage.getItem("quiz_chord");//LOAD QUIZ CHORD
	document.getElementById("name").innerHTML = accordi[selezionato - 1].nome; //NAME OF SELECTED CHORD
	for (var i = 0; i < 4; i++) //TABS OF SELECTED CHORD
		document.getElementsByClassName("num_tasto")[i].innerHTML = (i + accordi[selezionato - 1].tasto_iniziale) + "° Tasto";
	for (var i = 0; i < 24; i++) {
		if (item[i] == true)
			elements.getElementsByTagName("input")[i].checked = true; //CHECK CHECKBOX
		else
			elements.getElementsByTagName("input")[i].checked = false; //UNCHECK CHECKBOX
		elements.getElementsByTagName("input")[i].disabled = true;//DISABLE SELECTED CHECKBOX
	}
}

/**
 * Verifica che le selezioni effettuate dall'utente siano corrette in base all'accordo presentatogli e
 * memorizza: se la selezione è corretta (1) o non corretta (0), le checkbox selezionate (e non) e 
 * l'accordo che l'utente doveva riprodurre.
 */
function verify_and_store() {
	var corretto = true;
	var item = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
	var elements = document.getElementById("chord");
	for (var i = 0; i < 24; i++) {
		if (accordi[selezionato - 1].dita[i] != elements.getElementsByTagName("input")[i].checked)
			corretto = false;

		if (elements.getElementsByTagName("input")[i].checked == true)
			item[i] = true;
		else
			item[i] = false;
	}
	sessionStorage.setItem("quiz_chord",selezionato);
	sessionStorage.setItem("selected_checkbox", JSON.stringify(item));
	sessionStorage.setItem("correct", JSON.stringify(corretto));
	if(corretto)
		sessionStorage.setItem("score",JSON.parse(sessionStorage.getItem("score"))+1);
}

/**
 * In base al numero di accordo che l'utente doveva riprodurre, ripristina la sequenza di selezioni
 * corretta nello schema.
 */
function correct_chord() {
	var selected = sessionStorage.getItem("quiz_chord");
	var elements = document.getElementById("chord");
	for (var i = 0; i < 24; i++) {
		if (accordi[selected - 1].dita[i] == true)
			elements.getElementsByTagName("input")[i].checked = true;
		else
			elements.getElementsByTagName("input")[i].checked = false;
	}
}