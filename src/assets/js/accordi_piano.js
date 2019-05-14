var selezionato = new Array();
var corretto = new Array(5);

const accordo = window.parent.require("../../assets/js/chord-module");

var accordi = [
	new accordo("Do", [true, false, true, false, true, false, false,
		false, false, false, false, false]),
	new accordo("Do#", [false, false, false, true, false, false, false,
		true, false, false, true, false]),
	new accordo("Dom", [true, false, false, false, true, false, false,
		false, true, false, false, false]),
	new accordo("Do#m", [false, false, true, false, false, false, false,
		true, false, false, true, false]),
	new accordo("Re", [false, true, false, false, false, true, false,
		false, false, true, false, false]),
	new accordo("Rem", [false, true, false, true, false, true, false,
		false, false, false, false, false]),
	new accordo("Re#", [false, false, false, false, true, false, false,
		false, true, false, false, true]),
	new accordo("Re#-", [false, false, false, false, false, false, false,
		false, true, true, false, true]),
	new accordo("Mi", [false, false, true, false, false, false, true,
		false, false, false, true, false]),
	new accordo("Mi-", [false, false, true, false, true, false, true,
		false, false, false, false, false]),
	new accordo("Fa", [true, false, false, true, false, true, false,
		false, false, false, false, false]),
	new accordo("Fa-", [true, false, false, true, false, false, false,
		false, false, false, true, false]),
	new accordo("Fa#", [false, false, false, false, false, false, false,
		true, false, true, false, true]),
	new accordo("Fa#-", [false, false, false, false, false, true, false,
		true, false, true, false, false]),
	new accordo("Sol", [false, true, false, false, true, false, true,
		false, false, false, false, false]),
	new accordo("Sol-", [false, true, false, false, true, false, false,
		false, false, false, false, true]),
	new accordo("Sol#", [true, false, false, false, false, false, false,
		false, true, false, true, false]),
	new accordo("Sol#-", [false, false, false, false, false, false, true,
		false, true, false, true, false]),
	new accordo("La", [false, false, true, false, false, true, false,
		true, false, false, false, false]),
	new accordo("La-", [true, false, true, false, false, true, false,
		false, false, false, false, false]),
	new accordo("La#", [false, true, false, true, false, false, false,
		false, false, false, false, true]),
	new accordo("La#-", [false, false, false, true, false, false, false,
		true, false, false, false, true]),
	new accordo("Si", [false, false, false, false, false, false, true,
		false, true, true, false, false]),
	new accordo("Si-", [false, true, false, false, false, false, true,
		false, false, true, false, false]),
];

/**
 * Seleziona un numero casuale compreso tra 1 e 24 e ne sceglie il relativo accordo dall'array degli accordi,
 * lo imposta come domanda nel quiz e lo inserisce in un altro array che contiene gli accordi "pescati", ripetendo
 * il procedimento per le 5 domande totali richieste nel quiz.
 */
function script_load() {

	for (var i = 0; i < document.getElementsByName("chord").length; i++) {
		var k = Math.floor((Math.random() * (accordi.length - i)) + 1);
		document.getElementsByName("chord_name")[i].innerHTML = "Accordo di " + accordi[k - 1].nome; //NAME OF SELECTED CHORD
		selezionato.push(accordi[k - 1]);
		accordi.splice(k - 1, 1);
	}
	accordi.splice(0, accordi.length);
}

/**
 * Verifica che le selezioni effettuate dall'utente siano corrette in base all'accordo presentatogli e
 * memorizza in un array se la selezione è corretta (1) o non corretta (0), disabilita le checkbox analizzate
 * e aumenta il punteggio (in caso di accordo corretto).
 */
function verify_and_store() {
	for (var j = 0; j < document.getElementsByName("chord").length; j++) {
		corretto[j] = true;
		var elements = document.getElementsByName("chord")[j];
		for (var i = 0; i < 12; i++) {
			if (selezionato[j].dita[i] != elements.getElementsByTagName("input")[i].checked)
				corretto[j] = false;

			elements.getElementsByTagName("input")[i].disabled = true;
		}

		if (corretto[j])
			sessionStorage.setItem("score", JSON.parse(sessionStorage.getItem("score")) + 1);
	}
}

/**
 * In base al numero di accordo che l'utente doveva riprodurre, ripristina la sequenza di selezioni
 * corretta negli schemi e ne blocca le modifiche.
 */
function correct_chord() {
	for (var j = 0; j < document.getElementsByName("chord").length; j++) {
		var elements = document.getElementsByName("correct_chord")[j];
		if (corretto[j] == false) {
			elements.style.display = "block";
			document.getElementsByName("errato")[j].innerHTML = "Inserito";
			for (var i = 0; i < 12; i++) {
				if (selezionato[j].dita[i] == true)
					elements.getElementsByTagName("input")[i].checked = true;
				else
					elements.getElementsByTagName("input")[i].checked = false;
				elements.getElementsByTagName("input")[i].disabled = true;
			}
		} else
			document.getElementsByName("errato")[j].innerHTML = "Corretto";
	}
}