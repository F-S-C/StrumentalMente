var selezionato = new Array();
var corretto = new Array(5);

const accordo = window.parent.require("../../assets/js/chord-module");

var accordi = [
	new accordo("Do", [false, false, false, false,
		false, false, true, false,
		false, true, false, false,
		false, false, false, false,
		true, false, false, false,
		false, false, false, false], 1),
	new accordo("Dom", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, true, false, false,
		true, false, false, false], 3),
	new accordo("Do#", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, false, true, false,
		true, false, false, false], 4),
	new accordo("Do#m", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, true, false, false,
		true, false, false, false], 4),
	new accordo("Re", [false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, true, false, false,
		false, false, true, false,
		false, true, false, false], 1),
	new accordo("Rem", [false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, true, false, false,
		false, false, true, false,
		true, false, false, false], 1),
	new accordo("Re#", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, false, true, false,
		true, false, false, false], 6),
	new accordo("Re#m", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, true, false, false,
		true, false, false, false], 6),
	new accordo("Mi", [false, false, false, false,
		false, true, false, false,
		false, true, false, false,
		true, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Mim", [false, false, false, false,
		false, true, false, false,
		false, true, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false], 1),
	new accordo("Fa", [true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, true, false, false,
		true, false, false, false,
		true, false, false, false], 1),
	new accordo("Fam", [true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, false, false, false,
		true, false, false, false,
		true, false, false, false], 1),
	new accordo("Fa#", [true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, true, false, false,
		true, false, false, false,
		true, false, false, false], 2),
	new accordo("Fa#m", [true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, false, false, false,
		true, false, false, false,
		true, false, false, false], 2),
	new accordo("Sol", [false, false, true, false,
		false, true, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, true, false], 1),
	new accordo("Solm", [true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, false, false, false,
		true, false, false, false,
		true, false, false, false], 3),
	new accordo("Sol#", [true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, true, false, false,
		true, false, false, false,
		true, false, false, false], 4),
	new accordo("Sol#m", [true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, false, false, false,
		true, false, false, false,
		true, false, false, false], 4),
	new accordo("La", [false, false, false, false,
		false, false, false, false,
		false, true, false, false,
		false, true, false, false,
		false, true, false, false,
		false, false, false, false], 1),
	new accordo("Lam", [false, false, false, false,
		false, false, false, false,
		false, true, false, false,
		false, true, false, false,
		true, false, false, false,
		false, false, false, false], 1),
	new accordo("La#", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, false, true, false,
		true, false, false, false], 1),
	new accordo("La#m", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, true, false, false,
		true, false, false, false], 1),
	new accordo("Si", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, false, true, false,
		true, false, false, false], 2),
	new accordo("Sim", [true, false, false, false,
		true, false, false, false,
		true, false, true, false,
		true, false, true, false,
		true, true, false, false,
		true, false, false, false], 2)
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
		for (var j = 0; j < 4; j++) //TABS OF SELECTED CHORD
		{
			document.getElementsByName("chord")[i].getElementsByClassName("num_tasto")[j].innerHTML = (j + accordi[k - 1].tasto_iniziale) + "° Tasto";
			document.getElementsByName("correct_chord")[i].getElementsByClassName("num_tasto")[j].innerHTML = (j + accordi[k - 1].tasto_iniziale) + "° Tasto";
		}
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
		for (var i = 0; i < 24; i++) {
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
			for (var i = 0; i < 24; i++) {
				if (selezionato[j].dita[i] == true)
					elements.getElementsByTagName("input")[i].checked = true;
				else
					elements.getElementsByTagName("input")[i].checked = false;
				elements.getElementsByTagName("input")[i].disabled = true;
			}
		} else
			document.getElementsByName("errato")[j].innerHTML = "Corretto";
		document.getElementsByName("barre")[j].style.display = "none";
	}
}

/**
 * Seleziona (o deseleziona) tutte le checkbox della prima colonna nell'accordo j-esimo (passato come 
 * parametro) in base al valore della prima checkbox dell'accordo j-esimo, ovvero: se il valore della
 * prima checkbox è true (selezionato) deseleziona tutta la colonna, se è false la seleziona.
 * @param {number} j Indica il numero di slide su cui la funzione deve operare.
 */
function selectFirstColumn(j) {
	box = document.getElementsByName("chord")[j];
	b = !(box.getElementsByTagName("input")[0].checked &&
		box.getElementsByTagName("input")[4].checked &&
		box.getElementsByTagName("input")[8].checked &&
		box.getElementsByTagName("input")[12].checked &&
		box.getElementsByTagName("input")[16].checked &&
		box.getElementsByTagName("input")[20].checked);
	if (!b)
		document.getElementsByName("barre")[j].innerHTML = "Applica il Barrè";
	else
		document.getElementsByName("barre")[j].innerHTML = "Rimuovi il Barrè";

	for (i = 0; i < 21; i++) {
		if (i % 4 == 0)
			box.getElementsByTagName("input")[i].checked = b;
	}
}

/**
 * Modifica il nome del bottone che permette all'utente di applicare o rimuovere il barrè nei quiz
 * in modo da renderlo coerente con lo stato delle checkbox.
 * @param {number} j Indica il numero di slide su cui la funzione deve operare.
 */
function controlFirstColumn(j) {
	box = document.getElementsByName("chord")[j];
	b = box.getElementsByTagName("input")[0].checked &&
		box.getElementsByTagName("input")[4].checked &&
		box.getElementsByTagName("input")[8].checked &&
		box.getElementsByTagName("input")[12].checked &&
		box.getElementsByTagName("input")[16].checked &&
		box.getElementsByTagName("input")[20].checked;
	if (!b)
		document.getElementsByName("barre")[j].innerHTML = "Applica il Barrè";
	else
		document.getElementsByName("barre")[j].innerHTML = "Rimuovi il Barrè";
}